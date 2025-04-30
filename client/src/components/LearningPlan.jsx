import { useEffect, useState } from "react";
import { Card, Progress, Button, Spinner } from "flowbite-react";
import axios from "../utils/axios"; // Adjust if needed
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LearningPlanList() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const fetchPlans = async () => {
    try {
      const userId = currentUser.id;
      const res = await axios.get(`/learning-plans/user/${userId}`);
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center mx-auto max-w-4xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6">
        <h1 className="text-3xl font-bold mb-6">📚 My Learning Plans</h1>
        <Button
          onClick={() => navigate("/?tab=createLearningplan")}
          gradientDuoTone="purpleToBlue"
          className="mb-6"
        >
          + Create New Plan
        </Button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center">
          <p className="text-xl font-semibold">No learning plans found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {plans.map((plan) => (
            <div key={plan.id} className="w-full h-full">
              {/* WRAP THE CARD inside a div w-full h-full */}
              <Card className="flex flex-col justify-between w-full h-full hover:shadow-xl transition duration-300">
                <div>
                  <h5 className="text-2xl font-bold tracking-tight mb-2">
                    {plan.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                    {plan.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">📅 Due: {plan.dueDate}</p>
                  <div className="mb-4">
                    <Progress
                      progress={Math.round(plan.progress)}
                      color="purple"
                    />
                    <p className="text-sm mt-1">
                      📈 {Math.round(plan.progress)}% Completed
                    </p>
                  </div>
                </div>

                <Button
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  onClick={() =>
                    navigate(`/?tab=viewLearningplan&planId=${plan.id}`)
                  }
                >
                  View Details
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
