import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const goToRolePage = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "student":
        navigate("/student");
        break;
      case "recruiter":
        navigate("/recruiter");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Portal</h1>

      {/* Buttons to navigate based on role */}
      <button
        onClick={() => goToRolePage("admin")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Admin Portal
      </button>

      <button
        onClick={() => goToRolePage("student")}
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
      >
        Student Portal
      </button>

      <button
        onClick={() => goToRolePage("recruiter")}
        className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600"
      >
        Recruiter Portal
      </button>
    </div>
  );
};

export default FrontPage;
