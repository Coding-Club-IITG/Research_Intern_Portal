import React from "react";

const InternalServerErrorPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center">
      <div className="relative z-10 text-center  p-8 max-w-2xl">
        <img src="/500.png" alt="500" className="w-96 mx-auto mb-8" />
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6">500</h1>
        <p className="text-2xl md:text-3xl font-semibold mb-4">Internal Server Error ⚠️</p>
        <p className="text-base md:text-lg mb-8">
          Oops! Something went wrong on our end. Please try refreshing the page or come back later.
          If the problem persists, contact support 🛠️.
        </p>
        <button
          onClick={() => window.history.back()}
          className="relative px-6 py-3 rounded-full shadow-lg bg-black font-bold text-white hover:shadow-md transition-all">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
