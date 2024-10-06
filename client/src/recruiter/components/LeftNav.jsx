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
    <div className="w-full md:w-20 lg:w-28 h-18 md:h-full shadow-md">
      <div className="md:space-y-4 md:mt-4 flex md:flex-col md:px-0 px-2 md:gap-2 gap-6 max-sm:items-center max-sm:justify-center overscroll-x-scroll">
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-blue-700 border-b-2 pb-2 border-blue-700"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2 text-gray-600"
          }
          exact>
          <HomeIcon className="h-6 w-6 text-gray-700" />
          <span className="mt-1 max-sm:text-xs">Home</span>
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
          <span className="mt-1 max-sm:text-xs">Profile</span>
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
          <span className="mt-1 max-sm:text-xs">Drives</span>
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
          <span className="mt-1 max-sm:text-xs">New Drive</span>
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
          <span className="mt-1 max-sm:text-xs">Bug Report</span>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftNav;
