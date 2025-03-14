import React, { useEffect, useState } from "react";
import InternshipCard from "../internships/InternshipCard";
import { getAppliedJobsByStudents } from "../../../apis/student";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { getJobById } from "../../../apis/recruiter";

function Applied() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();
  const id = user?.connection_id;

  useEffect(() => {
    async function getAppliedInternships() {
      const res = await getAppliedJobsByStudents(id, navigate);
      if (res.success === "false") {
        setAppliedInternships([]);
      } else {
        const internshipPromises = res?.data && res?.data.map((internId) =>
          getJobById(internId, navigate).then((internship) => internship.data)
        );

        const internships = await Promise.all(internshipPromises);
        setAppliedInternships(internships || []);
      }
    }

    getAppliedInternships();
  }, [id, navigate]);

  const [appliedInternships, setAppliedInternships] = useState([]);

  return (
    <div className="p-10">
      <div className="text-2xl font-bold mb-4 dark:text-white">Your Applied Internships</div>
      <div>
        {appliedInternships.length > 0 ? (
          appliedInternships.map((arr, index) => <InternshipCard key={index} arr={arr} />)
        ) : (
          <div className="mt-40 w-full h-full">
            <img src="/no-data.png" alt="No Data" className="w-1/4 mx-auto" />
            <div className="text-center text-lg dark:text-white">No Internships Applied</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applied;
