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
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border dark:border-none p-4 h-full">
      <img
        src={theme === "dark" ? "/rip_logo_dark.png" : "/rip_logo_light.png"}
        className="h-14"
        alt="Logo"
      />
      <div className="flex max-sm:space-x-2 space-x-6 items-center">
        <NotificationBell />
        <Dropdown trigger={["click"]} menu={{ items }}>
          <button
            onClick={(e) => e.preventDefault()}
            className="bg-transparent border-none p-0 m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="size-6 dark:text-white">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNav;
