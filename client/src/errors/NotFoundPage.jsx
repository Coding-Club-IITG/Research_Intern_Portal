import React from "react";

const NotFoundPage = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('404.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20"></div>

      <div className="relative z-10 text-center text-white p-8 max-w-2xl">
        <h1 className="text-9xl font-extrabold mb-6 animate-pulse">404</h1>
        <p className="text-3xl font-semibold mb-4">Page Not Found 😕</p>
        <p className="text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
          Please check the URL or return to the previous page 🔍.
        </p>
        <button
          onClick={() => window.history.back()}
          className="relative px-6 py-3 rounded-full shadow-lg bg-blue-600 text-white font-bold transition-all duration-300 transform hover:bg-blue-700 hover:scale-105">
          <span className="absolute inset-0 rounded-full blur-lg bg-blue-600 opacity-30 animate-ping"></span>
          <span className="relative">Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
