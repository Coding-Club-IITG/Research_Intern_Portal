import { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import ProfilePic from "../../../root-components/ProfilePic";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import ExperienceCard from "../../../root-components/ExperienceCard";
import ExperienceForm from "../../../root-components/ExperienceForm";
import { useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";
import { useTheme } from "../../../store/themeStore";
import daysjs from "dayjs";
import {
  getAllCourses,
  getAllDepartments,
  getDepartmentById
} from "../../../apis/courses-departments";

function Profile() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();
  const [theme, toggleTheme] = useTheme();

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Select");
  const [selectedDepartment, setSelectedDepartment] = useState("Select");
  const [CGPA, setCGPA] = useState("");
  const [yearOfGrad, setYearOfGrad] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [addExp, setAddExp] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [addEdu, setAddEdu] = useState(false);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [achievements, setAchievements] = useState("");
  const [social, setSocial] = useState([]);

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await getAllDepartments(navigate);
      if (res.status === "success") {
        setDepartments(res.data);
      }
    };
    getDepartments();
  }, [navigate]);

  useEffect(() => {
    const getCourses = async () => {
      const res = await getAllCourses(navigate);
      if (res.status === "success") {
        setCourses(res.data);
      }
    };
    getCourses();
  }, [navigate]);

  const AddInterest = (e) => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        message.loading({ content: "Loading....", key: "loadingData" });
        const res = await getStudent(user.connection_id, navigate);
        if (res.status === "error") {
          message.destroy("loadingData");
          navigate("/500");
          return;
        }

        let deptId = res.data?.department || "Select";
        let deptName = "Select";

        if (deptId !== "Select") {
          const dept = await getDepartmentById(deptId, navigate);
          deptName = dept.data?.name || "Select";
        }

        let courseId = res.data?.department || "Select";
        let courseName = "Select";

        if (courseId !== "Select") {
          const course = await getDepartmentById(courseId, navigate);
          courseName = course.data?.name || "Select";
        }

        message.destroy("loadingData");
        setName(res.data?.name || "");
        setEmail(res.data?.email || "");
        setCGPA(res.data?.CGPA);
        setYearOfGrad(daysjs(res.data?.yearOfGrad));
        setDOB(daysjs(res.data?.DOB));
        setBio(res.data?.bio || "");
        setSelectedDepartment(deptId || "Select");
        setSelectedCourse(courseId || "Select");
        setGender(res.data?.gender || "");
        setNumber(res.data?.number || "");
        setRoll(res.data?.roll || "");
        setWebsite(res.data?.social[0]?.url || "");
        setLinkedin(res.data?.social[1]?.url || "");
        setGithub(res.data?.social[2]?.url || "");
        setSocial([
          { platform: "Website", url: res.data?.social[0]?.url || "" },
          { platform: "Linkedin", url: res.data?.social[1]?.url || "" },
          { platform: "Github", url: res.data?.social[2]?.url || "" }
        ]);
        setSkills(res.data?.skills || []);
        setAchievements(res.data?.achievements || "");
        setEducations(res.data?.educations || []);
        setExperiences(res.data?.experiences || []);
        setInterests(res.data?.interests || []);
      } catch (error) {
        message.destroy("loadingData");
        message.error("An error occurred while fetching user data.");
        console.error("Error in getUser:", error);
        navigate("/500");
      }
    }

    getUser();
  }, [user.connection_id, navigate]);

  const handleYearOfGrad = (date) => {
    setYearOfGrad(daysjs(date));
  };

  const handleDOB = (date) => {
    setDOB(daysjs(date));
  };

  const deleteExperience = (index) => {
    setExperiences((prevExperiences) => prevExperiences.filter((_, i) => i !== index));
  };

  const updateProfileExperience = (updatedExperience) => {
    const tempExperience = [...experiences, updatedExperience];
    // tempExperience.sort((a,b)=>(b?.startDate).localeCompare(a.startDate));
    setExperiences(tempExperience);
  };

  const deleteEducation = (index) => {
    setEducations((prevEducations) => prevEducations.filter((_, i) => i !== index));
  };

  const updateProfileEducation = (updatedEducation) => {
    const tempEducation = [...educations, updatedEducation];
    tempEducation.sort((a, b) => b.startDate.localeCompare(a.startDate));
    setEducations(tempEducation);
  };

  const AddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setNewSkill("");
    } else {
      message.error("Please enter a valid skill.");
    }
  };

  const removeInterest = (interest) => {
    const tempInterests = interests.filter((int) => {
      return interest !== int;
    });
    setInterests(tempInterests);
  };

  const removeSkills = (skill) => {
    const tempSkills = skills.filter((skl) => {
      return skl !== skill;
    });
    setSkills(tempSkills);
  };

  useEffect(() => {
    setSocial([
      { platform: "Website", url: website },
      { platform: "Linkedin", url: linkedin },
      { platform: "Github", url: github }
    ]);
  }, [github, linkedin, website]);

  const handleSaveProfile = async () => {
    if (
      !name.trim() ||
      !roll ||
      selectedCourse === "Select" ||
      selectedDepartment === "Select" ||
      !email.trim() ||
      !number ||
      !CGPA ||
      !yearOfGrad ||
      !gender.trim()
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const updatedProfile = {
      name,
      roll,
      CGPA,
      DOB: DOB,
      course: selectedCourse,
      department: selectedDepartment,
      gender,
      interests,
      email,
      number,
      yearOfGrad,
      skills,
      bio,
      social: social,
      educations,
      experiences,
      achievements
    };

    message.loading({ content: "Saving Profile...", key: "saveProfile" });
    const res = await updateStudent(user.connection_id, updatedProfile);

    if (res.status === "success") {
      message.destroy("saveProfile");
      message.success("Profile updated successfully!");
    } else {
      message.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col space-y-4 min-h-screen">
      {/* About Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">About</div>
          <div className="dark:text-gray-400">
            Tell us about yourself so startups know who you are.
          </div>
        </div>

        <div className="flex-col grow shrink">
          <div className="flex w-full justify-between items-center flex-wrap">
            <div className="flex-col basis-80 grow shrink">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="Roll"
                />
              </div>
            </div>
            <div className="basis-32 px-8 py-2 justify-center items-center">
              <ProfilePic />
            </div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Course Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className={`mt-1 block w-full p-2 border 
    border-gray-300 rounded-md shadow-sm 
    bg-white dark:bg-slate-700 
    dark:border-yellow-500 
    dark:text-white focus:outline-none 
    focus:ring-1 dark:focus:ring-yellow-400 
    focus:border-yellow-500 dark:focus:border-yellow-500
    sm:text-sm`}>
                <option value="Select" disabled className="dark:bg-slate-700 dark:text-white">
                  Select
                </option>
                {courses.map((course) => (
                  <option
                    key={course._id}
                    value={course._id}
                    className="dark:bg-slate-700 dark:text-white">
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 basis-72 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`mt-1 block w-full p-2 border 
              border-gray-300 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 
              dark:border-yellow-500 
              dark:text-white focus:outline-none 
              focus:ring-1 dark:focus:ring-yellow-400 
              focus:border-yellow-500 dark:focus:border-yellow-500
              sm:text-sm`}>
                <option value="Select" disabled className="dark:bg-slate-700 dark:text-white">
                  Select
                </option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-4 flex-wrap pb-2">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Current CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={CGPA}
                onChange={(e) => setCGPA(e.target.value)}
                placeholder="eg. 8.75"
              />
            </div>
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Year Of Grad <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className={`grow shrink w-full pb-2 mt-1 ${
                  theme === "dark"
                    ? "bg-slate-700 text-white  border-yellow-400 dark:hover:bg-slate-700"
                    : "bg-white border-gray-300"
                }`}
                picker="year"
                value={yearOfGrad}
                onChange={(date) => handleYearOfGrad(date)}
              />
            </div>

            <div className="basis-32 grow shrink ">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">
                DOB
              </label>
              <DatePicker
                className={`grow shrink w-full pb-2 mt-1 ${
                  theme === "dark"
                    ? "bg-slate-700 border-yellow-400 dark:hover:bg-slate-700 text-white placeholder:text-white"
                    : "bg-white border-gray-300"
                }`}
                picker="date"
                value={DOB}
                onChange={handleDOB}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eg. abc@gmail.com"
            />
          </div>

          <div className="flex justify-between gap-4 flex-wrap">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Your Gender"
              />
            </div>
            <div className="mb-4 basis-72 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-0 dark:bg-slate-700">
              Fields of Interest
            </label>
            <div className="flex gap-2 flex-wrap py-2">
              {interests.map((interest) => (
                <span
                  className="relative inline-flex items-center px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full shadow-lg font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo-200 hover:shadow-xl dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 dark:hover:shadow-xl"
                  key={interest}>
                  {interest}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeInterest(interest);
                    }}
                    className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px] cursor-pointer shadow-md border border-white transition-transform duration-200 hover:bg-red-600 hover:scale-110">
                    ✕
                  </span>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="mt-1 grow shrink p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400"
                placeholder="Add Interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <button
                className="basis-28 p-2 bg-indigo-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black text-white rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={AddInterest}>
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Your bio {"  "}
              <span className="text-xs" style={{ fontStyle: "italic" }}>
                (Upto 200 words)
              </span>
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
              rows="4"
              value={bio}
              placeholder="Write your bio here"
              onChange={(e) => {
                if (e.target.value.length <= 200) setBio(e.target.value);
              }}
            />
            <div className="text-right text-sm text-gray-700">{200 - bio.length} words left</div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-yellow-400" />

      {/* Social Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">Social Profiles</div>
          <div className="dark:text-gray-400">Where can people find you online?</div>
        </div>
        <div className="flex-col grow shrink">
          <div className="flex-col basis-80 grow shrink">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Website
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="eg. www.yourwebsite.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Linkedin
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="eg. www.linkedin.com/in/yourprofile"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Github
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="eg. www.github.com/yourprofile"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-yellow-400" />

      {/* Experience Section */}
      <div className="flex w-full flex-wrap items-start">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">Experience</div>
          <div className="dark:text-gray-400">What all have you done?</div>
        </div>
        <div className="basis-full md:basis-2/3 flex flex-col items-start pl-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} onDelete={() => deleteExperience(index)} />
          ))}
          {addExp ? (
            <ExperienceForm
              setAddExp={setAddExp}
              updateProfileExperience={updateProfileExperience}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer dark:text-yellow-400"
              onClick={() => setAddExp(true)}>
              + Add Experience
            </span>
          )}
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-yellow-400" />

      {/* Education Section */}
      <div className="flex w-full flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">Education</div>
          <div className="dark:text-gray-400">Which school have you studied at?</div>
        </div>
        <div className="flex-col pl-4 md:basis-2/3 grow shrink">
          {educations.map((edu, index) => (
            <EducationCard key={index} education={edu} onDelete={() => deleteEducation(index)} />
          ))}
          {addEdu ? (
            <EducationForm setAddEdu={setAddEdu} updateProfile={updateProfileEducation} />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer dark:text-yellow-400"
              onClick={() => setAddEdu(true)}>
              + Add Education
            </span>
          )}
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-yellow-400" />

      {/* Skills Section */}
      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="md:basis-1/3 p-4 pb-0">
          <div className="font-bold dark:text-white">Skills</div>
          <div className="dark:text-gray-400">What are you skilled at?</div>
        </div>
        <div className="flex-col grow shrink ml-4 ">
          <div className="flex flex-wrap mb-4 items-center">
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="relative inline-flex items-center px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full shadow-lg font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo-200 hover:shadow-xl dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 dark:hover:shadow-xl">
                  {skill}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSkills(skill);
                    }}
                    className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px] cursor-pointer shadow-md border border-white transition-transform duration-200 hover:bg-red-600 hover:scale-110">
                    ✕
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              className="mt-1 grow shrink p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400"
              placeholder="Add Skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="p-2 bg-indigo-600 dark:bg-yellow-400 text-white rounded-md hover:bg-indigo-700 transition duration-200 dark:text-black dark:hover:bg-yellow-500"
              onClick={AddSkill}>
              Add
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-yellow-400" />

      {/* Achievements Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">Achievements</div>
          <div className="dark:text-gray-400">
            Sharing more details about yourself will help you stand out more.
          </div>
        </div>
        <div className="flex-col grow shrink">
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
            rows="4"
            placeholder="Write your achievements here"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end p-4">
        <button
          type="primary"
          className="p-2 bg-indigo-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md hover:bg-indigo-700 transition duration-200 dark:text-black"
          onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
