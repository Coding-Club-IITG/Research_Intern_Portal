import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/home/home";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
    </Routes>
  );
};

export default AdminRoutes;
