import React from "react";
import { Table } from "antd";

const servers = [
  {
    key: "1",
    level: "error",
    message:
      "Updating student is not successful because student with ID 66f9462a6359af1dedb19b7c does not exist in the database.",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    key: "2",
    level: "warning",
    message: "Database connection latency has increased significantly.",
    timestamp: "2024-10-03T15:30:10.123Z"
  },
  {
    key: "3",
    level: "info",
    message: "Backup process completed successfully.",
    timestamp: "2024-10-03T10:20:45.987Z"
  }
];

export default function ServerLogPage() {
  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => (
        <span
          style={{
            color: text === "error" ? "red" : text === "warning" ? "orange" : "green"
          }}>
          {text.toUpperCase()}
        </span>
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
      key: "timestamp"
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Table dataSource={servers} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
}
