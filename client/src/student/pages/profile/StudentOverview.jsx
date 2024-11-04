import { useEffect, useState } from "react";
import { getStudent } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import EducationCard from "./EducationCard";
import ExperienceCard from "../../../root-components/ExperienceCard";

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
  }, [user.connection_id, navigate]);

  return (
    <div>
      <div className="py-4">
        <div className="font-semibold dark:text-white">What recruiters will see</div>
      </div>
      <div className="max-w-4xl mx-auto max-sm:p-2 p-6 rounded-lg mt-6 border border-gray-300 dark:border-yellow-400">
        <div className="max-sm:flex-col max-sm:items-start flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={profileData?.profilePicUrl || ""}
              alt="Profile Pic"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {profileData?.name || ""}
            </h1>
            <p className="text-gray-600 mt-1 inline-block rounded-md dark:text-gray-300">
              Current CGPA: {profileData?.CGPA || ""}
            </p>{" "}
            <p className="text-gray-600 dark:text-gray-300">
              {profileData?.course || ""} from department of {profileData?.department || ""}
            </p>{" "}
            {/* Location and Timezone */}
            <p className="text-gray-600 dark:text-gray-300">
              Year of Graduation : {profileData?.yearOfGrad || ""}
            </p>
          </div>
          <div className="max-sm:ml-0 max-sm:space-x-2 max-sm:py-2 ml-auto flex space-x-4 w-fit">
            <a
              href={profileData?.social[1]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800">
              <svg
                class="dark:fill-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
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
        <div className="bg-white border border-white  p-2 rounded-lg mb-2 dark:bg-slate-700 dark:text-gray-500 dark:border-yellow-400">
          <h3 className="text-gray-500 mb-2">Education</h3>
          {profileData?.educations &&
            profileData?.educations.map((education) => {
              return <EducationCard education={education} onDelete={() => {}} deletable={false} />;
            })}
        </div>

        <div className=" border border-white dark:border-yellow-400 p-2 rounded-lg mb-2">
          <h3 className="text-gray-500 mb-2">Experience</h3>
          {profileData?.experiences &&
            profileData?.experiences.map((experience) => {
              return (
                <ExperienceCard experience={experience} onDelete={() => {}} deletable={false} />
              );
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

        <div className="border border-white dark:border-yellow-400 p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-4">
            {profileData?.skills &&
              profileData?.skills.map((skill, index) => (
                <p className="border px-2 py-0.5 rounded-md">{skill}</p>
              ))}
          </div>
        </div>

        <div className="border border-white dark:border-yellow-400 p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Interests</h4>
          <ul className="list-none list-inside flex gap-2">
            {profileData?.interests &&
              profileData?.interests.map((interest, index) => (
                <li
                  className="py-0.5 px-2 bg-indigo-600 rounded-lg w-fit text-white text-sm"
                  key={index}>
                  {interest}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
