import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EducationCard from "../../../student/pages/profile/EducationCard";
import ExperienceCard from "../../../root-components/ExperienceCard";
import { getCourseById, getDepartmentById } from "../../../apis/courses-departments";
import { getStudentById } from "../../../apis/recruiter";
import daysjs from "dayjs";

export default function StudentProfileView() {
  const [student, setStudent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getStudentById(id, navigate);
        console.log(response.data);
        setStudent(response.data);
      } catch (error) {
        console.error("Error in fetching user data:", error);
        navigate("/500");
      }
    };
    getUser();
  }, [id, navigate]);


  return (
    <div>
      <div className="max-w-4xl mx-auto max-sm:p-2 p-6 rounded-lg mt-6 border border-gray-300 dark:border-gray-400">
        <div className="max-sm:flex-col max-sm:items-start flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={student?.profilePicUrl || ""}
              alt="Profile Pic"
              className="object-cover w-full h-full dark:text-white"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {student?.name || ""}
            </h1>
            <p className="text-gray-600 mt-1 inline-block rounded-md dark:text-gray-300">
              Current CGPA: {student?.CGPA || ""}
            </p>{" "}
            <p className="text-gray-600 dark:text-gray-300">
              {course?.name || ""} from department of {dept?.name || ""}
            </p>{" "}
  
            <p className="text-gray-600 dark:text-gray-300">
              Year of Graduation : {daysjs(student?.yearOfGrad).$y || ""}
            </p>
          </div>
          <div className="max-sm:ml-0 max-sm:space-x-2 max-sm:py-2 ml-auto flex space-x-4 w-fit">
            {student?.resume && (
              <div className="relative group">
                <a
                  href={student?.resume || "#"}
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
            {student?.social && student?.social[0]?.url && (
              <div className="relative group">
                <a
                  href={student?.social[0]?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-gray-400"
                  title="Social Profile 1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8 dark:fill-slate-700 fill-none">
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
            {student?.social && student?.social[1]?.url && (
              <div className="relative group">
                <a
                  href={student?.social[1]?.url || "#"}
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
            {student?.social && student?.social[2]?.url && (
              <div className="relative group">
                <a
                  href={student?.social[2]?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                  title="Social Profile 3">
                  <svg
                    className="dark:fill-gray-500 fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.575 0-.283-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.388-1.332-1.756-1.332-1.756-1.087-.744.083-.729.083-.729 1.203.086 1.835 1.236 1.835 1.236 1.07 1.834 2.81 1.303 3.495.997.108-.774.418-1.303.762-1.603-2.665-.305-5.466-1.334-5.466-5.934 0-1.31.467-2.382 1.235-3.22-.124-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.515 11.515 0 0 1 3-.404c1.015.004 2.04.137 3 .404 2.292-1.553 3.3-1.23 3.3-1.23.653 1.652.241 2.872.117 3.176.768.838 1.235 1.91 1.235 3.22 0 4.61-2.8 5.623-5.467 5.928.431.37.814 1.103.814 2.226 0 1.606-.015 2.895-.015 3.285 0 .319.22.692.82.574 4.77-1.59 8.21-6.087 8.21-11.387 0-6.63-5.37-12-12-12z"></path>
                  </svg>
                </a>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Github
                </span>
              </div>
            )}
          </div>
        </div>

        {student?.educations?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2 ">
            <h3 className="text-black dark:text-white mb-2">Education</h3>
            {student.educations.map((education) => (
              <EducationCard
                key={education.id}
                education={education}
                onDelete={() => {}}
                deletable={false}
              />
            ))}
          </div>
        )}

        {student?.experiences?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2">
            <h3 className="text-black dark:text-white mb-2">Experience</h3>
            {student.experiences.map((experience) => (
              <ExperienceCard
                key={experience.id} 
                experience={experience}
                onDelete={() => {}}
                deletable={false}
              />
            ))}
          </div>
        )}

        {student?.skills?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2">
            <h4 className="text-black dark:text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-4">
              {student.skills.map((skill, index) => (
                <p
                  key={index}
                  className="py-2 px-4 bg-indigo-600 rounded-lg w-fit text-white text-sm dark:border-indigo-600 dark:text-black dark:bg-amber-400">
                  {skill}
                </p>
              ))}
            </div>
          </div>
        )}
        {student?.interests?.length > 0 && (
          <div className=" p-2 rounded-lg mb-2">
            <h4 className="text-black dark:text-white mb-2">Interests</h4>
            <ul className="list-none list-inside flex gap-2">
              {student?.interests.map((interest, index) => (
                <li
                  className="py-2 px-4 bg-indigo-600 rounded-lg w-fit text-white text-sm dark:border-indigo-600 dark:text-black dark:bg-indigo-200"
                  key={index}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-end justify-end gap-4 mx-auto">
          <button className="px-2 py-1 md:px-4 md:py-2 rounded bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-all">
            Accept
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 rounded bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-all">
            Reject
          </button>
        </div>
      </div>
    </div>

  );
}
