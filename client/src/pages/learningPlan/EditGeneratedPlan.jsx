import { useState, useEffect } from "react";
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

export default function EditGeneratedPlan() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const generated = location.state;

  const [plan, setPlan] = useState({
    title: "",
    description: "",
    dueDate: "",
    resources: "",
    items: [],
  });

  const [newItem, setNewItem] = useState({
    title: "",
    resourceLink: "",
    dueDate: "",
    isCompleted: false,
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (generated) {
      let calculatedDueDate = "";
      if (generated.endDate) {
        calculatedDueDate = generated.endDate;
      } else if (generated.learningTimelineWeeks) {
        const today = new Date();
        const due = new Date(today);
        due.setDate(today.getDate() + generated.learningTimelineWeeks * 7);
        calculatedDueDate = due.toISOString().split("T")[0];
      }

      setPlan({
        title: generated.title || "",
        description: generated.description || "",
        dueDate: calculatedDueDate,
        resources: generated.resourcesUsed?.join(", ") || "",
        items: generated.learningPlan?.map((item) => ({
          title: item.itemName,
          resourceLink: item.resource,
          dueDate: item.dueDate || "",
          isCompleted: false,
        })) || [],
      });
    }
  }, [generated]);

  const handlePlanChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (editingIndex !== null) {
      const updatedItems = [...plan.items];
      updatedItems[editingIndex] = newItem;
      setPlan({ ...plan, items: updatedItems });
      setEditingIndex(null);
    } else {
      setPlan({ ...plan, items: [...plan.items, newItem] });
    }
    setNewItem({ title: "", resourceLink: "", dueDate: "", isCompleted: false });
  };

  const removeItem = (index) => {
    setPlan({ ...plan, items: plan.items.filter((_, i) => i !== index) });
  };

  const handleEditItem = (index) => {
    setNewItem(plan.items[index]);
    setEditingIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = currentUser.id;
      const payload = { ...plan, userId };
      await axios.post("/learning-plans/with-items", payload);
      navigate("/?tab=learningplan");
    } catch (err) {
      console.error("Failed to save learning plan", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto">
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Edit & Save AI-Generated Plan</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput id="title" name="title" value={plan.title} onChange={handlePlanChange} required />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea id="description" name="description" value={plan.description} onChange={handlePlanChange} required />
          </div>
          <div>
            <Label htmlFor="dueDate" value="Due Date" />
            <TextInput type="date" id="dueDate" name="dueDate" value={plan.dueDate} onChange={handlePlanChange} required />
          </div>
          <div>
            <Label htmlFor="resources" value="Resources (Comma Separated)" />
            <TextInput id="resources" name="resources" value={plan.resources} onChange={handlePlanChange} />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Edit/Add Plan Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextInput
                placeholder="Topic Title"
                name="title"
                value={newItem.title}
                onChange={handleItemChange}
              />
              <TextInput
                placeholder="Resource Link"
                name="resourceLink"
                value={newItem.resourceLink}
                onChange={handleItemChange}
              />
              <TextInput
                type="date"
                name="dueDate"
                value={newItem.dueDate}
                onChange={handleItemChange}
              />
            </div>
            <Button type="button" className="mt-2" onClick={addItem} gradientDuoTone="purpleToBlue">
              {editingIndex !== null ? "Update Item" : "+ Add Item"}
            </Button>

            <div className="mt-4">
              {plan.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="xs" color="purple" onClick={() => handleEditItem(index)}>
                      Edit
                    </Button>
                    <Button size="xs" color="failure" onClick={() => removeItem(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue">
            Save Learning Plan
          </Button>
        </form>
      </Card>
    </div>
  );
}
