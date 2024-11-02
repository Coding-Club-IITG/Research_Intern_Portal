import React, { useEffect, useState } from "react";
import InternshipCard from "../internships/InternshipCard";
import { getStudent, getAppliedJobsByStudents } from "../../../apis/student";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { getJobById } from "../../../apis/recruiter";

function Applied() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAppliedInternships() {
      const student = await getStudent(user.connection_id, navigate);
      const id = student.data._id;
      const res = await getAppliedJobsByStudents(id, navigate);
      const internships = [];
      
      if(res.status === "error"){
        setAppliedInternships([]);
      }else{
        res.map((internId) => {
          const internship = getJobById(internId, navigate);
          internships.push(internship);
        });
        setAppliedInternships(internships || []);
      }
    }
    getAppliedInternships();
  }, []);

  const [appliedInternships, setAppliedInternships] = useState([]);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Your Applied Internships</div>
      <div>
        {appliedInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} />
        ))}
      </div>
    </div>
  );
}

export default Applied;
