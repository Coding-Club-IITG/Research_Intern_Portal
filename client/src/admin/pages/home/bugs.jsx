import React, { useEffect, useState } from "react";
import { getAllBugReports } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";

function Bugs() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await getAllBugReports(navigate);
        // console.log(response);
        setBugs(response);
      } catch (error) {
        navigate("/500");
        console.error(error);
      }
    };
    fetchBugs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bugs</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Sl. No.</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug, index) => (
            <tr key={bug.id} className="text-center">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{bug.title}</td>
              <td className="border border-gray-300 p-2">{bug.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bugs;
