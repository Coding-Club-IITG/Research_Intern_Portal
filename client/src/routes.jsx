import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin/routes.jsx";
import StudentRoutes from "./student/routes.jsx";
import RecuriterRoutes from "./proff/routes.jsx";
import AdminHome from "./admin/pages/home/home.jsx";

const ClientRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/recuriter/*" element={<RecuriterRoutes />} />
      </Routes>
    </Router>
  );
};

export default ClientRoutes;
