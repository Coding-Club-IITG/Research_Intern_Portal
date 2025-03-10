import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAllRecruiters } from "../../../apis/recruiter";
import { getAllStudents } from "../../../apis/student";
import { useNavigate } from "react-router-dom";
import {
  createNotificationForAll,
  createNotificationForRecruiters,
  createNotificationForSpecificUsers,
  createNotificationForStudents
} from "../../../apis/notification";

export default function Announcement() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecruiters = async () => {
      const response = await getAllRecruiters(navigate);
      setRecruiters(response.data);
    };
    fetchRecruiters();
  }, [navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getAllStudents(navigate);
      setStudents(response.data);
    };
    fetchStudents();
  }, [navigate]);

  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          value={record._id}
          onChange={() => handleCheckboxChange(record._id)}
        />
      )
    }
  ];

  const handleTileChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSendNotification = async () => {
    if (selectedOption === "all") {
      await createNotificationForAll({ title, message: content, link: link }, navigate);
    } else if (selectedOption === "students") {
      await createNotificationForStudents({ title, message: content, link: link }, navigate);
    } else if (selectedOption === "recruiters") {
      await createNotificationForRecruiters({ title, message: content, link: link }, navigate);
    } else {
      await createNotificationForSpecificUsers(
        { title, message: content, link: link, userIds: selectedUsers },
        navigate
      );
    }
    setTitle("");
    setMessage("");
    setLink("");
    setSelectedUsers([]);
    setSelectedOption("all");
    message.success("Notification sent successfully");
  };
  return (
    <div className="p-6 mx-auto bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={handleTileChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={content}
            onChange={handleMessageChange}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Link:</label>
          <input
            className="w-full p-2 border rounded"
            rows="4"
            value={link}
            onChange={handleLinkChange}></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Announcement For:</label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center">
              <input
                type="radio"
                name="target"
                value="all"
                checked={selectedOption === "all"}
                onChange={() => setSelectedOption("all")}
                className="mr-2"
              />
              All Users
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="target"
                value="students"
                checked={selectedOption === "students"}
                onChange={() => setSelectedOption("students")}
                className="mr-2"
              />
              Students
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="target"
                value="recruiters"
                checked={selectedOption === "recruiters"}
                onChange={() => setSelectedOption("recruiters")}
                className="mr-2"
              />
              Recruiters
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="target"
                value="selected"
                checked={selectedOption === "selected"}
                onChange={() => setSelectedOption("selected")}
                className="mr-2"
              />
              Selected Users Only
            </label>
          </div>
        </div>
        {selectedOption === "selected" && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Select Users</h3>
            <div className="flex gap-8">
              <div className="w-1/2">
                <h4 className="font-medium mb-2">Students</h4>
                <Table dataSource={students} columns={columns} rowKey="id" />
              </div>
              <div className="w-1/2">
                <h4 className="font-medium mb-2">Recruiters</h4>
                <Table dataSource={recruiters} columns={columns} rowKey="id" />
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleSendNotification}
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded">
          Send Notification
        </button>
      </div>
    </div>
  );
}
