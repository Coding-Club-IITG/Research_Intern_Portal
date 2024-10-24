import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../../apis/recruiter";
import Htmlrender from "../../../utils/htmlrender";
import { message } from "antd";

export default function DriveDetail() {
  const { driveIndex } = useParams();  
  const [drive, setDrive] = useState({});

  useEffect(() => {
    message.loading({ content: "Loading...", key: "loading"});
    async function fetchDrive() {
      const res = await getJobById(driveIndex);
      if(res.status === "success"){
        message.destroy("loading");
        setDrive(res.data); 
      }
    }

    fetchDrive();
  }, [])

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${driveIndex}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${driveIndex}`);
  };

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <>
      {/* Drive Header Section */}
      <div className="max-w-4xl mt-8 mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
        <div className="flex justify-between items-start max-sm:flex-col max-sm:gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{drive?.title || ""}</h3>
            <p className="text-sm text-gray-600 mt-1">{drive?.prof_name || ""}</p>

            {/* Drive Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {drive?.tags && drive?.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Role and Stipend */}
            <div className="mt-3 text-sm text-gray-600">
              <span>Role: {drive?.type || ""}</span> <span>•</span> <span>Stipend: ₹{drive?.stipend || " "}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span>{drive?.accepting ? `Closing Date: ${new Date(drive?.last_date).toLocaleDateString()}` : "Closed"}</span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEdit}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleApplied}>
              Applied Students: {drive?.applicants && drive?.applicants.length}
            </button>
          </div>
        </div>
      </div>

      {/* Drive Details Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-6 text-gray-800">Drive Overview</h1>

        {/* Combined Section */}
        <section className="mb-6">
          <h2 className="max-sm:text-lg text-xl font-semibold mb-4 text-gray-800">About the Drive</h2>
          <p className=" text-gray-700 leading-relaxed mb-4">
             { drive?.description && <Htmlrender description={drive?.description} /> }  
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
                <li>
                  <span className="font-medium">CPI Requirement:</span> {drive?.requirements?.cpi|| ""}
                </li>
                <li>
                  <span className="font-medium">Eligible Branches:</span>{" "}
                  {drive?.requirements?.branch.join(", ")}
                </li>
                <li>
                  <span className="font-medium">Study Year:</span> {drive?.requirements?.study_year || ""}
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Details</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
                <li>
                  <span className="font-medium">Role Type:</span> {drive?.type || ""}
                </li>
                <li>
                  <span className="font-medium">Stipend:</span> ₹{drive?.stipend || ""}
                </li>
                <li>
                  <span className="font-medium">Hours Required:</span> {drive?.hours_required || " "}
                </li>
                <li>
                  <span className="font-medium">Closing Date:</span> {new Date(drive?.last_date).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto p-6">
        <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={handleBack}>
          Back
        </button>
      </div>
    </>
  );
};

