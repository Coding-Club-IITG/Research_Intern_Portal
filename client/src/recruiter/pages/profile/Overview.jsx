import { useEffect, useState } from "react";
import { getRecruiter } from "../../../apis/recruiter";
import { message } from "antd";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import QualificationCard from "./QualificationCard";

export default function Overview() {
  const [profileData, setProfileData] = useState({});
  const { getUser } = useAuthStore();
  const navagate = useNavigate();

  const user = getUser();

  useEffect(() => {
    async function getUser() {
      message.loading({ content: "Fetching Profile...", key: "fetchProfile" });

      const res = await getRecruiter(user.connection_id, navagate);
      if (res.status === "success") {
        setProfileData(res?.data);
        message.destroy("fetchProfile");
      } else {
        message.destroy("fetchProfile");
        message.error(res.message);
      }
    }

    getUser();
  }, [user.connection_id, navagate]);

  return (
    <div>
      <div className="py-4">
        <div className="font-semibold dark:text-white">What students will see:</div>
      </div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg mt-6 border dark:border-yellow-500 dark:bg-slate-700 border-gray-300 bg-white">
        <div className="flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={profileData?.profilePicUrl || "https://img.icons8.com/ios-filled/"}
              alt="Profile Pic"
              className="object-cover w-full h-full dark:text-white"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {profileData.name}
            </h1>
            <p className="text-green-600 dark:text-yellow-400 mt-1 inline-block rounded-md">
              Professor at Department of {profileData?.department}
            </p>{" "}
          </div>
          <div className="ml-auto flex space-x-4">
            <a
              href={profileData?.socialMedia?.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
            <a
              href={profileData?.resumeUrl || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900">
              <div className="relative inline-block group">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/resume.png"
                  alt="Resume"
                  className="w-6 h-6 cursor-pointer"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-32 text-center text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-semibold">Resume</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {profileData?.areaOfInterest?.length > 0 && (
          <div className="border dark:border-slate-700 p-2 rounded-lg mb-2">
            <h4 className="text-black dark:text-white mb-2">Interests</h4>
            <ul className="list-none list-inside flex gap-2">
              {profileData?.areaOfInterest.map((interest, index) => (
                <li
                  className="py-2 px-4 bg-indigo-600 rounded-lg w-fit text-white text-sm dark:border-yellow-400 dark:text-black dark:bg-amber-400"
                  key={index}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
        {profileData?.qualifications?.length > 0 && (
          <div className="border dark:border-slate-700 p-2 rounded-lg mb-2 ">
            <h3 className="text-black dark:text-white mb-2">Education</h3>
            {profileData.qualifications.map((qualification) => (
              <QualificationCard
                key={qualification.id}
                qualification={qualification}
                onDelete={() => {}}
                deletable={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
