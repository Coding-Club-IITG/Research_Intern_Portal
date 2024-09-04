import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHome from "./pages/home/home";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentHome />} />
    </Routes>
  );
};

export default StudentRoutes;
