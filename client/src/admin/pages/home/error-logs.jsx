import React from "react";
import { Table } from "antd";

const errors = [
  {
    key: "1",
    level: "error",
    message:
      "Updating student is not successful because student with ID 66f9462a6359af1dedb19b7c does not exist in the database.",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    key: "2",
    level: "error",
    message:
      "Updating student is not successful because student with ID 66f9462a6359af1dedb19b7c does not exist in the database.",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    key: "3",
    level: "error",
    message:
      "Updating student is not successful because student with ID 66f9462a6359af1dedb19b7c does not exist in the database.",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    key: "4",
    level: "error",
    message:
      "Updating student is not successful because student with ID 66f9462a6359af1dedb19b7c does not exist in the database.",
    timestamp: "2024-10-04T04:25:22.141Z"
  }
];

export default function ErrorLogPage() {
  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => (
        <span style={{ color: text === "error" ? "red" : "black" }}>{text.toUpperCase()}</span>
      )
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message"
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => new Date(text).toLocaleString()
    }
  ];

  return (
    <div className="w-full p-4">
      <Table dataSource={errors} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
}
