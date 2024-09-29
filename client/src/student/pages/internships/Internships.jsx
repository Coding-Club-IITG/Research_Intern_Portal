import React, { useState } from "react";
import InternshipCard from "./InternshipCard";
import Filter from "./Filter";
import { internships } from "./Data.js";
function Internships() {
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
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Search For Internships</div>
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
