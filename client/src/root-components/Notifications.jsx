import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  deleteNotification,
  getAllNotificationsOfUser,
  markAsRead,
  markAsUnread
} from "../apis/notification";
import { Table, Button, message } from "antd";

function Notifications() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const fetchNotifications = async () => {
    try {
      const response = await getAllNotificationsOfUser(id);
      setNotifications(response.notifications || []);
      console.log("Notifications:", response.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId, navigate);
      fetchNotifications();
      message.success("Notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleReadChange = async (record) => {
    try {
      if (record.status === "read") {
        await markAsUnread(record._id, navigate);
      } else {
        await markAsRead(record._id, navigate);
      }

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === record._id
            ? { ...notif, status: notif.status === "read" ? "unread" : "read" }
            : notif
        )
      );

      message.success(`Notification marked as ${record.status === "read" ? "unread" : "read"}`);
    } catch (error) {
      console.error("Error marking notification as read/unread:", error);
    }
  };

  const columns = [
    {
      title: "Read",
      dataIndex: "type",
      key: "type",
      width: "2.5%",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={record.status === "read"}
          onChange={() => handleReadChange(record)}
          className="w-5 h-5 cursor-pointer rounded-md border-gray-400 focus:ring-0 transition-all hover:bg-gray-100 checked:bg-blue-500 checked:border-transparent"
        />
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: (text, record) => (
        <div className="flex items-center">
          <span className="font-semibold">
            {record.status === "unread" && <span className="text-red-400 font-bold">*</span>} {text}
          </span>
        </div>
      )
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "50%"
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "11.5%",
      render: (date) => ConvertTime(date)
    },
    {
      title: "Actions",
      key: "actions",
      width: "11.5%",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="default"
            onClick={() => handleDeleteNotification(record._id)}
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span className="text-sm">Delete</span>
          </Button>
          {record.link && (
            <Link to={record.link}>
              <Button
                type="default"
                className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-all text-sm">
                View More
              </Button>
            </Link>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Notifications</h2>
        <Button onClick={() => navigate(-1)} type="default">
          Back
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={notifications}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "100%" }}
      />
    </div>
  );
}

export default Notifications;
