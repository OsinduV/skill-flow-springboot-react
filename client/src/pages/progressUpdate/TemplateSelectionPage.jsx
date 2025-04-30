// src/pages/progress/TemplateSelectionPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";

const templates = [
  {
    id: "CERTIFICATE",
    title: "Certificate Achievement",
    image: "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
  },
  {
    id: "PROJECT",
    title: "Project Completion",
    image: "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
  },
  {
    id: "WORKSHOP",
    title: "Workshop Participation",
    image: "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
  },
  {
    id: "CUSTOM",
    title: "Custom Update",
    image: "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
  },
];

export default function TemplateSelectionPage() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const handleSelect = (templateId) => {
    navigate(`/home/progress/create/${planId}?template=${templateId}`);
  };

  return (
    <div className="p-6 flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-4">Select a Progress Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-xl transition"
            onClick={() => handleSelect(template.id)}
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              {template.title}
            </h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
