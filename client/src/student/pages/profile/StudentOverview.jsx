// import React, { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import { getStudent } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import EducationCard from "./EducationCard";
import ExperienceCard from "../../../root-components/ExperienceCard";

// const Overview = () => {
// const profileData = {
//   name: "Mahak ",
//   activityStatus: "Active today",
//   location: "Kota, India",
//   timezone: "0.5 hours behind",
//   lookingFor: "Eager to learn.",
//   education: {
//     degree: "Bachelor's, Civil engineering",
//     institution: "Indian Institute of Technology - Guwahati",
//     graduationYear: "2027"
//   },
//   idealNextOpportunity: {
//     desiredSalary: "Flexible",
//     desiredRole: "Software Engineer",
//     remoteWork: "Onsite Or Remote",
//     desiredLocation: "Kota (current)",
//     desiredTechStack: ["Node.js", "React", "Express.js", "C++"],
//     wants: [
//       "To solve technical problems",
//       "Progression to management",
//       "Company with clear roles",
//       "Team members to learn from",
//       "Challenging problems to work on"
//     ]
//   }
// };

const Overview = () => {
  const [profileData, setProfileData] = useState(null);
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await getStudent(user.connection_id, navigate);
      setProfileData(response.data);
    };
    getUser();
  }, [navigate]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="py-4">
        <div className="font-semibold">What recruiters will see</div>
      </div>
      <div className="max-w-4xl mx-auto max-sm:p-2 p-6 rounded-lg mt-6 border border-gray-300">
        <div className="max-sm:flex-col max-sm:items-start flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={profileData.profilePicUrl}
              alt="Profile Pic"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{profileData.name}</h1>
            <p className="text-gray-600 mt-1 inline-block p-1 rounded-md">
              Current CGPA: {profileData.CGPA}
            </p>{" "}
            {/* Active Today */}
            <p>
              {profileData.course} from department of {profileData.department}
            </p>{" "}
            {/* Location and Timezone */}
            <p>Year of Graduation : {profileData.yearOfGrad}</p>
          </div>
          <div className="max-sm:ml-0 max-sm:space-x-2 max-sm:py-2 ml-auto flex space-x-4 w-fit">
            <a
              href={profileData.social[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
            {/* <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/resume.png"
                alt="Resume"
                className="w-6 h-6"
              />
            </a> */}
          </div>
        </div>

        {/* <div className="p-2 rounded-lg mb-2">
          <h2 className="text-gray-500 mb-2">Looking for</h2>
          <p className="black">{profileData.lookingFor}</p>
        </div> */}

        {/* array */}
        <div className="bg-white p-2 rounded-lg mb-2">
          <h3 className="text-gray-500 mb-2">Education</h3>
          {profileData?.educations.map((education) => {
            return <EducationCard education={education} onDelete={() => {}} deletable={false} />;
          })}
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h3 className="text-gray-500 mb-2">Experience</h3>
          {profileData?.experiences.map((experience) => {
            return <ExperienceCard experience={experience} onDelete={() => {}} deletable={false} />;
          })}
        </div>

        {/* <div className="p-2 rounded-lg mb-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ideal Next Opportunity</h3>
          <h2 className="text-gray-500 mb-2">Desired Salary</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredSalary}
          </p>
          <h2 className="text-gray-500 mb-2">Desired role</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredRole}
          </p>
          <h2 className="text-gray-500 mb-2">Remote Work</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.remoteWork}
          </p>
          <h2 className="text-gray-500 mb-2">Desired Location</h2>
          <p className="text-gray-600 inline-block p-1 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredLocation}
          </p>
        </div> */}

        <div className="p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-4">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="p-1 rounded-md shadow-md">
                <p className="text-gray-600">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Interests</h4>
          <ul className="list-disc list-inside">
            {profileData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
