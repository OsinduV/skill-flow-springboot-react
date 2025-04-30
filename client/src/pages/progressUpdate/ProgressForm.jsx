// src/pages/progress/ProgressForm.jsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Label,
  TextInput,
  Textarea,
  FileInput,
} from "flowbite-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../../firebase"; // ✅ Make sure this path is correct

const defaultContentMap = {
  CERTIFICATE: {
    title: "Certificate Unlocked!",
    description: "I'm thrilled to share I completed a course and earned a certificate! 📜 #Certificate #Milestone",
  },
  PROJECT: {
    title: "Project Completed",
    description: "Just finished a challenging project. Learned a lot through hands-on work! 🚀 #Project #Progress",
  },
  WORKSHOP: {
    title: "Attended a Workshop",
    description: "Participated in a valuable workshop today. Great insights and experience! 🛠️ #Workshop #SkillBuilding",
  },
  CUSTOM: {
    title: "",
    description: "",
  },
};

export default function ProgressForm() {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template") || "CUSTOM";
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const defaults = defaultContentMap[template] || defaultContentMap.CUSTOM;
    setTitle(defaults.title);
    setDescription(defaults.description);
  }, [template]);

  const handleMediaSelect = (e) => {
    const selected = Array.from(e.target.files);
    const combined = [...mediaFiles, ...selected];

    if (combined.length > 3) {
      toast.error("You can only upload up to 3 files.");
      return;
    }

    const video = combined.find((file) => file.type.startsWith("video/"));
    if (video) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(video);
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration > 30) {
          toast.error("Video must be 30 seconds or less.");
        } else {
          setMediaFiles(combined);
        }
      };
    } else {
      setMediaFiles(combined);
    }

    e.target.value = null; // allow reselecting the same file
  };

  const uploadToFirebase = async (file) => {
    const storage = getStorage(app);
    const fileName = "progressUploads/" + new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return {
      fileUrl: downloadUrl,
      mediaType: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Uploading media...", { id: "uploading" });

      const uploadedMedia = await Promise.all(mediaFiles.map(uploadToFirebase));

      toast.dismiss("uploading");

      const payload = {
        userId: currentUser.id,
        learningPlanId: planId !== "null" ? parseInt(planId) : null,
        title,
        description,
        templateType: template,
        mediaList: uploadedMedia,
      };

      await axios.post("/progress/create", payload);
      toast.success("Progress posted!");
      navigate("/home/progress/view-user-progress-updates");
    } catch (err) {
      console.error("Error posting progress", err);
      toast.error("Failed to post progress.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto">
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Share Your Progress</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="media" value="Upload Media (Max 3)" />
            <FileInput
              id="media"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaSelect}
            />
            <small className="text-gray-500">{mediaFiles.length}/3 selected</small>

            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {mediaFiles.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div key={index} className="relative group">
                      {file.type.startsWith("image/") ? (
                        <img src={url} alt="preview" className="w-full h-24 rounded object-cover" />
                      ) : (
                        <video src={url} controls className="w-full h-24 rounded object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => setMediaFiles(mediaFiles.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 text-white bg-black bg-opacity-60 text-xs rounded-full px-2 py-0.5 hidden group-hover:block"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue" isProcessing={loading}>
            Post Progress
          </Button>
        </form>
      </Card>
    </div>
  );
}
