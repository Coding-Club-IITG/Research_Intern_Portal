import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Department from "./pages/home/department.jsx";
import Course from "./pages/home/course.jsx";
import ProfessorsPage from "./pages/home/professor.jsx";
import StudentPage from "./pages/home/student.jsx";
import JobsPage from "./pages/home/jobs.jsx";
import NotFoundPage from "../errors/NotFoundPage.jsx";
import Dashboard from "./pages/home/home.jsx";
import ErrorLogPage from "./pages/home/error-logs.jsx";
import ServerLogPage from "./pages/home/server-logs.jsx";
import AdminLayout from "./layout.jsx";
import Bugs from "./pages/home/bugs.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
        <Route path="/course" element={<Course />} />
        <Route path="/professor" element={<ProfessorsPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/errors-logs" element={<ErrorLogPage />} />
        <Route path="/server-logs" element={<ServerLogPage />} />
        <Route path="/bugs" element={<Bugs />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
