import React, { useEffect } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

function Filter({ onSearch }) {
  const [prof, setProf] = useLocalStorage("prof", "");
  // const [department, setDepartment] = useLocalStorage("department", "");
  const [role, setRole] = useLocalStorage("role", "");

  const handleSearch = (updatedProf, updatedRole) => {
    if (onSearch) {
      onSearch({
        prof: updatedProf ?? prof,
        // department: updatedDepartment ?? department,
        role: updatedRole ?? role
      });
    }
  };

  useEffect(() => {
    handleSearch(prof, role);
  }, [prof, role]);

  const handleProfChange = (e) => {
    const value = e.target.value;
    setProf(value);
    handleSearch(value, role);
  };

  // const handleDepartmentChange = (e) => {
  //   const value = e.target.value;
  //   setDepartment(value);
  //   handleSearch(prof, value, role);
  // };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    handleSearch(prof, value);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-6 flex items-center gap-4 max-sm:flex-col">
      <input
        type="text"
        placeholder="Professor"
        className="border border-gray-300 dark:border-yellow-300 rounded-md px-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring dark:focus:ring-yellow-400"
        value={prof}
        onChange={handleProfChange}
      />
      {/* <input
        type="text"
        placeholder="Department"
        className="border border-gray-300 dark:border-yellow-300 rounded-md px-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring dark:focus:ring-yellow-400"
        value={department}
        onChange={handleDepartmentChange}
      /> */}
      <input
        type="text"
        placeholder="Job Title"
        className="border border-gray-300 dark:border-yellow-300 rounded-md px-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring dark:focus:ring-yellow-400"
        value={role}
        onChange={handleRoleChange}
      />
    </div>
  );
}

export default Filter;
