import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { internships } from "./Data.js";
import useAuthStore from "../../../store/authStore";
import { handleSubmit } from "../../../apis/job.js";
import { getJobById } from "../../../apis/recruiter.js";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const { getUser } = useAuthStore();
  const user = getUser();
  const { internshipID } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const jobDetail = await getJobById(internshipID, navigate);
      setJob(jobDetail);
    }
    fetchData();
  }, []);

  if (!job) {
    return <div className="max-w-4xl mx-auto p-8">Job not found</div>;
  }

  return (
    <>
      {/* Job Header Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8 my-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{job.proffName}</h3>
            <p className="text-sm text-gray-600 mt-1">{job.department}</p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">{job.description}</p>

            {/* Job Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Role and Stipend */}
            <div className="mt-3 text-sm text-gray-600">
              <span>{job.role}</span> <span>•</span> <span>Stipend: ₹{job.stipend}</span>
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
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-6 text-gray-800">{job.title}</h1>

        {/* About the Work */}
        <section className="mb-6">
          <h2 className="max-sm:text-lg text-xl font-semibold mb-4 text-gray-800">
            About the Work
          </h2>
          <p className="text-gray-700 max-sm:text-sm leading-relaxed text-base">
            {job.description}
          </p>
        </section>

        {/* Skills Required */}
        <section className="mb-6">
          <h2 className="max-sm:text-lg text-xl font-semibold mb-4 text-gray-800">
            Skills Required
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            {job.skills.map((skill, index) => (
              <li key={index} className="max-sm:text-sm text-base">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Who Can Apply */}
        <section className="mb-6">
          <h2 className="max-sm:text-lg text-xl font-semibold mb-4 text-gray-800">Who Can Apply</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            {job.whoCanApply.map((requirement, index) => (
              <li key={index} className="max-sm:text-sm text-base">
                {requirement}
              </li>
            ))}
          </ul>
        </section>

        {/* Button Section */}
        <div className="flex gap-2 mt-6">
          <button
            className="bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-md"
            onClick={() => navigate(-1)}>
            Back
          </button>

          {/* Apply Button */}
          <button
            className="bg-black text-white font-semibold py-1.5 px-6 rounded-md"
            onClick={() => handleSubmit(internshipID, user.connection_id)} 
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
};

export default InternshipDetails;
