import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../../apis/recruiter";
import Htmlrender from "../../../utils/htmlrender";
import { message } from "antd";
import useAuthStore from "../../../store/authStore";
import { applyToJobs } from "../../../apis/student";
import { getDepartmentById } from "../../../apis/courses-departments";

export default function DriveDetail() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const { internshipID } = useParams();
  const [drive, setDrive] = useState({});
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    message.loading({ content: "Loading...", key: "loading" });
    async function fetchDrive() {
      const res = await getJobById(internshipID, navigate);
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

  const handleApply = async () => {
    const res = await applyToJobs(user.connection_id, internshipID, navigate);
    if (res.status === "success") {
      message.success("Applied Successfully");
      navigate(`/student/applied`);
    } else {
      // console.log(res);
      if (res.message === "Already applied") {
        return;
      }
      message.error("Failed to apply");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Drive Header Section */}
      <div className="max-w-4xl mt-8 mx-auto p-6 bg-white dark:bg-slate-700 dark:shadow-yellow-500 shadow-md rounded-lg mb-8">
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
              <p
                className={`text-sm ${drive?.accepting ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {drive?.accepting
                  ? `Closing Date: ${new Date(drive.last_date).toLocaleDateString()}`
                  : "Closed"}
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4">
            {drive?.accepting && (
              <button
                className="border border-black bg-blue-500 hover:bg-blue-600 dark:border-yellow-500 px-4 py-2 max-sm:py-1 rounded dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
                onClick={handleApply}>
                Apply
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Drive Details Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8 dark:shadow-yellow-500 dark:bg-slate-700">
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
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-slate-700 dark:border dark:border-yellow-500">
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

            <div className="bg-gray-100 p-4 rounded-lg dark:bg-slate-700 dark:border dark:border-yellow-500">
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
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
          onClick={handleBack}>
          Back
        </button>
      </div>
    </>
  );
}
