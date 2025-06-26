import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "antd";

const LeftNav = () => {
  return (
    <div className="justify-between flex flex-col w-full md:w-40 lg:w-72 h-18 md:h-full shadow-md bg-white dark:bg-zinc-900 text-gray-800 dark:text-white px-8">
      <div className="md:space-y-4 md:mt-4 flex md:flex-col md:px-0 px-4 md:gap-2 gap-2 max-sm:items-center max-sm:justify-center overscroll-x-scroll">
        <h2 className="text-lg font-semibold tracking-tight md:block hidden">Navigation</h2>
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center cursor-pointer dark:bg-blue-600 bg-gray-200 p-2 font-bold hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-xs md:text-base mt-1"
              : "flex gap-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-gray-600 dark:text-white text-xs md:text-base mt-1"
          }
          exact>
          <HomeIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          Home
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center p-2 cursor-pointer dark:bg-blue-600 bg-gray-200 font-bold  hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2  text-xs md:text-base mt-1"
              : "flex gap-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-gray-600 dark:text-white text-xs md:text-base mt-1"
          }
          exact>
          <UserIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          Profile
        </NavLink>

        <NavLink
          to="internships"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center p-2 cursor-pointer dark:bg-blue-600 hover:bg-gray-200 dark:hover:bg-blue-700 rounded py-2 font-bold  text-xs md:text-base mt-1"
              : "flex gap-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-gray-600 dark:text-white text-xs md:text-base mt-1"
          }
          exact>
          <BriefcaseIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          Internships
        </NavLink>

        <NavLink
          to="applied"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 font-bold text-xs md:text-base mt-1"
              : "flex gap-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-gray-600 dark:text-white text-xs md:text-base mt-1"
          }
          exact>
          <CheckIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          Applied
        </NavLink>

        <h2 className="text-lg font-semibold tracking-tight md:block hidden">Resources</h2>
        <NavLink
          to="faq"
          className={({ isActive }) =>
            isActive
              ? "md:flex hidden gap-2 items-center p-2 dark:bg-blue-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2  text-xs md:text-base mt-1"
              : "md:flex hidden gap-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-600 rounded py-2 text-gray-600 dark:text-white text-xs md:text-base mt-1"
          }
          exact>
          <UserIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          FAQs
        </NavLink>
      </div>
      <div className="mt-auto py-8 md:block hidden">
        <div className="rounded-lg bg-gray-200 p-3">
          <h3 className="mb-1 font-medium">Need help?</h3>
          <p className="text-xs text-muted-foreground">Contact our support team for assistance with any issues.</p>
          <Button className="mt-2 w-full text-xs" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
