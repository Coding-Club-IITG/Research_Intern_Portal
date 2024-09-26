import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRoutes from "./student/routes.jsx";
import RecuriterRoutes from "./recruiter/routes.jsx";
import AdminHome from "./admin/pages/home/home.jsx";
import LoginPage from "./pages/auth/auth.jsx";

const ClientRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/recuriter/*" element={<RecuriterRoutes />} />
      </Routes>
    </Router>
  );
};

export default ClientRoutes;
