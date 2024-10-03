import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon, BriefcaseIcon, CheckIcon, BugAntIcon } from "@heroicons/react/24/outline";

const LeftNav = () => {
  return (
    <div className="w-full md:w-20 lg:w-28 h-18 md:h-full shadow-md">
      <div className="md:space-y-4 md:mt-4 flex md:flex-col md:px-0 px-2 md:gap-2 gap-6 max-sm:items-center max-sm:justify-center overscroll-x-scroll">
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <HomeIcon className="h-6 w-6 text-gray-700" />
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? "text-blue-700 text-xs md:text-base border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 mt-1"
            }
            exact
          >
            Home
          </NavLink>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <UserIcon className="h-6 w-6 text-gray-700" />
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "text-blue-700 text-xs md:text-base border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 text-xs md:text-base mt-1"
            }
            exact
          >
            Profile
          </NavLink>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <BriefcaseIcon className="h-6 w-6 text-gray-700" />
          <NavLink
            to="internships"
            className={({ isActive }) =>
              isActive ? "text-blue-700 text-xs md:text-base border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 text-xs md:text-base mt-1"
            }
            exact
          >
            Internships
          </NavLink>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <CheckIcon className="h-6 w-6 text-gray-700" />
          <NavLink
            to="applied"
            className={({ isActive }) =>
              isActive ? "text-blue-700 text-xs md:text-base border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 text-xs md:text-base mt-1"
            }
            exact
          >
            Applied
          </NavLink>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <BugAntIcon className="h-6 w-6 text-gray-700" />
          <NavLink
            to="bugReport"
            className={({ isActive }) =>
              isActive ? "text-blue-700 text-xs md:text-base border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 text-xs md:text-base mt-1"
            }
            exact
          >
            Bug Report
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
