import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import my_drives from "./my_drives"; // Assuming my_drives is in the same directory

function DriveStudentList() {
  const { driveIndex } = useParams(); // Extracting the index from the route parameter
  const index = parseInt(driveIndex, 10); // Parsing the index as an integer
  const drive = my_drives[index]; // Getting the selected drive from the drives list
  const applicants = drive.applicants; // Extracting applicants for the drive

  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="w-full p-6">
      

      <h1 className="text-2xl font-bold text-center mb-6">Applicants List</h1>

      {/* If no applicants are available, show a message */}
      {applicants.length === 0 ? (
        <div className="text-center text-gray-600">No applicants available.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="p-4 border border-gray-300">Serial No.</th>
              <th className="p-4 border border-gray-300">Name</th>
              <th className="p-4 border border-gray-300">Roll No</th>
              <th className="p-4 border border-gray-300">Course</th>
              <th className="p-4 border border-gray-300">Department</th>
              <th className="p-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, idx) => (
              <tr key={idx} className="text-center odd:bg-gray-50 even:bg-white">
                <td className="p-4 border border-gray-300">{idx + 1}</td> {/* Serial Number */}
                <td className="p-4 border border-gray-300">{applicant.name}</td>
                <td className="p-4 border border-gray-300">{applicant.roll}</td>
                <td className="p-4 border border-gray-300">{applicant.course}</td>
                <td className="p-4 border border-gray-300">{applicant.department}</td>
                <td className="p-4 border border-gray-300 space-x-2">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-all">
                    View Profile
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all mt-4"
        onClick={() => navigate(-1)} // This navigates to the previous page
      >
        &larr; Back
      </button> 
    </div>
  );
}

export default DriveStudentList;
