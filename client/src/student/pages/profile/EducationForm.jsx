import { Button, DatePicker } from "antd";
import { useState } from "react";

function EducationForm({ profile, setAddEdu, updateProfile }) {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    role: profile.role || "",
    description: profile.description || "",
    startDate: profile.startDate || "",
    endDate: profile.endDate || ""
  });

  const onChange = (e) => {
    setFormData({ ...formData, endDate: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setAddEdu(false);
  };

  const handleSubmit = () => {
    updateProfile(formData);
    setAddEdu(false);
  };

  return (
    <form className="bg-gray-50 p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name Of Institute</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700">Degree (Field Of Study)</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 pb-2">
            Passing Year
          </label>
          <DatePicker className="grow shrink" onChange={onChange} picker="year" />
        </div>
      </div>
      <div className="w-1/2">
        <label className="block w-full text-sm font-medium text-gray-700 pb-2">
          Percentage / CGPA
        </label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
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

export default EducationForm;
