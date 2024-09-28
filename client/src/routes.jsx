import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRoutes from "./student/routes.jsx";
import RecruiterRoutes from "./recruiter/routes.jsx";
import AdminHome from "./admin/pages/home/home.jsx";
import NotFoundPage from "./errors/NotFoundPage.jsx";
import InternalServerErrorPage from "./errors/InternalServerErrorPage.jsx";
import RecuriterRoutes from "./recruiter/routes.jsx";
import MainLandingPage from "./pages/Main.jsx";
import LoginPage from "./pages/Login.jsx";

const ClientRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<MainLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/recruiter/*" element={<RecruiterRoutes />} />
        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default ClientRoutes;
