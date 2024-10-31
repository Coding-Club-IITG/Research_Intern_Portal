import React from "react";
import axios from 'axios'
import ThemeToggle from "../pages/ThemeToggle";
import NotificationBell from "../pages/Notifications";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { backendURL } from "../apis/server.js";
import useAuthStore from "../store/authStore.jsx";

const TopNav = () => {

  const {getUser} = useAuthStore();
  const user = getUser;
  const navigate = useNavigate();
    
  const handleLogout = async ()=>{
    try {
      const response = await axios.get(`${backendURL}/api/v1/students/logout/${user.connection_id}`);
      console.log(response.data)
      if(response.status===200) navigate('/LogIn');
    } catch (error) {
      console.log(error?.response?.data || error);
    }
  }


  const items = [
    {
      label: <Link>Home</Link>,
      key: '0',
    },
    {
      label: <span onClick={handleLogout}>Logout</span>,
      key: '1',
    },
    {
      label: <ThemeToggle />,
      key: '2',
    }
  ];


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
