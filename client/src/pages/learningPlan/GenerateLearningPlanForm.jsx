import React, { useState } from "react";
import {
  Button,
  Card,
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
} from "flowbite-react";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios"; // adjust path based on your structure
import { useNavigate } from "react-router-dom";

export default function GenerateLearningPlanForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goal: "",
    currentExperience: "Beginner",
    learningTimelineWeeks: "",
    timeCommitment: "",
    timeCommitmentUnit: "daily",
    preferredLearningStyle: "",
    customDescription: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setGeneratedPlan(null);
    try {
      const payload = {
        ...form,
        learningTimelineWeeks: form.learningTimelineWeeks
          ? parseInt(form.learningTimelineWeeks)
          : null,
        timeCommitment: form.timeCommitment
          ? parseFloat(form.timeCommitment)
          : null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      };
      const res = await axios.post("/ai/generate-learning-plan", payload);
      let rawText = res.data;
      console.log(res.data);
      // Handle case where Gemini returns a markdown-formatted JSON string
      if (typeof rawText === "string" && rawText.trim().startsWith("```json")) {
        rawText = rawText
          .trim()
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
        try {
          const parsed = JSON.parse(rawText);
          toast.success("Plan generated successfully!");
          navigate("/home/view-generated-plan", {
            state: { plan: parsed }
          });
          
        } catch (err) {
          console.error("Failed to parse AI response:", err);
          toast.error("AI returned invalid JSON. Try again.");
        }
      } else {
        // Already structured JSON (best case)
        // setGeneratedPlan(res.data);
        navigate("/home/view-generated-plan", {
            state: { plan: rawText}
          });
      }
    } catch (err) {
      console.error("Failed to generate plan", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center space-y-8">
          {/* Glowing Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin border-white border-opacity-20"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-600 blur-md animate-pulse"></div>
            <div className="absolute inset-8 rounded-full bg-black border border-gray-700"></div>
          </div>

          {/* Animated Text */}
          <div className="text-center text-white text-xl font-medium animate-pulse tracking-wide">
            🧠 Generating your AI-powered learning plan...
          </div>
        </div>
      )}
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Generate Your Learning Plan (AI)
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="goal" value="Learning Goal *" />
            <TextInput
              id="goal"
              name="goal"
              required
              value={form.goal}
              onChange={handleChange}
              placeholder="e.g., Learn Azure Fundamentals"
            />
          </div>

          <div>
            <Label htmlFor="currentExperience" value="Current Experience" />
            <Select
              id="currentExperience"
              name="currentExperience"
              value={form.currentExperience}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="learningTimelineWeeks"
                value="Learning Duration (weeks)"
              />
              <TextInput
                id="learningTimelineWeeks"
                name="learningTimelineWeeks"
                type="number"
                min={1}
                value={form.learningTimelineWeeks}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
            <div>
              <Label htmlFor="timeCommitment" value="Time Commitment (hours)" />
              <TextInput
                id="timeCommitment"
                name="timeCommitment"
                type="number"
                step="0.5"
                min={0}
                value={form.timeCommitment}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="timeCommitmentUnit" value="Time Commitment Type" />
            <Select
              id="timeCommitmentUnit"
              name="timeCommitmentUnit"
              value={form.timeCommitmentUnit}
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="preferredLearningStyle"
              value="Preferred Learning Style"
            />
            <TextInput
              id="preferredLearningStyle"
              name="preferredLearningStyle"
              value={form.preferredLearningStyle}
              onChange={handleChange}
              placeholder="e.g., videos, quizzes, docs"
            />
          </div>

          <div>
            <Label
              htmlFor="customDescription"
              value="Custom Description / Goal"
            />
            <Textarea
              id="customDescription"
              name="customDescription"
              rows={3}
              value={form.customDescription}
              onChange={handleChange}
              placeholder="What are your expectations, or how would you like to structure the plan?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" value="Start Date" />
              <TextInput
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="endDate" value="End Date" />
              <TextInput
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            isProcessing={loading}
          >
            Generate Plan
          </Button>
        </form>
        
      </Card>
    </div>
  );
}
