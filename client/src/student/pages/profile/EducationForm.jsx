import { DatePicker } from "antd";
import { useState } from "react";
import { useTheme } from "../../../store/themeStore";

function EducationForm({ setAddEdu, updateProfile }) {
  const [theme, toggleTheme] = useTheme();
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
    setFormData({ ...formData, [field]: value ? value.$y : "" });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile(formData);
      setAddEdu(false);
    }
  };

  return (
    <form className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 dark:bg-zinc-900 dark:border-gray-600">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Name Of Institute
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
          placeholder="Enter the name of the institute"
        />
        {errors.name && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>
        )}
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
            placeholder="e.g. B.Tech (Computer Science)"
          />
          {errors.role && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.role}</p>
          )}
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2">
            Start Year
          </label>
          <DatePicker
            className={`grow shrink w-full py-1 ${
              theme === "dark"
                ? "bg-zinc-900  dark:hover:bg-zinc-900 text-white placeholder:text-white border-gray-600 hover:border-gray-600"
                : "bg-white border-gray-300"
            }`}
            picker="year"
            onChange={(value) => handleDateChange("startDate", value)}
            placeholder="Select start year"
            placeholderStyle={{ color: theme === "dark" ? "white" : "white" }}
          />
          {errors.startDate && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>
        <div className="mb-4 grow shrink basis-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2">
            End Year
          </label>
          <DatePicker
            className="grow w-full shrink dark:bg-zinc-900 dark:text-white dark:border-gray-600 dark:hover:bg-zinc-900 dark:hover:border-gray-600"
            picker="year"
            onChange={(value) => handleDateChange("endDate", value)}
            placeholder="Select end year"
          />
          {errors.endDate && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.endDate}</p>
          )}
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
          placeholder="e.g. 85% or 9.0 CGPA"
        />
        {errors.grade && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.grade}</p>
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
          placeholder="Write a brief description of your education"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          class="bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 
         dark:bg-gray-400 dark:text-black dark:border-gray-400 dark:hover:bg-gray-500 
         py-1 px-2 rounded">
          Cancel
        </button>

        <button
          onClick={(e) => handleSubmit(e)}
          class="bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 
         dark:bg-indigo-600 dark:text-black dark:border-indigo-600 dark:hover:bg-indigo-700 
         py-1 px-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}

export default EducationForm;
