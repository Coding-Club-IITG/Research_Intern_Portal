import React, { useEffect, useState } from "react";
import axios from "axios";
import ThemeToggle from "../pages/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../apis/server.js";
import useAuthStore from "../store/authStore.jsx";
import { useTheme } from "../store/themeStore";
import { getNewNotifications } from "../apis/notification.js";
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

const { Text } = Typography;

const TopNav = () => {
  const { getUser } = useAuthStore();
  const [theme] = useTheme();
  const user = getUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let storedLastChecked = localStorage.getItem("lastChecked") || null;
        const response = await getNewNotifications(user.connection_id, storedLastChecked, navigate);

        if (response.notifications.length > 0) {
          setNewNotifications(response.notifications || []);
          setNotifications([...response.notifications, ...notifications]);
        }
        const newLastChecked = response.lastChecked || new Date().toISOString();
        localStorage.setItem("lastChecked", newLastChecked);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [navigate, notifications, user.connection_id]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/logout`,
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
  let notification_mini;
  if (newNotifications.length === 1) {
    notification_mini = (
      <Menu>
        <Menu.Item key="1" icon={<FileTextOutlined />}>
          <Text strong>Hi</Text>
          <br />
          <Text type="secondary">H</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            2 hours ago
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="view-all" style={{ textAlign: "center" }}>
          View all notifications
        </Menu.Item>
      </Menu>
    );
  } else if (newNotifications.length > 1) {
    notification_mini = (
      <Menu>
        <Menu.Item key="1" icon={<FileTextOutlined />}>
          <Text strong>Hi</Text>
          <br />
          <Text type="secondary">H</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            2 hours ago
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" icon={<FileTextOutlined />}>
          <Text strong>Hi</Text>
          <br />
          <Text type="secondary">H</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            2 hours ago
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="view-all" style={{ textAlign: "center" }}>
          View all notifications
        </Menu.Item>
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
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
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
