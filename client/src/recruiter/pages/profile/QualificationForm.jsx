import React, { useState } from "react";
import { DatePicker } from "antd";
function QualificationForm({ setAddQualification, updateProfileQualification }) {
  const [formData, setFormData] = useState({
    degree: "",
    college: "",
    startYear: null,
    endYear: null
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (field, date) => {
    const year = date ? date.$y : null;
    setFormData({ ...formData, [field]: year });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.degree) newErrors.degree = "Please enter your degree.";
    if (!formData.college) newErrors.college = "Please enter your college.";
    if (!formData.startYear) newErrors.startYear = "Please select a start year.";
    if (formData.endYear && formData.startYear && formData.endYear < formData.startYear) {
      newErrors.endYear = "End year cannot be earlier than start year.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      updateProfileQualification(formData);
      setAddQualification(false);
    }
  };

  const handleCancel = () => {
    setAddQualification(false);
  };

  return (
    <form className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 w-full dark:bg-slate-700 dark:border-yellow-500">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="Enter your degree"
        />
        {errors.degree && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.degree}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Institute
        </label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="Name of Institute"
        />
        {errors.college && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.college}</p>
        )}
      </div>

      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 dark:text-white pb-2">
            Start Year
          </label>
          <DatePicker
            className="grow shrink w-full py-1 dark:bg-slate-700 dark:border-yellow-500 dark:text-white"
            picker="year"
            onChange={(value) => handleDateChange("startYear", value)}
            placeholder="Select start year"
          />
          {errors.startYear && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.startYear}</p>
          )}
        </div>

        <div className="mb-4 grow shrink basis-32">
          <label className="block w-full text-sm font-medium text-gray-700 pb-2 dark:text-white">
            End Year
          </label>
          <DatePicker
            className="grow shrink w-full py-1 dark:bg-slate-700 dark:border-yellow-500 dark:text-white"
            picker="year"
            onChange={(value) => handleDateChange("endYear", value)}
            placeholder="Select end year"
          />
          {errors.endYear && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.endYear}</p>
          )}
        </div>
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
         dark:bg-yellow-400 dark:text-black dark:border-yellow-400 dark:hover:bg-yellow-500 
         py-1 px-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}

export default QualificationForm;
