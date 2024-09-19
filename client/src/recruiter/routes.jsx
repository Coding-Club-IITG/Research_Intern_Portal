import React from "react";
import { Route, Routes } from "react-router-dom";
import RecuriterHome from "./pages/home/home";

const RecuriterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RecuriterHome />} />
    </Routes>
  );
};

export default RecuriterRoutes;
