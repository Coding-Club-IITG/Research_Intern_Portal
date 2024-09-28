import React from "react";

const InternalServerErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">500</h1>
      <p className="text-2xl text-gray-600 mb-4">Internal Server Error ⚠️</p>
      <p className="text-lg text-gray-500 mb-6">
        Oops! Something went wrong on our end. Please try refreshing the page or come back later. If
        the problem persists, contact support 🛠️.
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

export default InternalServerErrorPage;
