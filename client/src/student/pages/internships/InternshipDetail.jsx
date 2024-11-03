import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../../apis/recruiter.js";

const InternshipDetails = () => {
  const navigate = useNavigate();

  const { internshipID } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const jobDetail = await getJobById(internshipID, navigate);
      console.log(jobDetail)
      if(jobDetail.status === "success"){
        setJob(jobDetail.data);
      }
    }
    fetchData();
  }, []);

  if (!job) {
    return <div className="max-w-4xl mx-auto p-8">Job not found</div>;
  }

  return (
    <>
      {/* Job Header Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg mb-8 my-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{job?.title|| ""}</h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">{job?.type || ""}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags > 0 && job?.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <span>Stipend: ₹{job?.stipend || ""}</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center">
            <button className="bg-gray-200 text-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-300">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="max-sm:text-base text-lg font-medium">Recuriter Name : </h1>
          <h1 className="text-base">{job?.prof_name || ""}</h1>  
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="font-medium text-base">
            Skills Required : 
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            {job?.skill > 0 && job.skills.map((skill, index) => (
              <li key={index} className="max-sm:text-sm text-base">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">Who Can Apply : </h2>
          <div className="flex gap-1 text-slate-600">
            <p>Elligible Branches : </p>
            <ul className="flex gap-2 items-center">
              {job?.requirements?.branch && job?.requirements?.branch.map((requirement, index) => (
                <li key={index} className="w-fit px-2 py-0.5 max-sm:text-sm text-base list-none rounded-md bg-blue-200">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 text-slate-600">
            <p>Cpi Cutoff : </p>
            <p>{job?.requirements?.cpi}</p>
          </div>
          <div className="flex gap-1 text-slate-600">
            <p>Cpi Cutoff : </p>
            <p>{job?.requirements?.study_year}</p>
          </div>
        </section>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-md"
            onClick={() => navigate(-1)}>
            Back
          </button>

          <button className="bg-black text-white font-semibold py-1.5 px-6 rounded-md">
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
};

export default InternshipDetails;
