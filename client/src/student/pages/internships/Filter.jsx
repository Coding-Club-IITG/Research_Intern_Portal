import React, { useEffect } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

function Filter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  const [department, setDepartment] = useLocalStorage("department", "");
  const [role, setRole] = useLocalStorage("role", "");

  const handleSearch = (updatedSearchTerm, updatedDepartment, updatedRole) => {
    if (onSearch) {
      onSearch({
        searchTerm: updatedSearchTerm ?? searchTerm,
        department: updatedDepartment ?? department,
        role: updatedRole ?? role
      });
    }
  };

  useEffect(() => {
    handleSearch(searchTerm, department, role);
  }, [searchTerm, department, role]);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value, department, role);
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setDepartment(value);
    handleSearch(searchTerm, value, role);
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    handleSearch(searchTerm, department, value);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6 flex items-center gap-4 max-sm:flex-col">
      <input
        type="text"
        placeholder="Search for a job title..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <input
        type="text"
        placeholder="Department"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={department}
        onChange={handleDepartmentChange}
      />
      <input
        type="text"
        placeholder="Role"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={role}
        onChange={handleRoleChange}
      />
    </div>
  );
}

export default Filter;
