import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="p-2">
      <ul className="flex gap-4 items-center w-full">
        <Link to="/admin/" className="font-medium text-lg">Dashboard</Link>
        <Link to="/admin/professor" className="font-medium text-lg">Professor</Link>
        <Link to="/admin/student" className="font-medium text-lg">Student</Link>
        <Link to="/admin/jobs" className="font-medium text-lg">Jobs</Link>
        <Link to="/admin/branch" className="font-medium text-lg">Branch</Link>
        <Link to="/admin/course" className="font-medium text-lg">Course</Link>
        <Link to="/admin/errors-logs" className="font-medium text-lg">Error Logs</Link>
        <Link to="/admin/server-logs" className="font-medium text-lg">Server Logs</Link>
      </ul>
      <main><Outlet /></main>

    </div>
  );
};

export default AdminLayout;
