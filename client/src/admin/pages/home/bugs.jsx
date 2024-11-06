import React, { useEffect, useState } from "react";
import { getAllBugReports } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Table, Pagination } from "antd";

function Bugs() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await getAllBugReports();
        console.log(response);
        setBugs(response);
      } catch (error) {
        console.error("Failed to fetch bug reports:", error);
        navigate("/500");
      }
    };
    fetchBugs();
  }, [navigate]);

  // Columns definition with responsive behavior
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      responsive: ["md"] // Display from medium screens and above
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%", // Adjust width for responsiveness
      responsive: ["sm"]
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true // Adds ellipsis on overflow
    },
    {
      title: "Reported by",
      dataIndex: ["userId", "name"],
      key: "reportedBy",
      render: (_, record) => `${record.userId?.name || "Unknown"} (${record.userId?._id || "N/A"})`,
      responsive: ["lg"] // Display from large screens and above
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      responsive: ["sm"] // Display from small screens and above
    }
  ];

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bugs</h1>
      <div className="overflow-x-auto">
        {" "}
        {/* Adds horizontal scroll on small screens */}
        <Table
          dataSource={bugs}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{ x: 800 }} // Minimum width to enable horizontal scrolling
        />
      </div>
      <Pagination
        className="mt-4 text-center"
        current={currentPage}
        pageSize={pageSize}
        total={bugs.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "20"]}
      />
    </div>
  );
}

export default Bugs;
