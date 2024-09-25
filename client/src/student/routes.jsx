import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./layout";

import StudentHome from "./pages/home/home";

import StudentProfilePage from "./pages/profile/StudentProfilePage";
import StudentProfile from "./pages/profile/StudentProfile";
import StudentOverview from "./pages/profile/Overview";
import StudentCv from "./pages/profile/StudentCv";

import StudentInternships from "./pages/internships/Internships";
import StudentApplied from "./pages/applied/applied";
import InternshipDetail from "./pages/internships/InternshipDetail";
import NotFoundPage from "../errors/NotFoundPage";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="profile" element={<StudentProfilePage />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="edit" element={<StudentProfile />} />
          <Route path="overview" element={<StudentOverview />} />
          <Route path="resume" element={<StudentCv />} />
        </Route>
        <Route path="internships">
          <Route index element={<StudentInternships />} />
          <Route
            path="internship/:internshipID"
            element={<InternshipDetail />}
          />
        </Route>

        <Route path="applied" element={<StudentApplied />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default StudentRoutes;
