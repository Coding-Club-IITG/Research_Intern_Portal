import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  CheckIcon,
  BugAntIcon
} from "@heroicons/react/24/outline";

const LeftNav = () => {
  return (
    <div className="w-full md:w-20 lg:w-28 h-18 md:h-full shadow-md bg-white dark:bg-zinc-900 text-gray-800 dark:text-white">
      <div className="md:space-y-4 md:mt-4 flex md:flex-col md:px-0 px-2 md:gap-2 gap-6 max-sm:items-center max-sm:justify-center overscroll-x-scroll">
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-blue-700 dark:text-blue-300 text-xs md:text-base border-b-2 pb-2 border-blue-700 dark:border-white mt-1"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-gray-600 dark:text-gray-300 text-xs md:text-base mt-1"
          }
          exact>
          <HomeIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Home
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-blue-700 dark:text-blue-300 text-xs md:text-base border-b-2 pb-2 border-blue-700 dark:border-white mt-1"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-gray-600 dark:text-gray-300 text-xs md:text-base mt-1"
          }
          exact>
          <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Profile
        </NavLink>

        <NavLink
          to="internships"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-blue-700 dark:text-blue-300 text-xs md:text-base border-b-2 pb-2 border-blue-700 dark:border-white mt-1"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-gray-600 dark:text-gray-300 text-xs md:text-base mt-1"
          }
          exact>
          <BriefcaseIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Internships
        </NavLink>

        <NavLink
          to="applied"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-blue-700 dark:text-blue-300 text-xs md:text-base border-b-2 pb-2 border-blue-700 dark:border-white mt-1"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-gray-600 dark:text-gray-300 text-xs md:text-base mt-1"
          }
          exact>
          <CheckIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Applied
        </NavLink>

        <NavLink
          to="bugReport"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-blue-700 dark:text-blue-300 text-xs md:text-base border-b-2 pb-2 border-blue-700 dark:border-white mt-1"
              : "flex flex-col items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded py-2 text-gray-600 dark:text-gray-300 text-xs md:text-base mt-1"
          }
          exact>
          <BugAntIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Bug Report
        </NavLink>
      </div>
    </div>
  );
};

export default LeftNav;
