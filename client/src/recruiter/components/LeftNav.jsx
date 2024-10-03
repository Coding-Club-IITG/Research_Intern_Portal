import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  PlusIcon,
  BugAntIcon
} from "@heroicons/react/24/outline";

const LeftNav = () => {
  return (
    <div className="w-28 h-full shadow-md">
      <div className="space-y-4 mt-4">
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <HomeIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1">Home</span>
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <UserIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1">Profile</span>
        </NavLink>

        <NavLink
          to="drives"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <BriefcaseIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1">Drives</span>
        </NavLink>

        <NavLink
          to="newdrive"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <PlusIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1">New Drive</span>
        </NavLink>

        <NavLink
          to="bugReport"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <BugAntIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1">Bug Report</span>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftNav;
