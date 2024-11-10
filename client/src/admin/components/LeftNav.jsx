import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="bg-gray-100 w-60 h-full p-4">
      <ul className="flex flex-col gap-4">
        <Link to="/admin/" className="font-medium text-lg">
          Dashboard
        </Link>
        <Link to="/admin/professor" className="font-medium text-lg">
          Professor
        </Link>
        <Link to="/admin/student" className="font-medium text-lg">
          Student
        </Link>
        <Link to="/admin/jobs" className="font-medium text-lg">
          Jobs
        </Link>
        <Link to="/admin/department" className="font-medium text-lg">
          Department
        </Link>
        <Link to="/admin/course" className="font-medium text-lg">
          Course
        </Link>
        <Link to="/admin/bugs" className="font-medium text-lg">
          Bugs
        </Link>
        <Link to="/admin/errors-logs" className="font-medium text-lg">
          Error Logs
        </Link>
        <Link to="/admin/server-logs" className="font-medium text-lg">
          Server Logs
        </Link>
      </ul>
    </div>
  );
};

export default LeftNav;
