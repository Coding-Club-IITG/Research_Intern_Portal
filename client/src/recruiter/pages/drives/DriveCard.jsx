import React from "react";
import { useNavigate } from "react-router-dom";

function DriveCard({ drive, index }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/recruiter/drive/${index}`);
  };

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${index}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${index}`);
  };

  return (
    <div className="border p-4 flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">{drive.title}</h2>
        <p className="text-gray-600">{drive.description}</p>
        <p className="text-gray-800 font-semibold">Stipend: ₹{drive.stipend}</p>
        <p className={`text-sm ${drive.accepting ? "text-green-600" : "text-red-600"}`}>
          {drive.accepting ? `Closing Date: ${drive.last_date}` : "Closed"}
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleView}>
          View
        </button>
        {/* Conditionally render the Edit button based on drive status */}
        {drive.accepting && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleApplied}>
          Applied Students: {drive.applicants.length}
        </button>
      </div>
    </div>
  );
}

export default DriveCard;
