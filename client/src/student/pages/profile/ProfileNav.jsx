import React from "react";
import { NavLink } from "react-router-dom";
const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Edit your Profile</h1>
      <div className="border-b border-gray-300 mb-6 dark:border-zinc-700">
        <ul className="flex gap-8 font-xl mt-6 mb-2">
          <li>
            <NavLink
              to="overview"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 pb-2 border-indigo-400"
                  : "text-gray-600 dark:text-white"
              }
              exact>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`edit`}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 pb-2 border-indigo-400"
                  : "text-gray-600 dark:text-white"
              }>
              Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`resume`}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 pb-2 border-indigo-400"
                  : "text-gray-600 dark:text-white"
              }>
              Resume/CV
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default App;
