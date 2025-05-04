import { useState } from "react";
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import axios from "../../utils/axios"; // Adjust path if different
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateLearningPlan() {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [plan, setPlan] = useState({
    title: "",
    description: "",
    dueDate: "",
    resources: "",
    items: [],
  });
  console.log("plan", plan);
  const [newItem, setNewItem] = useState({
    title: "",
    resourceLink: "",
    dueDate: "",
    isCompleted: false,
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const handlePlanChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  //   const addItem = () => {
  //     setPlan({ ...plan, items: [...plan.items, newItem] });
  //     setNewItem({ title: "", resourceLink: "", dueDate: "", isCompleted: false });
  //   };
  const addItem = () => {
    if (editingIndex !== null) {
      // Update existing item
      const updatedItems = [...plan.items];
      updatedItems[editingIndex] = newItem;
      setPlan({ ...plan, items: updatedItems });
      setEditingIndex(null);
    } else {
      // Add new item
      setPlan({ ...plan, items: [...plan.items, newItem] });
    }
    setNewItem({
      title: "",
      resourceLink: "",
      dueDate: "",
      isCompleted: false,
    });
  };

  const removeItem = (index) => {
    const updatedItems = plan.items.filter((_, i) => i !== index);
    setPlan({ ...plan, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = currentUser.id;
      const payload = { ...plan, userId };
      const res = await axios.post("/learning-plans/with-items", payload);
      console.log(res.data);
      navigate("/?tab=learningplan");
    } catch (err) {
      console.error("Failed to create learning plan", err);
    }
  };

  const handleEditItem = (index) => {
    setNewItem(plan.items[index]);
    setEditingIndex(index);
  };
  
  const moveItemUp = (index) => {
    if (index === 0) return; // First item, can't move up
    const updatedItems = [...plan.items];
    [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
    setPlan({ ...plan, items: updatedItems });
  };
  
  const moveItemDown = (index) => {
    if (index === plan.items.length - 1) return; // Last item, can't move down
    const updatedItems = [...plan.items];
    [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
    setPlan({ ...plan, items: updatedItems });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto">
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">
          Create New Learning Plan
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              value={plan.title}
              onChange={handlePlanChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              value={plan.description}
              onChange={handlePlanChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate" value="Due Date" />
            <TextInput
              type="date"
              id="dueDate"
              name="dueDate"
              value={plan.dueDate}
              onChange={handlePlanChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="resources" value="Resources (Comma Separated)" />
            <TextInput
              id="resources"
              name="resources"
              value={plan.resources}
              onChange={handlePlanChange}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Add Plan Items</h2>
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
            <Button
              type="button"
              className="mt-2"
              onClick={addItem}
              gradientDuoTone="purpleToBlue"
            >
              + Add Item
            </Button>

            {/* Display added items */}
            <div className="mt-4">
              {/* {plan.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
                  </div>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))} */}
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
                    <Button
                      size="xs"
                      color="purple"
                      onClick={() => handleEditItem(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                    <Button
                      size="xs"
                      color="gray"
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      size="xs"
                      color="gray"
                      onClick={() => moveItemDown(index)}
                      disabled={index === plan.items.length - 1}
                    >
                      ↓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue">
            Create Learning Plan
          </Button>
        </form>
      </Card>
    </div>
  );
}
