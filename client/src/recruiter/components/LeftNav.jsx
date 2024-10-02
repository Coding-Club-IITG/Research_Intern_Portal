import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon, BriefcaseIcon, PlusIcon } from "@heroicons/react/24/outline";

const LeftNav = () => {
  return (
    <div className="w-28 h-full shadow-md">
      <div className="space-y-4 mt-4">
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 mt-1"
            }
            exact
          >
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <HomeIcon className="h-6 w-6 text-gray-700" />
            Home
        </div>
          </NavLink>


          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 mt-1"
            }
            exact
          >
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <UserIcon className="h-6 w-6 text-gray-700" />
            Profile
        </div>
          </NavLink>

          <NavLink
            to="drives"
            className={({ isActive }) =>
              isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700 mt-1" : "text-gray-600 mt-1"
            }
            exact
          >
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <BriefcaseIcon className="h-6 w-6 text-gray-700" />
            Drives
        </div>
          </NavLink>
          
          <NavLink
            to="newdrive"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 border-b-2 pb-2 border-blue-700 mt-1 "
                : "text-gray-600 mt-1"
            }
            exact
          >
        <div className="flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded py-2">
          <PlusIcon className="h-6 w-6 text-gray-700" />
            New Drive
        </div>
          </NavLink>
      </div>
    </div>
  );
};

export default LeftNav;
