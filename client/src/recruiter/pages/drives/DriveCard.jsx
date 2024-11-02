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

  console.log(drive)

  return (
    <div className="border rounded-md p-4 flex justify-between items-center mb-4 max-sm:flex-col max-sm:gap-4 w-full bg-white">
      <div className="flex flex-col gap-2">
        <h2 className="max-sm:text-lg text-xl font-bold capitalize">{drive?.title}</h2>
        <p className="text-gray-800 font-semibold">Stipend: ₹{drive?.stipend}</p>
        <p className={`text-sm ${drive?.accepting ? "text-green-600" : "text-red-600"}`}>
          {drive?.accepting
            ? `Closing Date: ${new Date(drive.last_date).toLocaleDateString()}`
            : "Closed"}
        </p>
      </div>

      <div className="flex flex-col space-y-2 max-sm:w-full">
        <div className="flex gap-2">
          <button
            className="border border-black px-4 py-2 max-sm:py-1 rounded-md"
            onClick={handleView}>
            View
          </button>
          <button className="border border-red-500 px-4 py-2 max-sm:py-1 rounded-md">
            Stop Accepting Applications
          </button>
        </div>
        <div className="flex gap-2">
          {drive?.accepting && (
            <button
              className="bg-slate-400 px-4 py-2 max-sm:py-1 rounded"
              onClick={handleEdit}>
              Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 max-sm:py-1 rounded"
            onClick={handleApplied}>
            Applied Students: {drive?.applicants.length}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveCard;
