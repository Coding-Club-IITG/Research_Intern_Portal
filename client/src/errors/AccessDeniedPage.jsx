import React from "react";

const AccessDeniedPage = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('AccessDenied.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20"></div>

      <div className="relative z-10 text-center text-white p-8 max-w-2xl">
        <h1 className="text-9xl font-extrabold mb-6 animate-pulse">403</h1>
        <p className="text-3xl font-semibold mb-4">Access Denied 🚫</p>
        <p className="text-lg mb-8">
          You do not have permission to access this page. Please return to the login page to
          continue.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="relative px-6 py-3 rounded-full shadow-lg bg-red-600 text-white font-bold transition-all duration-300 transform hover:bg-red-700 hover:scale-105">
          <span className="absolute inset-0 rounded-full blur-lg bg-red-600 opacity-30 animate-ping"></span>
          <span className="relative">Back to Login</span>
        </button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
