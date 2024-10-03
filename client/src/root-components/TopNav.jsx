import React from "react";
import ThemeToggle from "../pages/ThemeToggle";
import NotificationBell from "../pages/Notifications";

const TopNav = () => {
  return (
    <div className="flex items-center justify-between bg-white border p-4 h-full">
      <div className="text-xl font-bold text-blue-600">Research Intern Portal IIT Guwahati</div>
      <div className="flex space-x-6">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Logout</div>
        <div className="cursor-pointer">
            <ThemeToggle/>
        </div>
        <div className="cursor-pointer">
            <NotificationBell/>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
