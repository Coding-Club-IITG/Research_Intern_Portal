import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../../apis/recruiter";
import Htmlrender from "../../../utils/htmlrender";
import { message } from "antd";
import { getDepartmentById } from "../../../apis/courses-departments";
import { reopenApplications, stopAcceptingJob } from "../../../apis/job";

export default function DriveDetail() {
  const { driveIndex } = useParams();
  const [drive, setDrive] = useState({});
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const handleStop = async () => {
    await stopAcceptingJob(drive._id, navigate);
    message.success("Applications are closed for this drive");
    window.location.reload();
  };

  const handleReopen = async () => {
    await reopenApplications(drive._id, navigate);
    message.success("Applications are reopened for this drive");
    window.location.reload();
  };

  const handleExtend = async () => {
    navigate(`/recruiter/edit-drive/${drive._id}`);
  };

  useEffect(() => {
    message.loading({ content: "Loading...", key: "loading" });
    async function fetchDrive() {
      const res = await getJobById(driveIndex, navigate);
      if (res.status === "success") {
        let departments = [];
        if (
          res.data.requirements.department.length === 1 &&
          res.data.requirements.department[0] === "All departments are allowed"
        ) {
          message.destroy("loading");
          setDepartments(["All departments are allowed"]);
          setDrive(res.data);
          return;
        }
        departments = await Promise.all(
          res.data.requirements.department.map(async (dept) => {
            const dept_details = await getDepartmentById(dept, navigate);
            return dept_details.data.name;
          })
        );
        message.destroy("loading");
        setDepartments(departments);
        setDrive(res.data);
      }
    }

    fetchDrive();
  }, []);

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${driveIndex}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${driveIndex}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const currentdate = new Date();

  return (
    <>
      {/* Drive Header Section */}
      <div className="max-w-4xl mt-8 mx-auto p-6 bg-white dark:bg-zinc-800 dark:shadow-gray-500 shadow-md rounded-lg mb-8">
        <div className="flex justify-between items-start max-sm:flex-col max-sm:gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {drive?.title || ""}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {drive?.prof_name || ""}
            </p>

            {/* Drive Tags
            <div className="mt-3 flex flex-wrap gap-2">
              {drive?.tags &&
                drive?.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {tag.trim()}
                  </span>
                ))}
            </div> */}
            {/* Role and Stipend */}

            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              <span>Role: {drive?.type || ""}</span> <span>•</span>{" "}
              <span>Stipend: ₹{drive?.stipend || " "}</span>
            </div>
            <div className="mt-1 text-sm">
              <div
                className={`text-sm ${new Date(drive?.last_date) > currentdate ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {drive?.accepting ? (
                  `Closing Date: ${new Date(drive.last_date).toLocaleDateString()}`
                ) : (
                  <div className="flex-col">
                    <div className="text-red-600 dark:text-red-400">Not Accepting</div>
                    <div>Closing Date: {new Date(drive.last_date).toLocaleDateString()} </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex-col space-y-2 items-center justify-center">
            <div className="flex gap-4 justify-center">
              {new Date(drive?.last_date) > currentdate && drive?.accepting && (
                <button
                  className="border bg-gray-400 border-black dark:border-gray-600 hover:bg-gray-500 px-4 py-2 max-sm:py-1 rounded"
                  onClick={handleEdit}>
                  Edit
                </button>
              )}
              <button
                className="border border-black bg-blue-500 hover:bg-blue-600 dark:border-gray-600 px-4 py-2 max-sm:py-1 rounded"
                onClick={handleApplied}>
                Applied Students: {drive?.applicants?.length}
              </button>
            </div>
            {new Date(drive?.last_date) > currentdate ? (
              drive?.accepting ? (
                <button
                  onClick={handleStop}
                  className="border border-black bg-red-400 dark:border-gray-600 hover:bg-red-500 px-4 py-2 max-sm:py-1 rounded-md">
                  Stop Accepting Applications
                </button>
              ) : (
                <button
                  onClick={handleReopen}
                  className="border border-black bg-green-400 dark:border-gray-600 hover:bg-green-500 px-4 py-2 max-sm:py-1 rounded-md">
                  Reopen Applications
                </button>
              )
            ) : (
              <button
                onClick={handleExtend}
                className="border border-black bg-green-400 dark:border-gray-600 hover:bg-green-500 px-4 py-2 max-sm:py-1 rounded-md">
                Extend Closing Date
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Drive Details Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8 dark:shadow-gray-500 dark:bg-zinc-800">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Drive Overview
        </h1>

        {/* Combined Section */}
        <section className="mb-6">
          <h2 className="max-sm:text-lg text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            About the Drive
          </h2>
          <p className=" text-gray-700 leading-relaxed mb-4 dark:text-gray-300">
            {drive?.description && <Htmlrender description={drive?.description} />}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-zinc-800 dark:border dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">
                Requirements
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base dark:text-gray-300">
                <li>
                  <span className="font-medium">CPI Requirement:</span>{" "}
                  {drive?.requirements?.cpi || ""}
                </li>
                <li>
                  <span className="font-medium">Eligible Departments:</span>{" "}
                  {departments.join(", ")}
                </li>
                <li>
                  <span className="font-medium">Study Year:</span>{" "}
                  {drive?.requirements?.study_year || ""}
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg dark:bg-zinc-800 dark:border dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">
                Job Details
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base dark:text-gray-300">
                <li>
                  <span className="font-medium">Role Type:</span> {drive?.type || ""}
                </li>
                <li>
                  <span className="font-medium">Stipend:</span> ₹{drive?.stipend || ""}
                </li>
                <li>
                  <span className="font-medium">Hours Required:</span>{" "}
                  {drive?.hours_required || " "}
                </li>
                <li>
                  <span className="font-medium">Closing Date:</span>{" "}
                  {new Date(drive?.last_date).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto p-6">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-black"
          onClick={handleBack}>
          Back
        </button>
      </div>
    </>
  );
}
