import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { TextInput, Textarea, Button, Select, Label } from "flowbite-react";
import toast from "react-hot-toast";

const templateOptions = ["CERTIFICATE", "PROJECT", "WORKSHOP", "CUSTOM"];

export default function EditProgressPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    templateType: "CUSTOM",
    learningPlanId: "",
    mediaList: [],
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`/progress/${id}`);
      setForm({
        title: res.data.title,
        description: res.data.description,
        templateType: res.data.templateType,
        learningPlanId: res.data.learningPlanId,
        mediaList: res.data.mediaList || [],
      });
      console.log(res);
    } catch (err) {
      toast.error("Failed to load post.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/progress/update/${id}`, form);
      toast.success("Progress post updated!");
      navigate("/home/progress/view-user-progress-updates"); // or to specific post/page
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Progress Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <TextInput
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Template Type</Label>
          <Select
            value={form.templateType}
            onChange={(e) => setForm({ ...form, templateType: e.target.value })}
          >
            {templateOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Learning Plan ID (optional)</Label>
          <TextInput
            type="number"
            value={form.learningPlanId || ""}
            onChange={(e) =>
              setForm({
                ...form,
                learningPlanId: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>

        <div className="text-gray-600 text-sm">
          ⚠️ To edit media, delete this post and re-create it. (Editing media is not supported here.)
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
