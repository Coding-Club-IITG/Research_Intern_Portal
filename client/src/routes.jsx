import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin/routes.jsx";
import StudentRoutes from "./student/routes.jsx";
import RecruiterRoutes from "./recruiter/routes.jsx";
import AdminHome from "./admin/pages/home/home.jsx";
import NotFoundPage from "./errors/NotFoundPage.jsx";
import Main from "./pages/Main.jsx";
import InternalServerErrorPage from "./errors/InternalServerErrorPage.jsx";

const ClientRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Main />} />
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
