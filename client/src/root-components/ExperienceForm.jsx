import React, { useState } from "react";
import { DatePicker, Checkbox } from "antd";

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

  const handleCheckboxChange = (e) => {
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
    const year = date ? date.$y : null;
    setFormData({ ...formData, [field]: year });
    setErrors({ ...errors, [field]: "" });

    if (field === "endDate" && year && formData.startDate) {
      if (year < formData.startDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: "End date cannot be earlier than start date."
        }));
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

    // Validate end date against start date
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End date cannot be earlier than start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfileExperience(formData);
      setAddExp(false);
    }
  };

  return (
    <form className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 w-full dark:bg-zinc-900 dark:border-gray-600">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Name Of Organisation
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
          placeholder="Enter the name of the organisation"
        />
        {errors.name && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
          placeholder="e.g. Software Engineer"
        />
        {errors.role && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.role}</p>
        )}
      </div>

      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 dark:text-white pb-2">
            Start Year
          </label>
          <DatePicker
            className="grow shrink w-full py-1 dark:bg-zinc-900 dark:border-gray-600 dark:text-white"
            picker="year"
            onChange={(value) => handleDateChange("startDate", value)}
            placeholder="Select start year"
          />
          {errors.startDate && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>

        {!isWorking && (
          <div className="mb-4 grow shrink basis-32">
            <label className="block w-full text-sm font-medium text-gray-700 pb-2 dark:text-white">
              End Year
            </label>
            <DatePicker
              className="grow shrink w-full py-1 dark:bg-zinc-900 dark:border-gray-600 dark:text-white"
              picker="year"
              onChange={(value) => handleDateChange("endDate", value)}
              placeholder="Select end year"
            />
            {errors.endDate && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
          rows="4"
          placeholder="Write a brief description of your experience"
        />
        {errors.description && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex items-center mb-4">
        <Checkbox checked={isWorking} onChange={handleCheckboxChange} className="dark:text-white">
          I am currently working here
        </Checkbox>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 
         dark:bg-gray-400 dark:text-black dark:border-gray-400 dark:hover:bg-gray-500 
         py-1 px-2 rounded">
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 
         dark:bg-indigo-600 dark:text-black dark:border-indigo-600 dark:hover:bg-indigo-700 
         py-1 px-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}

export default ExperienceForm;
