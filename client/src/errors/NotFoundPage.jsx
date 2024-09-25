import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mb-4">Page Not Found 😕</p>
      <p className="text-lg text-gray-500 mb-6">
        Sorry, the page you're looking for doesn't exist. It may have been moved
        or deleted. Please check the URL or return to the previous page 🔍.
      </p>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
