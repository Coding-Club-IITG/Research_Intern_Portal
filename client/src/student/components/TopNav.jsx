import React from "react";

const TopNav = () => {
  return (
    <div className="flex items-center justify-between bg-white border p-4">
      <div className="text-xl font-bold">
        Research Intern Portal IIT Guwahati
      </div>
      <div className="flex space-x-6">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Profile</div>
        <div className="cursor-pointer">Jobs</div>
        <div className="cursor-pointer">Applied</div>
      </div>
    </div>
  );
};

export default TopNav;
