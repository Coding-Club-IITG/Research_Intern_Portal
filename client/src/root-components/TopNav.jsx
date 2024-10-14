import React from "react";
import ThemeToggle from "../pages/ThemeToggle";
import NotificationBell from "../pages/Notifications";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';

const items = [
  {
    label: <Link>Home</Link>,
    key: '0',
  },
  {
    label: <Link>Logout</Link>,
    key: '1',
  },
  {
    label: <ThemeToggle />,
    key: '2',
  }
];

const TopNav = () => {
  return (
    <div className="flex items-center justify-between bg-white border p-4 h-full">
      <div className="text-xl font-bold text-blue-600">Research Intern Portal IIT Guwahati</div>
      <div className="flex max-sm:space-x-2 space-x-6 items-center">
        <Dropdown trigger={['click']} menu={{items}}>
          <a onClick={(e) => e.preventDefault()}>
            <span className="font-medium -mt-0.5 cursor-pointer">Menus</span>
          </a>
        </Dropdown>
        <NotificationBell />
      </div>
    </div>
  );
};

export default TopNav;
