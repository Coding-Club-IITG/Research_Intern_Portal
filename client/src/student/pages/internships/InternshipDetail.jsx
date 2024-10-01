import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { internships } from "./Data.js";

const InternshipDetails = () => {
  const { internshipID } = useParams();
  const jobId = parseInt(internshipID, 10);
  const job = internships.find((job) => job.id === jobId);
  const Navigate = useNavigate();

  if (!job) {
    return <div className="max-w-4xl mx-auto p-8">Job not found</div>;
  }

  return (
    <>
      {/* Job Header Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{job.title}</h1>

        {/* About the Work */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About the Work</h2>
          <p className="text-gray-700 leading-relaxed text-base">{job.description}</p>
        </section>

        {/* Skills Required */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills Required</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Who Can Apply */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Who Can Apply</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            {job.whoCanApply.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>

        {/* Button Section */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300"
            onClick={() => Navigate(-1)}>
            Back
          </button>

          {/* Apply Button */}
          <button className="bg-gradient-to-r from-black to-black text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-black-600 hover:to-black-600 focus:ring-4 focus:ring-black-300 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
};

export default InternshipDetails;
