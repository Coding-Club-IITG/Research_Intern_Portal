import React, { useState } from "react";

function Filter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ searchTerm, department, role });
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search for a job title..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}

export default Filter;
