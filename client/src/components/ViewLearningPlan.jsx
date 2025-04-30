import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button, Spinner } from "flowbite-react";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { differenceInDays, parseISO, isBefore } from "date-fns";

export default function ViewLearningPlan({ planId }) {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const fetchPlan = async () => {
    try {
      const res = await axios.get(`/learning-plans/${planId}`);
      setPlan(res.data);
    } catch (err) {
      console.error("Failed to fetch learning plan", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) fetchPlan();
  }, [planId]);

  const handleCompleteItem = async (item) => {
    try {
      setUpdatingItemId(item.id);
      await axios.put(`/learning-plans/items/${item.id}`, {
        title: item.title,
        resourceLink: item.resourceLink,
        dueDate: item.dueDate,
        isCompleted: true,
      });
      toast.success("Step marked as completed!");
      fetchPlan();
    } catch (error) {
      console.error("Failed to mark item as completed", error);
      toast.error("Failed to mark step. Try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const getDueCountdown = (dueDateString) => {
    if (!dueDateString) {
      return { text: "No Due Date", color: "gray" };
    }
  
    const today = new Date();
    let dueDate;
    
    try {
      dueDate = parseISO(dueDateString);
      if (isNaN(dueDate)) {
        return { text: "Invalid Date", color: "gray" };
      }
    } catch (error) {
      return { text: "Invalid Date", color: "gray" };
    }
  
    const daysLeft = differenceInDays(dueDate, today);
  
    if (isBefore(dueDate, today)) {
      return { text: "Overdue!", color: "failure" };
    } else if (daysLeft === 0) {
      return { text: "Due Today!", color: "warning" };
    } else {
      return { text: `Due in ${daysLeft} days`, color: "info" };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-semibold">Plan not found.</p>
        <Button onClick={() => navigate("/?tab=learningplan")} className="mt-4">
          Back to Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center mx-auto w-full max-w-2xl px-4 md:px-8 gap-3">
      {/* <div className="flex flex-col border rounded-md gap-6 w-full"> */}

      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-2">{plan.title}</h1>
        <p className="text-md text-gray-700 dark:text-gray-400 mb-2">
          {plan.description}
        </p>
        <p className="text-sm text-gray-500 ">📅 Due Date: {plan.dueDate}</p>
      </div>

      <div className="flex w-full gap-3">
        <Card className="flex justify-center items-center w-full">
          <div className="w-32 h-32 relative">
            <CircularProgressbar
              value={plan.progress}
              text={`${Math.round(plan.progress)}%`}
              styles={buildStyles({
                textColor: "#4B5563",
                pathColor: "url(#gradient)", // <-- use the gradient
                trailColor: "#d1d5db",
                textSize: "16px",
                strokeLinecap: "round",
                pathTransitionDuration: 0.5,
              })}
            />
            {/* Hidden SVG to define the gradient */}
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#7C3AED" /> {/* Purple */}
                  <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Card>
        <Card className="w-full md:col-span-2">
          <h2 className="text-2xl font-semibold">Resources</h2>
          <div className="flex flex-col gap-1">
            {plan.resources ? (
              plan.resources.split(",").map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  🔗 {resource.trim()}
                </a>
              ))
            ) : (
              <p className="text-gray-400">No resources added.</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="w-full md:col-span-2">
        <h2 className="text-2xl font-semibold">Learning Steps</h2>
        {plan.items.length === 0 ? (
          <p className="text-gray-400">No items added yet.</p>
        ) : (
          <ul className="flex flex-col">
            {plan.items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row justify-between items-start px-3 py-2 border-b rounded-md hover:shadow"
              >
                <div>
                  <h5 className="text-md font-bold mb-1">
                    {index + 1}. {item.title}
                  </h5>
                  <p className="text-sm text-gray-500 mb-1">
                    📅 Due: {item.dueDate}
                  </p>
                  {item.resourceLink && (
                    <a
                      href={item.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      🔗 {item.resourceLink}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 items-center mt-2 md:mt-0">
                  <Badge color={item.isCompleted ? "success" : "failure"}>
                    {item.isCompleted ? "Completed" : "Not Completed"}
                  </Badge>

                  {!item.isCompleted && (
                    <Badge color={getDueCountdown(item.dueDate).color}>
                      {getDueCountdown(item.dueDate).text}
                    </Badge>
                  )}

                  {!item.isCompleted && (
                    <Button
                      size="xs"
                      gradientMonochrome="success"
                      onClick={() => handleCompleteItem(item)}
                      disabled={updatingItemId === item.id}
                      className="flex items-center gap-1"
                    >
                      {updatingItemId === item.id ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          ✅ <span>Mark Done</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Button
        onClick={() => navigate("/?tab=learningplan")}
        gradientDuoTone="purpleToBlue"
        className="mt-2 w-full"
      >
        ⬅️ Back to Plans
      </Button>
    </div>

    // </div>
  );
}
