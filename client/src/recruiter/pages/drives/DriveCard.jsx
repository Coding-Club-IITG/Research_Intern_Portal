import React from "react";
import { useNavigate } from "react-router-dom";

function DriveCard({ drive }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/recruiter/drive/${drive._id}`);
  };

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${drive._id}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${drive._id}`);
  };

  console.log(drive);

  return (
    <div className="border rounded-md p-4 flex justify-between items-center mb-4 max-sm:flex-col max-sm:gap-4 w-full bg-white dark:bg-slate-800 dark:border-gray-700">
      <div className="flex flex-col gap-2">
        <h2 className="max-sm:text-lg text-xl font-bold capitalize dark:text-white">
          {drive?.title}
        </h2>
        <p className="text-gray-800 font-semibold dark:text-gray-200">Stipend: ₹{drive?.stipend}</p>
        <p
          className={`text-sm ${drive?.accepting ? "text-green-600" : "text-red-600"} dark:text-gray-300`}>
          {drive?.accepting
            ? `Closing Date: ${new Date(drive.last_date).toLocaleDateString()}`
            : "Closed"}
        </p>
      </div>

      <div className="flex flex-col space-y-2 max-sm:w-full">
        <div className="flex gap-2">
          <button className="border border-black dark:border-gray-300 px-4 py-2 max-sm:py-1 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            View
          </button>
          <button className="border border-red-500 dark:border-red-700 px-4 py-2 max-sm:py-1 rounded-md text-red-500 dark:text-red-400">
            Stop Accepting Applications
          </button>
        </div>
        <div className="flex gap-2">
          {drive?.accepting && (
            <button className="bg-slate-400 dark:bg-slate-600 px-4 py-2 max-sm:py-1 rounded text-white">
              Edit
            </button>
          )}
          <button className="bg-red-500 text-white px-4 py-2 max-sm:py-1 rounded">
            Applied Students: {drive?.applicants.length}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveCard;
