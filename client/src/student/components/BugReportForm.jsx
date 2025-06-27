import React, { useState } from "react";
import { message } from "antd";
import { createBugReport } from "../../apis/admin";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../store/themeStore";

function BugReportForm({ isOpen, onClose }) {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();
  const [theme] = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  if (!isOpen) return null; // Ensure modal doesn't render when not needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      message.error("Please fill in all required fields.");
      return;
    }

    const payload = { ...formData, userId: user.user_id };

    try {
      const responseMessage = await createBugReport(payload, navigate);
      message.success(responseMessage || "Bug report submitted!");
      setFormData({ title: "", description: "" });
      onClose(); // Close modal
    } catch (err) {
      message.error("Failed to submit bug report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-xl w-full mx-4 sm:mx-auto bg-white dark:bg-zinc-900 border border-gray-400 dark:border-gray-700 rounded-lg p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Report Bug
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white bg-white dark:bg-zinc-900 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="10"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white bg-white dark:bg-zinc-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BugReportForm;