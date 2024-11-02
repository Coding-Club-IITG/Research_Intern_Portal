import React from "react";
import { NavLink } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold mb-4">Edit your Profile</h1>
      <div className="border-b border-gray-300 mb-6">
        <ul className="flex gap-8 font-xl mt-6 mb-2">
          <li>
            <NavLink
              to="overview"
              className={({ isActive }) =>
                isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700" : "text-gray-600"
              }
              exact
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`edit`}
              className={({ isActive }) =>
                isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700" : "text-gray-600"
              }
            >
              Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`resume`}
              className={({ isActive }) =>
                isActive ? "text-blue-700 border-b-2 pb-2 border-blue-700" : "text-gray-600"
              }
            >
              Resume/CV
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default App;
