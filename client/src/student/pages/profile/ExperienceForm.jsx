import { Button, Checkbox } from "antd";
import ExperienceDate from "./ExperienceDate";
import { useState } from "react";

function ExperienceForm({ profile, setAddExp, updateProfile }) {
  const [isWorking, setIsWorking] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    role: profile.role || "",
    description: profile.description || "",
    startDate: profile.startDate || "",
    endDate: profile.endDate || ""
  });

  const onChange = (e) => {
    setIsWorking(e.target.checked);
    if (e.target.checked) {
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
    updateProfile(formData);
    setAddExp(false);
  };

  return (
    <form className="bg-gray-50 w-full p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name Of Organisation</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        />
      </div>
      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 pb-2">Start Date</label>
          <ExperienceDate
            date={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
        </div>
        {!isWorking && (
          <div className="mb-4 grow shrink basis-32">
            <label className="block w-full text-sm font-medium text-gray-700 pb-2">End Date</label>
            <ExperienceDate
              date={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
            />
          </div>
        )}
      </div>
      <Checkbox onChange={onChange} className="pb-4" checked={isWorking}>
        I am currently working here.
      </Checkbox>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="8"
          placeholder="Write your bio here"
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" className="bg-blue-600 text-white" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default ExperienceForm;
