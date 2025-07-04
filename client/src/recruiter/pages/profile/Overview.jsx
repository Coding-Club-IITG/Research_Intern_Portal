import { useEffect, useState } from "react";
import { deleteRecruiter, getRecruiter } from "../../../apis/recruiter";
import { Button, message } from "antd";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import QualificationCard from "./QualificationCard";
import { getDepartmentById } from "../../../apis/courses-departments";
import { useTheme } from "../../../store/themeStore";

export default function Overview() {
  const [profileData, setProfileData] = useState({});
  const { getUser } = useAuthStore();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [theme] = useTheme();

  const user = getUser();

  useEffect(() => {
    async function getUser() {
      try {
        message.loading({ content: "Fetching Profile...", key: "fetchProfile" });
        const res = await getRecruiter(user.connection_id, navigate);
        if (!res || res.status === "error") {
          message.destroy("fetchProfile");
          // navigate("/500");
          return;
        }

        let dept = null;
        if (res.data.department) {
          try {
            dept = await getDepartmentById(res.data.department, navigate);
          } catch (deptError) {
            console.error("Error fetching department data:", deptError);
            dept = null;
          }
        }

        message.destroy("fetchProfile");
        setDept(dept?.data || { name: "Unknown" });
        setProfileData(res.data);
      } catch (error) {
        console.error("Error in fetching user data:", error);
        message.destroy("fetchProfile");
        // navigate("/500");
      }
    }

    getUser();
  }, [user.connection_id, navigate]);

  async function deleteUser(){
    message.loading({ content: "Deleting Profile...", key: "deleteProfile" });

    const res = await deleteRecruiter(navigate);

    if (!res || res.status === "error") {
      message.destroy("deleteProfile");
      message.error({ content: "Error deleting profile", key: "deleteProfile" });
      return;
    }else{
      message.success({ content: "Profile deleted successfully", key: "deleteProfile" });
      navigate("/login");
    }

    message.destroy("deleteProfile");
  }

  return (
    <div>
      <div className="py-4">
        <div className="relative font-semibold dark:text-white">
          What students will see:
          <Button type="primary" className="absolute right-0 group r-5" danger onClick={deleteUser}>
          <img src="/icons8-delete-24.png" />
          <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Delete profile
          </span>
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg mt-6 border dark:border-gray-600 dark:bg-zinc-900 border-gray-300 bg-white">
        <div className="flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={
                profileData?.profilePicUrl ||
                (theme === "light" ? "/avatar.webp" : "/avatar-dark.png")
              }
              alt="Hi"
              className="object-cover w-full h-full rounded-full dark:text-white"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {profileData.name}
            </h1>
            <p className="text-green-600 dark:text-gray-400 mt-1 inline-block rounded-md">
              Professor at Department of {dept?.name}
            </p>{" "}
          </div>
          <div className="ml-auto flex space-x-4">
            {profileData?.socialMedia?.linkedIn && (
              <div className="relative group">
                <a
                  href={profileData?.socialMedia?.linkedIn || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                  title="Social Profile 2">
                  <svg
                    className="dark:fill-gray-500 fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50">
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                  </svg>
                </a>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Linkedin
                </span>
              </div>
            )}
            {profileData?.socialMedia?.website && (
              <div className="relative group">
                <a
                  href={profileData?.socialMedia?.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                  title="Social Profile 2">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8 dark:stroke-gray-500 fill-none">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </a>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Website
                </span>
              </div>
            )}
            {profileData?.resumeUrl && (
              <div className="relative group">
                <a
                  href={profileData?.resumeUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-gray-400"
                  title="View Resume">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8 dark:fill-slate-700">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  </svg>
                </a>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Resume
                </span>
              </div>
            )}
          </div>
        </div>

        {profileData?.areaOfInterest?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2">
            <h4 className="text-black dark:text-white mb-2">Interests</h4>
            <ul className="list-none list-inside flex gap-2">
              {profileData?.areaOfInterest.map((interest, index) => (
                <li
                  className="py-2 px-4 bg-indigo-600 rounded-lg w-fit text-white text-sm dark:border-indigo-600 dark:text-black dark:bg-indigo-300"
                  key={index}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
        {profileData?.qualifications?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2 ">
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
