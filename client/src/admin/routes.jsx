import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/home/home.jsx";
import NotFoundPage from "../errors/NotFoundPage";
import Prof from "./pages/home/professor.jsx";
import Student from "./pages/home/student.jsx";
import Job from "./pages/home/jobs.jsx";
// import BranchManager from "./pages/home/components/BranchManager.jsx";
import Branch from "./pages/home/branch.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />}></Route>
      <Route path="/professor" element={<Prof />}></Route>
      <Route path="/student" element={<Student />}></Route>
      <Route path="/jobs" element={<Job />}></Route>
      <Route path="/branch" element={<Branch />}></Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
