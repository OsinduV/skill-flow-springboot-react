import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Label,
  TextInput,
  Textarea,
  FileInput,
  Select,
} from "flowbite-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const defaultContentMap = {

  
  CERTIFICATE: {
    title: "Certificate Unlocked in {plan}!",
    description: "I've achieved a new milestone in '{plan}' with {progress} progress! 📜 #Milestone #Learning",
    fallbackTitle: "Certificate Unlocked!",
    fallbackDescription: "I'm thrilled to share I completed a course and earned a certificate! 📜 #Certificate #Milestone",
    image: "/images/templates/certificate.png",
  },
  PROJECT: {
    title: "Project Completed - {plan}",
    description: "Wrapped up a big part of my '{plan}' journey. Currently at {progress} completion 🚀 #ProjectDone",
    fallbackTitle: "Project Completed",
    fallbackDescription: "Just finished a challenging project. Learned a lot through hands-on work! 🚀 #Project #Progress",
    image: "/images/templates/project.png",
  },
  WORKSHOP: {
    title: "Attended a Workshop for {plan}",
    description: "Boosted my learning plan '{plan}' with a valuable workshop! Now at {progress} progress 🛠️ #SkillBuilding",
    fallbackTitle: "Attended a Workshop",
    fallbackDescription: "Participated in a valuable workshop today. Great insights and experience! 🛠️ #Workshop #SkillBuilding",
    image: "/images/templates/workshop.png",
  },
  CUSTOM: {
    title: "",
    description: "",
    fallbackTitle: "",
    fallbackDescription: "",
    image: "/images/templates/custom.png",
  },
};

export default function ProgressForm() {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();
  const initialTemplate = searchParams.get("template") || "CUSTOM";

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [template, setTemplate] = useState(initialTemplate);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planTitle, setPlanTitle] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const defaults = defaultContentMap[template] || defaultContentMap.CUSTOM;

    if (planId !== "null") {
      const planText = planTitle ? planTitle : "my learning plan";
      const progressText = `${Math.round(progress)}%`;

      const titleWithContext = defaults.title
        .replace("{plan}", planText)
        .replace("{progress}", progressText);

      const descWithContext = defaults.description
        .replace("{plan}", planText)
        .replace("{progress}", progressText);

      setTitle(titleWithContext);
      setDescription(descWithContext);
    } else {
      setTitle(defaults.fallbackTitle || "");
      setDescription(defaults.fallbackDescription || "");
    }

    // Set initial media preview with the template image
    if (defaults.image && defaults.image !== "") {
      fetch(defaults.image)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "template-image.jpg", { type: blob.type });
          setMediaFiles([file]);
        });
    }
  }, [template, planTitle, progress, planId]);

  useEffect(() => {
    
    const fetchPlan = async () => {
      if (planId !== "null") {
        try {
          const res = await axios.get(`/learning-plans/${planId}`);
          setPlanTitle(res.data.title);
          setProgress(res.data.progress || 0);
        } catch (err) {
          console.error("Failed to fetch learning plan", err);
        }
      }
    };
    fetchPlan();
  }, [planId]);
  

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

  const selectedTemplate = defaultContentMap[template];

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Share Your Progress
        </h1>

        {/* Learning Plan Preview */}
        {planId !== "null" && (
          <div className="flex items-center gap-4 p-3 mb-4 border rounded-md bg-gray-50 dark:bg-gray-800">
            <div className="w-14 h-14">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
                styles={buildStyles({
                  textColor: "#4B5563",
                  pathColor: "#7C3AED",
                  trailColor: "#d1d5db",
                  textSize: "24px",
                })}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Learning Plan</p>
              <p className="text-lg font-medium">{planTitle}</p>
            </div>
          </div>
        )}

        {/* Template Preview */}
        <div className="flex items-center gap-4 p-3 mb-4 border rounded-md bg-gray-50 dark:bg-gray-800">
          <img
            src={selectedTemplate.image}
            alt={template}
            className="object-cover w-16 h-16 border rounded"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Selected Template</p>
            <p className="text-lg font-medium">
              {title || "Custom Template"}
            </p>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-4">
          <Label htmlFor="template" value="Change Template" />
          <Select
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            required
          >
            {Object.entries(defaultContentMap).map(([key]) => (
              <option key={key} value={key}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </Select>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              rows={4}
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
            <small className="text-gray-500">
              {mediaFiles.length}/3 selected
            </small>

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
                          className="object-cover w-full h-24 rounded"
                        />
                      ) : (
                        <video
                          src={url}
                          controls
                          className="object-cover w-full h-24 rounded"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setMediaFiles(
                            mediaFiles.filter((_, i) => i !== index)
                          )
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
            Post Progress
          </Button>
        </form>
      </Card>
    </div>
  );
}
