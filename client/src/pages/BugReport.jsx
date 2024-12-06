import React, { useState } from "react";
import { message } from "antd";
import { createBugReport } from "../apis/admin";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/themeStore";

function Form() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();
  const [theme, toggleTheme] = useTheme();

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

    const dataWithUserId = { ...formData, userId: user.user_id };

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
    <div className="flex gap-2 mx-10">
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="500"
          height="auto"
          viewBox="0 0 537.64 577.45"
          className="hidden md:block h-auto">
          <rect
            x="280.93"
            y="-24.02"
            width="4"
            height="352.38"
            transform="translate(-37.98 167.04) rotate(-30.93)"
            fill="#ffffff"
          />
          <polygon
            points="245.05 178.56 268.82 186.38 268.82 152.16 247.25 152.16 245.05 178.56"
            fill="#f3a3a6"
          />
          <circle cx="265.88" cy="137.94" r="23.69" fill="#f3a3a6" />
          <path
            d="m259.85,139.8l3.26,3.96,5.91-10.34s7.54.39,7.54-5.21c0-5.6,6.92-5.75,6.92-5.75,0,0,9.79-17.1-10.49-12.59,0,0-14.07-9.64-21.06-1.4,0,0-21.45,10.8-15.31,29.61l10.2,19.39,2.31-4.39s-1.4-18.42,10.73-13.29Z"
            fill="#2f2e43"
          />
          <rect
            x="280.32"
            y="528.57"
            width="20.94"
            height="29.71"
            transform="translate(581.58 1086.85) rotate(-180)"
            fill="#f3a3a6"
          />
          <path
            d="m298.94,575.3c-3.58.32-21.5,1.74-22.4-2.37-.82-3.77.39-7.71.56-8.25,1.72-17.14,2.36-17.33,2.75-17.44.61-.18,2.39.67,5.28,2.53l.18.12.04.21c.05.27,1.33,6.56,7.4,5.59,4.16-.66,5.51-1.58,5.94-2.03-.35-.16-.79-.44-1.1-.92-.45-.7-.53-1.6-.23-2.68.78-2.85,3.12-7.06,3.22-7.23l.27-.48,23.8,16.06,14.7,4.2c1.11.32,2,1.11,2.45,2.17h0c.62,1.48.24,3.2-.96,4.28-2.67,2.4-7.97,6.51-13.54,7.02-1.48.14-3.44.19-5.64.19-9.19,0-22.61-.95-22.71-.97Z"
            fill="#2f2e43"
          />
          <rect
            x="202.3"
            y="493.53"
            width="20.94"
            height="29.71"
            transform="translate(72.11 1041.25) rotate(-142.5)"
            fill="#f3a3a6"
          />
          <path
            d="m199.84,538.64c-3.04-1.92-18.12-11.71-16.33-15.51,1.64-3.49,5-5.89,5.47-6.2,11.8-12.55,12.42-12.31,12.8-12.17.6.23,1.49,1.98,2.65,5.22l.07.2-.1.19c-.12.24-2.93,6.02,2.46,8.94,3.7,2.01,5.33,2.1,5.95,2.01-.18-.34-.36-.83-.31-1.4.07-.83.55-1.59,1.45-2.27,2.35-1.78,6.77-3.7,6.96-3.78l.5-.22,9.11,27.23,9.11,12.28c.69.93.91,2.1.62,3.22h0c-.41,1.56-1.76,2.69-3.37,2.81-3.58.28-10.29.31-15.01-2.67-1.25-.79-2.84-1.94-4.59-3.28-7.29-5.6-17.36-14.52-17.43-14.59Z"
            fill="#2f2e43"
          />

          <path
            d="m314.2,315.16l-79.06,8.07s-11.29,37.11,4.84,54.86l9.68,50.02-43.56,59.7,27.43,17.75,38.72-41.95v70.99l37.11-3.23,17.75-111.33-12.91-104.88Z"
            fill="#2f2e43"
          />
          <path
            d="m278.7,173.17s-6.45-11.29-33.88-9.68l-6.45,14.52s-19.36,4.84-19.36,33.88,9.68,116.17,9.68,116.17l94.39-5.65-43.66-136.47-.71-12.78Z"
            fill="#ccc"
          />
          <path
            d="m183.03,47.44c-3.34,22.1-1.81,44.89,4.34,66.36l103.82-54.67c-1.81-2.15-3.66-4.26-5.59-6.3-15.57-16.43-34.96-29.15-56.24-36.82-7.82,3.36-15.94,7.38-24.35,12.19-7.6,4.34-14.56,8.75-20.94,13.19-.39,2.01-.74,4.02-1.04,6.04Z"
            fill="#6c63ff"
          />
          <path
            d="m241.89,17.9c12,5.5,23.22,12.64,33.35,21.1,6.78,5.66,13.02,11.94,18.66,18.72l68.6-36.12s-47.65-40.3-129.12-7.25c2.87,1.1,5.71,2.28,8.5,3.56Z"
            fill="#6c63ff"
          />
          <path
            d="m182.33,106.3c-4.67-20.45-5.25-41.79-1.73-62.44-72.78,52.48-65.84,108.18-65.84,108.18l69.91-36.81c-.86-2.95-1.66-5.92-2.35-8.92Z"
            fill="#6c63ff"
          />
          <path
            id="uuid-215a2cca-fbee-4bbc-9bf2-8b7e67129ed8-960"
            d="m364.5,276.19c6.17,2.84,9.62,8.42,7.71,12.47-1.91,4.05-8.47,5.03-14.64,2.2-2.48-1.1-4.65-2.79-6.32-4.95l-25.99-12.36,6.4-12.46,24.95,13.51c2.74-.12,5.46.42,7.91,1.59,0,0,0,0,0,0Z"
            fill="#f3a3a6"
          />
          <path
            d="m348.4,285.3l-62.74-20.49-.07-.07-47.79-44.22c-7.32-6.77-8.42-17.96-2.55-26.03,3.59-4.94,9.15-7.89,15.25-8.1,6.1-.21,11.85,2.36,15.77,7.04l35.89,42.86,51.69,33.58-5.45,15.43Z"
            fill="#ccc"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="500"
          height="auto"
          viewBox="0 0 537.64 577.45"
          className="hidden md:block h-auto">
          <rect
            x="280.93"
            y="-24.02"
            width="4"
            height="352.38"
            transform="translate(-37.98 167.04) rotate(-30.93)"
            fill="#000019"
          />
          <polygon
            points="245.05 178.56 268.82 186.38 268.82 152.16 247.25 152.16 245.05 178.56"
            fill="#f3a3a6"
          />
          <circle cx="265.88" cy="137.94" r="23.69" fill="#f3a3a6" />
          <path
            d="m259.85,139.8l3.26,3.96,5.91-10.34s7.54.39,7.54-5.21c0-5.6,6.92-5.75,6.92-5.75,0,0,9.79-17.1-10.49-12.59,0,0-14.07-9.64-21.06-1.4,0,0-21.45,10.8-15.31,29.61l10.2,19.39,2.31-4.39s-1.4-18.42,10.73-13.29Z"
            fill="#2f2e43"
          />
          <rect
            x="280.32"
            y="528.57"
            width="20.94"
            height="29.71"
            transform="translate(581.58 1086.85) rotate(-180)"
            fill="#f3a3a6"
          />
          <path
            d="m298.94,575.3c-3.58.32-21.5,1.74-22.4-2.37-.82-3.77.39-7.71.56-8.25,1.72-17.14,2.36-17.33,2.75-17.44.61-.18,2.39.67,5.28,2.53l.18.12.04.21c.05.27,1.33,6.56,7.4,5.59,4.16-.66,5.51-1.58,5.94-2.03-.35-.16-.79-.44-1.1-.92-.45-.7-.53-1.6-.23-2.68.78-2.85,3.12-7.06,3.22-7.23l.27-.48,23.8,16.06,14.7,4.2c1.11.32,2,1.11,2.45,2.17h0c.62,1.48.24,3.2-.96,4.28-2.67,2.4-7.97,6.51-13.54,7.02-1.48.14-3.44.19-5.64.19-9.19,0-22.61-.95-22.71-.97Z"
            fill="#2f2e43"
          />
          <rect
            x="202.3"
            y="493.53"
            width="20.94"
            height="29.71"
            transform="translate(72.11 1041.25) rotate(-142.5)"
            fill="#f3a3a6"
          />
          <path
            d="m199.84,538.64c-3.04-1.92-18.12-11.71-16.33-15.51,1.64-3.49,5-5.89,5.47-6.2,11.8-12.55,12.42-12.31,12.8-12.17.6.23,1.49,1.98,2.65,5.22l.07.2-.1.19c-.12.24-2.93,6.02,2.46,8.94,3.7,2.01,5.33,2.1,5.95,2.01-.18-.34-.36-.83-.31-1.4.07-.83.55-1.59,1.45-2.27,2.35-1.78,6.77-3.7,6.96-3.78l.5-.22,9.11,27.23,9.11,12.28c.69.93.91,2.1.62,3.22h0c-.41,1.56-1.76,2.69-3.37,2.81-3.58.28-10.29.31-15.01-2.67-1.25-.79-2.84-1.94-4.59-3.28-7.29-5.6-17.36-14.52-17.43-14.59Z"
            fill="#2f2e43"
          />

          <path
            d="m314.2,315.16l-79.06,8.07s-11.29,37.11,4.84,54.86l9.68,50.02-43.56,59.7,27.43,17.75,38.72-41.95v70.99l37.11-3.23,17.75-111.33-12.91-104.88Z"
            fill="#2f2e43"
          />
          <path
            d="m278.7,173.17s-6.45-11.29-33.88-9.68l-6.45,14.52s-19.36,4.84-19.36,33.88,9.68,116.17,9.68,116.17l94.39-5.65-43.66-136.47-.71-12.78Z"
            fill="#ccc"
          />
          <path
            d="m183.03,47.44c-3.34,22.1-1.81,44.89,4.34,66.36l103.82-54.67c-1.81-2.15-3.66-4.26-5.59-6.3-15.57-16.43-34.96-29.15-56.24-36.82-7.82,3.36-15.94,7.38-24.35,12.19-7.6,4.34-14.56,8.75-20.94,13.19-.39,2.01-.74,4.02-1.04,6.04Z"
            fill="#6c63ff"
          />
          <path
            d="m241.89,17.9c12,5.5,23.22,12.64,33.35,21.1,6.78,5.66,13.02,11.94,18.66,18.72l68.6-36.12s-47.65-40.3-129.12-7.25c2.87,1.1,5.71,2.28,8.5,3.56Z"
            fill="#6c63ff"
          />
          <path
            d="m182.33,106.3c-4.67-20.45-5.25-41.79-1.73-62.44-72.78,52.48-65.84,108.18-65.84,108.18l69.91-36.81c-.86-2.95-1.66-5.92-2.35-8.92Z"
            fill="#6c63ff"
          />
          <path
            id="uuid-215a2cca-fbee-4bbc-9bf2-8b7e67129ed8-960"
            d="m364.5,276.19c6.17,2.84,9.62,8.42,7.71,12.47-1.91,4.05-8.47,5.03-14.64,2.2-2.48-1.1-4.65-2.79-6.32-4.95l-25.99-12.36,6.4-12.46,24.95,13.51c2.74-.12,5.46.42,7.91,1.59,0,0,0,0,0,0Z"
            fill="#f3a3a6"
          />
          <path
            d="m348.4,285.3l-62.74-20.49-.07-.07-47.79-44.22c-7.32-6.77-8.42-17.96-2.55-26.03,3.59-4.94,9.15-7.89,15.25-8.1,6.1-.21,11.85,2.36,15.77,7.04l35.89,42.86,51.69,33.58-5.45,15.43Z"
            fill="#ccc"
          />
        </svg>
      )}
      <div className="max-w-md sm:max-w-lg lg:max-w-xl w-full mx-auto my-10 p-6 bg-white dark:bg-zinc-900 border border-gray-400 dark:border-gray-400 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Report a Bug
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Title <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-zinc-900 focus:outline-none dark:focus:border-gray-400"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Description <span className="text-red-500">*</span>:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-zinc-900 focus:outline-none dark:focus:border-gray-400"
              rows="12"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full dark:bg-indigo-600 dark:hover:bg-indigo-700 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:text-black">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
