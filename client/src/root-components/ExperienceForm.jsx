import React, { useState } from "react";
import { Button, Checkbox, DatePicker } from "antd";

function ExperienceForm({ setAddExp, updateProfileExperience }) {
  const [isWorking, setIsWorking] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    startDate: null,
    endDate: null
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setIsWorking(e.target.checked);
    if (e.target.checked) {
      setFormData({ ...formData, endDate: null });
      setErrors({ ...errors, endDate: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (field, date) => {
    setFormData({ ...formData, [field]: date });
    setErrors({ ...errors, [field]: "" });

    if (field === "endDate" && date && formData.startDate) {
      if (date.isBefore(formData.startDate)) {
        setErrors({ ...errors, endDate: "End date cannot be earlier than start date." });
      }
    }
  };

  const handleCancel = () => {
    setAddExp(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please enter the name of the organization.";
    if (!formData.role) newErrors.role = "Please enter your role.";
    if (!formData.startDate) newErrors.startDate = "Please select a start date.";
    if (!formData.description) newErrors.description = "Please enter a description.";
    if (!isWorking && !formData.endDate) newErrors.endDate = "Please select an end date.";

    if (formData.endDate && formData.startDate && formData.endDate.isBefore(formData.startDate)) {
      newErrors.endDate = "End date cannot be earlier than start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateProfileExperience(formData);
      setAddExp(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Name Of Organisation
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="Enter the name of the organisation"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="e.g. Software Engineer"
        />
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
      </div>
      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 pb-2">Start Year</label>
          <DatePicker
            className="grow shrink w-full"
            picker="month"
            onChange={(value) => handleDateChange("startDate", value)}
            placeholder="Select start year"
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>
        {!isWorking && (
          <div className="mb-4 grow shrink basis-32">
            <label className="block w-full text-sm font-medium text-gray-700 pb-2">End Year</label>
            <DatePicker
              className="grow shrink w-full"
              picker="month"
              onChange={(value) => handleDateChange("endDate", value)}
              placeholder="Select end year"
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
          </div>
        )}
      </div>
      <Checkbox onChange={onChange} className="pb-4" checked={isWorking}>
        I am currently working here.
      </Checkbox>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          rows="4"
          placeholder="Write a brief description of your role and responsibilities"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>
      <div className="flex gap-4">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" className="bg-blue-600 text-white" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ExperienceForm;
