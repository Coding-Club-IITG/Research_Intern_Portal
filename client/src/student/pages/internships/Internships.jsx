import React, { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import Filter from "./Filter";
import { getAllAcceptingJobs, getAllJobs } from "../../../apis/job.js";
import { useNavigate } from "react-router-dom";

function Internships() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getJobs() {
      const res = await getAllJobs(navigate);
      setInternships(res.data || []);
    }
    getJobs();
  }, [navigate]);

  const [internships, setInternships] = useState([]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    department: "",
    role: ""
  });

  const handleSearch = ({ searchTerm, department, role }) => {
    setFilters({ searchTerm, department, role });
  };
  // console.log(internships);
  const filteredInternships = internships?.filter((internship) => {
    const matchesSearchTerm =
      !filters.searchTerm ||
      internship.prof_name?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesDepartment =
      !filters.department ||
      internship.requirements?.branch
        ?.map((branch) => branch.toLowerCase())
        .some((branch) => branch.includes(filters.department.toLowerCase()));

    const matchesRole =
      !filters.role || internship.role?.toLowerCase().includes(filters.role.toLowerCase());

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
              setInternships(acceptingJobs.data);
              // console.log("accepting jobs are : ", acceptingJobs.data);
            }}>
            Get All Open Jobs
          </button>
        </div>
      </div>
      <Filter onSearch={handleSearch} />
      {filteredInternships.length === 0 && (
        <div className="mt-20">
          <img src="/no-data.png" alt="No data" className="mx-auto w-1/3" />
          <p className="text-center text-xl mt-4">No internships found</p>
        </div>
      )}
      <div>
        {filteredInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} />
        ))}
      </div>
    </div>
  );
}

export default Internships;
