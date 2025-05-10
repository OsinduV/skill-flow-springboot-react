import React, { useState } from "react";
import {
  Button,
  Card,
  Label,
  Textarea,
  FileInput,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function CreateSkillPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    e.target.value = null;
  };

  const uploadToFirebase = async (file) => {
    const storage = getStorage(app);
    const fileName = "skillPostMedia/" + new Date().getTime() + file.name;
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
    if (!description) {
      toast.error("Description is required.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Uploading media...", { id: "uploading" });

      const uploadedMedia = await Promise.all(mediaFiles.map(uploadToFirebase));
      toast.dismiss("uploading");

      const payload = {
        userId: currentUser.id,
        description,
        mediaList: uploadedMedia,
      };

      await axios.post("/skill-posts/create", payload);
      toast.success("Post created successfully!");
      setDescription("");
      setMediaFiles([]);
      navigate("/home");
    } catch (err) {
      console.error("Error creating post", err);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Skill Sharing Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              rows={4}
              placeholder="Share your skill, project or idea... #photography #cooking"
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
                        <img
                          src={url}
                          alt="preview"
                          className="w-full h-24 rounded object-cover"
                        />
                      ) : (
                        <video
                          src={url}
                          controls
                          className="w-full h-24 rounded object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setMediaFiles(mediaFiles.filter((_, i) => i !== index))
                        }
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

          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            isProcessing={loading}
          >
            Post Now
          </Button>
        </form>
      </Card>
    </div>
  );
}
