import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRoutes from "./student/routes.jsx";
import RecruiterRoutes from "./recruiter/routes.jsx";
import AdminRoutes from "./admin/routes.jsx";
import NotFoundPage from "./errors/NotFoundPage.jsx";
import InternalServerErrorPage from "./errors/InternalServerErrorPage.jsx";
import MainLandingPage from "./pages/Main.jsx";
import LoginPage from "./pages/Login.jsx";
import ProtectedRoute from "./utils/protectedRoutes.jsx";
import AccessDeniedPage from "./errors/AccessDeniedPage.jsx";

const ClientRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<MainLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        {/* <Route path="/student/*" element={<StudentRoutes />} /> */}
        {/* <Route path="/recruiter/*" element={<RecruiterRoutes />} /> */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<AdminRoutes />} allowedRoles={["admin"]} />}
        />
        <Route
          path="/student/*"
          element={<ProtectedRoute element={<StudentRoutes />} allowedRoles={["student"]} />}
        />
        <Route
          path="/recruiter/*"
          element={<ProtectedRoute element={<RecruiterRoutes />} allowedRoles={["recruiter"]} />}
        />
        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="/403" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default ClientRoutes;
