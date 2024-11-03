import React from "react";
import axios from "axios";
import ThemeToggle from "../pages/ThemeToggle";
import NotificationBell from "../pages/Notifications";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../apis/server.js";
import useAuthStore from "../store/authStore.jsx";
import { useTheme } from "../store/themeStore";

const TopNav = () => {
  const { getUser } = useAuthStore();
  const [theme] = useTheme();
  const user = getUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/students/logout/${user.connection_id}`
      );
      if (response.status === 200) navigate("/LogIn");
    } catch (error) {
      console.log(error?.response?.data || error);
    }
  };

  const items = [
    { label: <Link to="/">Home</Link>, key: "0" },
    { label: <span onClick={handleLogout}>Logout</span>, key: "1" },
    { label: <ThemeToggle />, key: "2" }
  ];

  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 border dark:border-gray-700 p-4 h-full">
      <img
        src={theme === "dark" ? "/rip_logo_dark.png" : "/rip_logo_light.png"}
        className="h-14"
        alt="Logo"
      />
      <div className="flex max-sm:space-x-2 space-x-6 items-center">
        <Dropdown trigger={["click"]} menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <span className="font-medium -mt-0.5 cursor-pointer text-gray-800 dark:text-gray-300">
              Menus
            </span>
          </a>
        </Dropdown>
        <NotificationBell />
      </div>
    </div>
  );
};

export default TopNav;
