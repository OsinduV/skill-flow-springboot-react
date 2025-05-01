import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";

const templates = [
  {
    id: "CERTIFICATE",
    title: "Certificate Achievement",
    image: "/images/templates/certificate.png", // Use generated image path
  },
  {
    id: "PROJECT",
    title: "Project Completion",
    image: "/images/templates/project.png",
  },
  {
    id: "WORKSHOP",
    title: "Workshop Participation",
    image: "/images/templates/workshop.png",
  },
  {
    id: "CUSTOM",
    title: "Custom Update",
    image: "/images/templates/custom.png",
  },
];

export default function TemplateSelectionPage() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const handleSelect = (templateId) => {
    navigate(`/home/progress/create/${planId}?template=${templateId}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-100 to-blue-50 dark:from-blue-950">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Choose Your Progress Template</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Showcase your achievements with a styled update</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer transform transition hover:scale-105 hover:shadow-2xl border border-gray-200"
            onClick={() => handleSelect(template.id)}
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-52 object-cover rounded-md"
            />
            <h2 className="text-2xl font-semibold text-center mt-4 ">
              {template.title}
            </h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
