import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/home/home";
import NotFoundPage from "../errors/NotFoundPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
