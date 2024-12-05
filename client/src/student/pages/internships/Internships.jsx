import React, { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import Filter from "./Filter";
import { getAllAcceptingJobs } from "../../../apis/job.js";
import { useNavigate } from "react-router-dom";
import { Pagination, message } from "antd";

function Internships() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getJobs() {
      message.loading({ content: "Loading Data...", key: "loadingData" });
      const res = await getAllAcceptingJobs(navigate);
      message.destroy("loadingData");
      setInternships(res.data || []);
    }
    getJobs();
  }, [navigate]);

  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    prof: "",
    department: "",
    role: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleSearch = ({ prof, department, role }) => {
    setFilters({ prof, department, role });
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredInternships = internships?.filter((internship) => {
    const matchesProf =
      !filters.prof || internship.prof_name?.toLowerCase().includes(filters.prof.toLowerCase());

    // const matchesDepartment =
    //   !filters.department ||
    //   internship.requirements?.department
    //     ?.map((department) => department.toLowerCase())
    //     .some((department) => department.includes(filters.department.toLowerCase()));

    const matchesRole =
      !filters.role || internship.title?.toLowerCase().includes(filters.role.toLowerCase());

    return matchesRole && matchesProf;
  });

  const currentInternships = filteredInternships.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-4">
      <div className="text-2xl font-bold mb-4 flex justify-between items-center text-gray-800 dark:text-white">
        <div>Search For Internships</div>
        {/* <div>
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-200 dark:bg-indigo-600 dark:text-gray-900 dark:hover:bg-yellow-500"
            onClick={async () => {
              const acceptingJobs = await getAllAcceptingJobs(navigate);
              setFilters({ prof: "", role: "" });
              setInternships(acceptingJobs.data);
            }}>
            Get All Open Jobs
          </button> */}
        {/* </div> */}
      </div>
      <Filter onSearch={handleSearch} />

      {currentInternships.length === 0 && (
        <div className="mt-20 flex flex-col items-center">
          <img
            src="/no-data.png"
            alt="No internships found"
            className="mx-auto w-1/3 h-auto max-w-full"
          />
          <p className="text-center text-xl mt-4 text-gray-800 dark:text-white">
            No internships found
          </p>
        </div>
      )}
      <div>
        {currentInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={internships.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Internships;
