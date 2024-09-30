import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RecruiterLayout from "./layout";
import RecruiterHome from "./pages/home/home";

import ProfilePageLayout from "./pages/profile/RecruiterProfilePage";
import RecruiterProfile from "./pages/profile/RecruiterProfile";
import RecruiterOverview from "./pages/profile/Overview";

import RecruiterDrives from "./pages/drives/drives";
import RecruiterNewDrive from "./pages/newdrive/newDrive";

import NotFoundPage from "../errors/NotFoundPage";

const RecuriterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RecruiterLayout />}>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<RecruiterHome />} />
        <Route path="profile" element={<ProfilePageLayout />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<RecruiterOverview />} />
          <Route path="edit" element={<RecruiterProfile />} />
        </Route>
        <Route path="drives" element={<RecruiterDrives />} />
        <Route path="newdrive" element={<RecruiterNewDrive />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RecuriterRoutes;
