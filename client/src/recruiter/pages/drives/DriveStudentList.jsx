import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Space } from "antd";
import { getAllStudentsOfJob } from "../../../apis/recruiter";
import { getCourseById } from "../../../apis/courses-departments";
import { getDepartmentById } from "../../../apis/courses-departments";
import { selectStudent, rejectStudent } from "../../../apis/recruiter";
import Loading from "../../../root-components/Loading";

function DriveStudentList() {
  const [loading, setLoading] = useState(false);
  const { driveIndex } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  console.log(driveIndex);

  function handleView(roll) {
    navigate(`/recruiter/profile/student/${roll}`);
  }

  useEffect(() => {
    async function fetchApplicants() {
      // message.loading({ content: "Loading...", key: "loading" });
      setLoading(true);
      const res = await getAllStudentsOfJob(driveIndex, navigate);
      if (res.status === "success") {
        // message.destroy("loading");
        setApplicants(res.data);
        console.log("Fetched applicants:", res.data);

      }
      setLoading(false);
    }

    fetchApplicants();
  }, [driveIndex, navigate]);

  console.log(applicants);

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text, record, index) => index + 1,
      width: "5%",
      align: "center",
      responsive: ["md"]
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      align: "center"
    },
    {
      title: "Roll No",
      dataIndex: "roll",
      key: "roll",
      width: "10%",
      align: "center"
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      width: "15%",
      align: "center",
      responsive: ["md"]
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
      align: "center",
      responsive: ["md"]
    },
    {
      title: "Actions",
      key: "actions",
      width: "40%",
      align: "center",
      render: (text, record) => (
        <Space size="middle" className="flex flex-wrap justify-center gap-2 lg:gap-4">
          <button
            className="px-2 py-1 md:px-4 md:py-2 rounded bg-gray-400 text-black border border-gray-400 hover:bg-gray-500 transition-all"
            onClick={() => handleView(record._id)}>
            View Profile
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 rounded bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-all"
            onClick={() => {
              selectStudent({ job_id: driveIndex, student_id: record._id }, navigate);
              navigate("/recruiter/profile/");
            }}>
            Accept
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 rounded bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-all"
            onClick={() => {
              rejectStudent({ job_id: driveIndex, student_id: record._id }, navigate);
              navigate("/recruiter/profile/");
            }}>
            Reject
          </button>
        </Space>
      )
    }
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 md:p-6 flex flex-col items-center">
      <h1 className="text-center mb-4 md:mb-6 dark:text-white">Applicants List</h1>

      {applicants.length === 0 ? (
        <div className="text-center text-gray-600">No applicants available.</div>
      ) : (
        <Table
          dataSource={applicants}
          columns={columns}
          rowKey="roll"
          pagination={{ pageSize: 5 }}
          bordered
          className="stud shadow-md w-full overflow-x-auto"
        />
      )}

      <div className="text-center mt-4 md:mt-6">
        <button
          className="px-4 py-2 rounded bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 transition-all"
          onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>
    </div>
  );
}

export default DriveStudentList;
