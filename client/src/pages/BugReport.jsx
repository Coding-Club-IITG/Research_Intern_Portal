import React, { useState } from "react";
import { message } from "antd";
import { createBugReport } from "../apis/admin";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Form() {
  const { getUser } = useAuthStore(); // Access the getUser function
  const user = getUser(); // Get the user details, including userId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      message.error("Please fill in all required fields.");
      return;
    }

    const dataWithUserId = { ...formData, userId: user.user_id }; // Include userId in the submission data

    try {
      const responseMessage = await createBugReport(dataWithUserId, navigate);
      message.success(responseMessage || "Form successfully submitted!");

      setFormData({
        title: "",
        description: ""
      });
    } catch (error) {
      message.error("Failed to submit bug report. Please try again.");
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto my-10 p-6 bg-white dark:bg-slate-700 border border-gray-400 dark:border-yellow-400 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Submit a Title and Description
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
            Title <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-500 rounded-md shadow-sm text-gray-800 dark:text-white bg-white dark:bg-slate-700 focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
            Description <span className="text-red-500">*</span>:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full h-80 px-4 py-2 border border-gray-300 dark:border-yellow-500 rounded-md shadow-sm text-gray-800 dark:text-white bg-white dark:bg-slate-700 focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 dark:text-black">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
