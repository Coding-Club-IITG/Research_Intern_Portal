import React, { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import Filter from "./Filter";
import { getAllAcceptingJobs } from "../../../apis/job.js";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../apis/recruiter";
// import { internships } from "./Data.js";

function Internships() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getJobs() {
      const res = await getAllJobs(navigate);
      setInternships(res.data || []);
    }
    getJobs();
  }, []);

  const [internships, setInternships] = useState([]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    department: "",
    role: ""
  });

  const handleSearch = ({ searchTerm, department, role }) => {
    setFilters({ searchTerm, department, role });
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearchTerm = internship.proffName
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesDepartment = internship.department
      .toLowerCase()
      .includes(filters.department.toLowerCase());
    const matchesRole = internship.role.toLowerCase().includes(filters.role.toLowerCase());
    return matchesRole && matchesSearchTerm && matchesDepartment;
  });

  return (
    <div>
      <div className="text-2xl font-bold mb-4 flex justify-between items-center">
        <div>Search For internships</div>
        <div>
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-200"
            onClick={async () => {
              const acceptingJobs = await getAllAcceptingJobs(navigate);
              console.log(acceptingJobs);
            }}>
            Get All Open Jobs
          </button>
        </div>
      </div>
      <Filter onSearch={handleSearch} />
      <div>
        {filteredInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} />
        ))}
      </div>
    </div>
  );
}

export default Internships;
