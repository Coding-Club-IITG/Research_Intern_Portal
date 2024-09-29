import { Button, Checkbox } from "antd";
import ExperienceDate from "./ExperienceDate";
import { useState } from "react";

function ExperienceForm({ setAddExp, updateProfileExperience }) {
  const [isWorking, setIsWorking] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const onChange = (e) => {
    setIsWorking(e.target.checked);
    if (e.target.checked) {
      setFormData({ ...formData, endDate: "Present" });
    } else {
      setFormData({ ...formData, endDate: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setAddExp(false);
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert("Please enter the name of the organisation.");
      return;
    }
    if (!formData.role) {
      alert("Please enter your role.");
      return;
    }
    if (!formData.startDate) {
      alert("Please select a start date.");
      return;
    }
    if (!formData.description) {
      alert("Please enter a description.");
      return;
    }
    if (!isWorking && !formData.endDate) {
      alert("Please select an end date.");
      return;
    }

    updateProfileExperience(formData);
    setAddExp(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Name Of Organisation
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the name of the organisation"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g. Software Engineer"
        />
      </div>
      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 pb-2">
            Start Date
          </label>
          <ExperienceDate
            date={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
            placeholder="Select start date"
          />
        </div>
        {!isWorking && (
          <div className="mb-4 grow shrink basis-32">
            <label className="block w-full text-sm font-medium text-gray-700 pb-2">
              End Date
            </label>
            <ExperienceDate
              date={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              placeholder="Select end date"
            />
          </div>
        )}
      </div>
      <Checkbox onChange={onChange} className="pb-4" checked={isWorking}>
        I am currently working here.
      </Checkbox>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="8"
          placeholder="Write a brief description of your role and responsibilities"
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          type="primary"
          className="bg-blue-600 text-white"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default ExperienceForm;
