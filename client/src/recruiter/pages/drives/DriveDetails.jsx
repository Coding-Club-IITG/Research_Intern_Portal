import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import my_drives from "./my_drives";

const DriveDetail = () => {
  const { driveIndex } = useParams();
  const index = parseInt(driveIndex, 10);
  const drive = my_drives[index];
  const navigate = useNavigate();

  if (!drive) {
    return <div className="max-w-4xl mx-auto p-8">Drive not found</div>;
  }

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${index}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${index}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Drive Header Section */}
      <div className="max-w-4xl mt-8 mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{drive.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{drive.prof_name}</p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">{drive.description}</p>

            {/* Drive Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {drive.tags.split(",").map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Role and Stipend */}
            <div className="mt-3 text-sm text-gray-600">
              <span>Role: {drive.type}</span> <span>•</span> <span>Stipend: ₹{drive.stipend}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span>{drive.accepting ? `Closing Date: ${drive.last_date}` : "Closed"}</span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEdit}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleApplied}>
              Applied Students: {drive.applicants.length}
            </button>
          </div>
        </div>
      </div>

      {/* Drive Details Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Drive Overview</h1>

        {/* Combined Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About the Drive</h2>
          <p className="text-gray-700 leading-relaxed text-base mb-4">{drive.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
                <li>
                  <span className="font-medium">CPI Requirement:</span> {drive.requirements.cpi}
                </li>
                <li>
                  <span className="font-medium">Eligible Branches:</span>{" "}
                  {drive.requirements.branch.join(", ")}
                </li>
                <li>
                  <span className="font-medium">Study Year:</span> {drive.requirements.study_year}
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Details</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
                <li>
                  <span className="font-medium">Role Type:</span> {drive.type}
                </li>
                <li>
                  <span className="font-medium">Stipend:</span> ₹{drive.stipend}
                </li>
                <li>
                  <span className="font-medium">Hours Required:</span> {drive.hours_required}{" "}
                  hours/week
                </li>
                <li>
                  <span className="font-medium">Closing Date:</span> {drive.last_date}
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

export default DriveDetail;
