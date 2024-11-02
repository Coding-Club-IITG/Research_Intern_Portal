import { Button, DatePicker } from "antd";
import { useState } from "react";

function QualificationForm({ setAddEdu, updateProfile }) {
  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    description: "",
    startYear: null,
    endYear: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (field, value) => {
    setFormData({ ...formData, [field]: value ? value.format("YYYY") : "" });
  };

  const handleCancel = () => {
    setAddEdu(false);
  };

  const handleSubmit = () => {
    updateProfile(formData);
    setAddEdu(false);
  };

  return (
    <form className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name Of Institute</label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the name of the institute"
        />
      </div>

      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700">Degree (Field Of Study)</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g. Computer Science"
          />
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 pb-2">Start Year</label>
          <DatePicker
            className="grow shrink w-full"
            picker="year"
            onChange={(value) => handleDateChange("startYear", value)}
            placeholder="Select start year"
          />
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 pb-2">End Year</label>
          <DatePicker
            className="grow shrink w-full"
            picker="year"
            onChange={(value) => handleDateChange("endYear", value)}
            placeholder="Select end year"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
          placeholder="Write a brief description of your qualification"
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

export default QualificationForm;
