import { Button, DatePicker } from "antd";
import { useState } from "react";

function EducationForm({ setAddEdu, updateProfile }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    startDate: null,
    endDate: null,
    grade: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (field, value) => {
    setFormData({ ...formData, [field]: value ? value.format("YYYY") : "" });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Institute name is required.";
    if (!formData.role) newErrors.role = "Degree is required.";
    if (!formData.startDate) newErrors.startDate = "Start year is required.";
    if (!formData.endDate) newErrors.endDate = "End year is required.";
    if (!formData.grade) newErrors.grade = "Percentage / CGPA is required.";
    if (
      formData.endDate &&
      formData.startDate &&
      parseInt(formData.endDate) < parseInt(formData.startDate)
    ) {
      newErrors.endDate = "End year cannot be before start year.";
    }
    if (formData.grade) {
      const gradeNumber = parseFloat(formData.grade);
      if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
        newErrors.grade = "Grade/Percentage must be a number between 0 and 100.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setAddEdu(false);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Validate before submitting
      updateProfile(formData);
      setAddEdu(false);
    }
  };

  return (
    <form className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Name Of Institute
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="Enter the name of the institute"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}{" "}
        {/* Error message */}
      </div>

      <div className="flex space-between gap-4 flex-wrap">
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Degree (Field Of Study)
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
            placeholder="e.g. B.Tech (Computer Science)"
          />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}{" "}
          {/* Error message */}
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2">
            Start Year
          </label>
          <DatePicker
            className="grow shrink w-full"
            picker="year"
            onChange={(value) => handleDateChange("startDate", value)}
            placeholder="Select start year"
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}{" "}
          {/* Error message */}
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2">
            End Year
          </label>
          <DatePicker
            className="grow shrink w-full"
            picker="year"
            onChange={(value) => handleDateChange("endDate", value)}
            placeholder="Select end year"
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}{" "}
          {/* Error message */}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Percentage / CGPA
        </label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
          placeholder="e.g. 85% or 9.0 CGPA"
        />
        {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}{" "}
        {/* Error message */}
      </div>

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
          placeholder="Write a brief description of your education"
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
