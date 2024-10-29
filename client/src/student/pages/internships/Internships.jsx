import React, { useState } from "react";
import InternshipCard from "./InternshipCard";
import Filter from "./Filter";
import { internships } from "./Data.js";
import { getAllAcceptingJobs } from "../../../apis/job.js";
import { useNavigate } from "react-router-dom";

function Internships() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    department: "",
    role: ""
  });

  const navigate = useNavigate()

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
        <button className="bg-gray-100 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-200"
        onClick={()=>{getAllAcceptingJobs(navigate)}}>
                Get All Open Jobs
        </button>
        </div>
      </div>
      <Filter onSearch={handleSearch} />
      <div>
        {filteredInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Internships;
