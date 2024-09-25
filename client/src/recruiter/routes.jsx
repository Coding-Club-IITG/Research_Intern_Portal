import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import RecruiterLayout from "./layout";

import RecruiterHome from "./pages/home/home";
import RecruiterProfile from "./pages/profile/profile";
import RecruiterDrives from "./pages/drives/drives";
import RecruiterNewDrive from "./pages/newdrive/newDrive";
import NotFoundPage from "../errors/NotFoundPage";

const RecuriterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RecruiterLayout />}>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<RecruiterHome />} />
        <Route path="profile" element={<RecruiterProfile />} />
        <Route path="drives" element={<RecruiterDrives />} />
        <Route path="newdrive" element={<RecruiterNewDrive />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RecuriterRoutes;
