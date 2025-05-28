import React, { useEffect, useState } from "react";
import axios from "axios";
import ThemeToggle from "../pages/ThemeToggle";
import { Link, redirect, useNavigate } from "react-router-dom";
import { backendURL } from "../apis/server.js";
import useAuthStore from "../store/authStore.jsx";
import { useTheme } from "../store/themeStore";
import {
  getAllNotificationsOfUser,
  getNewNotifications,
  markAsRead
} from "../apis/notification.js";
import {
  Layout,
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Space,
  Typography
} from "antd";
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileTextOutlined,
  HomeOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  BugOutlined,
  MessageOutlined,
  SearchOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider.js";
import { use } from "react";

const { Text } = Typography;

const TopNav = () => {
  const { getUser } = useAuthStore();
  const [theme] = useTheme();
  const user = getUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [notifications, setNotifications] = useState([]);

  function ConvertTime(time) {
    let date = new Date(time);
    let curr = new Date();
    let diff = curr - date;
    let sec = Math.floor(diff / 1000);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);
    let day = Math.floor(hour / 24);
    let month = Math.floor(day / 30);
    let year = Math.floor(month / 12);
    if (year > 0) return year + " year" + (year > 1 ? "s" : "") + " ago";
    if (month > 0) return month + " month" + (month > 1 ? "s" : "") + " ago";
    if (day > 0) return day + " day" + (day > 1 ? "s" : "") + " ago";
    if (hour > 0) return hour + " hour" + (hour > 1 ? "s" : "") + " ago";
    if (min > 0) return min + " minute" + (min > 1 ? "s" : "") + " ago";
    if (sec > 0) return sec + " second" + (sec > 1 ? "s" : "") + " ago";
    return "Just now";
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotificationsOfUser(user.connection_id, navigate);
        setNotifications(response.notifications || []);
        setFetched(true);
        const newLastChecked = response.lastChecked || new Date().toISOString();
        localStorage.setItem("lastChecked", newLastChecked);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchNewNotifications = async () => {
      try {
        if (!fetched) return;
        let storedLastChecked = localStorage.getItem("lastChecked") || null;
        const response = await getNewNotifications(user.connection_id, storedLastChecked, navigate);

        if (response.notifications.length > 0) {
          setNotifications([...response.notifications, ...notifications]);
        }
        const newLastChecked = response.lastChecked || new Date().toISOString();
        localStorage.setItem("lastChecked", newLastChecked);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const interval = setInterval(fetchNewNotifications, 10000);

    return () => clearInterval(interval);
  }, [navigate, notifications, user.connection_id]);

  const handleLogout = async () => {
    try {
      // const response = await axios.get(`${backendURL}/logout`, { withCredentials: true });
      // window.location.href = `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/logout?client_id=694b6b04-c401-4e85-9a81-fe78f223dede&post_logout_redirect_uri=http://localhost:3000`;
      window.location.href = `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/logout?client_id=694b6b04-c401-4e85-9a81-fe78f223dede&post_logout_redirect_uri=http://localhost:8000`;
      // if (response.status === 200) navigate("/LogIn");
    } catch (error) {
      console.log(error?.response?.data || error);
    }
  };

  const items = [
    { label: <Link to="/">Home</Link>, key: "0" },
    { label: <span onClick={handleLogout}>Logout</span>, key: "1" },
    { label: <ThemeToggle />, key: "2" }
  ];
  let notification_mini;
  if (notifications.length > 0) {
    notification_mini = (
      <Menu className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div className="max-h-96 overflow-y-auto">
          {notifications?.slice(0, 4).map((notification, index) => (
            <div
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                markAsRead(notification._id);
                window.location.href = notification.link || `notifications/${user.connection_id}`;
              }}>
              <Menu.Item key={index} className="gap-3 p-4 transition-all">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start">
                    <Text
                      strong
                      className="text-sm max-w-[70%] block truncate"
                      title={notification.title}>
                      {notification.status === "unread" && <span className="text-red-500">* </span>}
                      {notification.title}
                    </Text>
                    <Text type="secondary" className="text-xs text-gray-500 block">
                      {ConvertTime(notification.createdAt)}
                    </Text>
                  </div>
                  <div className="flex">
                    <div className="mt-1 text-sm text-gray-600 line-clamp-1">
                      {notification.message}
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </div>
          ))}
        </div>
        <div className="border-t hover:bg-gray-100">
          <Menu.Item
            key="view-all"
            onClick={() => navigate(`notifications/${user.connection_id}`)}
            className="block text-center p-3 text-blue-600 font-medium cursor-pointer hover:bg-gray-100 transition-all">
            View all notifications
          </Menu.Item>
        </div>
      </Menu>
    );
  } else
    notification_mini = (
      <Menu>
        <Menu.Item key="1" icon={<QuestionCircleOutlined />}>
          <Text strong>No new notifications</Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="view-all" style={{ textAlign: "center" }}>
          View all notifications
        </Menu.Item>
      </Menu>
    );

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="theme" icon={<MenuOutlined />}>
        <Space>
          <ThemeToggle />
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout} key="logout" icon={<LogoutOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dark:border-b border-white sticky top-0 z-30 flex items-center gap-4 dark:border-0 border-b bg-white dark:bg-zinc-900 px-4 md:px-6">
      <img
        src={theme === "dark" ? "/rip_logo_dark.png" : "/rip_logo_light.png"}
        className="h-14"
        alt="Logo"
      />
      <div className="ml-auto flex items-center gap-4">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="hidden md:flex w-60"
        />

        <Dropdown overlay={notification_mini} trigger={["click"]} placement="bottomRight">
          <Badge count={2} className="dark:bg-blue-600 rounded-lg">
            <Button type="text" icon={<BellOutlined className="dark:border-white" />} />
          </Badge>
        </Dropdown>

        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <Avatar size={32} icon={<UserOutlined />} className="dark:bg-blue-600 rounded-lg" />
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNav;
