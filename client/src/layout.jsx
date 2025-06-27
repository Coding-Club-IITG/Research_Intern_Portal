// layout.jsx
import React from "react";
import StudentLayout from "./student/layout";
import AdminLayout from "./admin/layout";
import RecruiterLayout from "./recruiter/layout";

const Layout = ({ role, children }) => {
  if (role === "student") {
    return <StudentLayout>{children}</StudentLayout>;
  } else if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  } else if (role === "professor") {
    return <RecruiterLayout>{children}</RecruiterLayout>;
  } else {
    return <div>{children}</div>;
  }
};

export default Layout;
