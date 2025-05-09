import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function ViewGeneratedPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  if (!plan) return <p className="text-center mt-20">No plan data received.</p>;

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-2 text-purple-700">
          {plan.title}
        </h1>
        <p className="text-sm text-gray-700 mb-4">{plan.description}</p>

        <h2 className="font-semibold">Resources Used:</h2>
        <ul className="list-disc ml-6 text-sm mb-4">
          {plan.resourcesUsed?.map((res, idx) => (
            <li key={idx}>{res}</li>
          ))}
        </ul>

        <h2 className="font-semibold mb-2">Learning Plan:</h2>
        <ul className="list-decimal ml-6 text-sm space-y-2">
          {plan.learningPlan?.map((item, idx) => (
            <li key={idx}>
              <strong>{item.itemName}</strong>
              <div>{item.resource}</div>
              {item.dueDate && (
                <div className="text-xs text-gray-500">Due: {item.dueDate}</div>
              )}
            </li>
          ))}
        </ul>
        <Button
          className="mt-4"
          gradientDuoTone="tealToLime"
          onClick={() =>
            navigate("/home/edit-generated", { state: plan })
          }
        >
          ✏️ Edit & Save This Plan
        </Button>
      </Card>
    </div>
  );
}
