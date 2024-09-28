// InternshipDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

function InternshipDetail() {
  const { internshipID } = useParams(); // Use the correct param name

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Details for Internship ID: {internshipID}</h2>
    </div>
  );
}

export default InternshipDetail;
