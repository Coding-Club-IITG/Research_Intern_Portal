import { useEffect, useState } from "react";
import { DatePicker, Select, message } from "antd";
import ProfilePic from "../../../root-components/ProfilePic";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import ExperienceCard from "../../../root-components/ExperienceCard";
import ExperienceForm from "../../../root-components/ExperienceForm";
import { useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";

function Profile() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();

  // Initial profile data state

  // State variables for individual fields
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

  const courses = ["BTech", "MTech", "BDes", "MDes", "MA", "MSR", "MSc", "Phd", "MBA"];
  const departments = ["Chemistry", "Mathematics"];

  const AddInterest = (e) => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const res = await getStudent(user.connection_id, navigate);
        console.log(res);
        setName(res.data?.name || "");
        setEmail(res.data?.email || "");
        setSelectedDepartment(res.data?.department || "Select");
        setGender(res.data?.gender || "");
        setNumber(res.data?.number || "");
        setRoll(res.data?.roll || "");
        setWebsite(res.data?.socialMedia?.website || "");
        setLinkedin(res.data?.socialMedia?.linkedIn || "");
        setSkills(res.data?.skills || []);
        setEducations(res.data?.educations || []);
        setExperiences(res.data?.experiences || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
    getUser();
  }, [user.connection_id, navigate]);

  const handleYearOfGrad = (date) => {
    setYearOfGrad(date);
  };

  const handleDOB = (date) => {
    setDOB(date);
  };

  const deleteExperience = (index) => {
    setExperiences((prevExperiences) => prevExperiences.filter((_, i) => i !== index));
  };

  const updateProfileExperience = (index, updatedExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp, i) => (i === index ? updatedExperience : exp))
    );
  };

  const deleteEducation = (index) => {
    setEducations((prevEducations) => prevEducations.filter((_, i) => i !== index));
  };

  const updateProfileEducation = (index, updatedEducation) => {
    setEducations((prevEducations) =>
      prevEducations.map((edu, i) => (i === index ? updatedEducation : edu))
    );
  };

  const AddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setNewSkill(""); // Reset the input field after adding
    } else {
      message.error("Please enter a valid skill.");
    }
  };

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
      DOB,
      course: selectedCourse,
      department: selectedDepartment,
      gender,
      interests,
      email,
      number,
      yearOfGrad,
      skills,
      bio,
      social: {
        website,
        linkedin: linkedin,
        github
      },
      educations,
      experiences,
      achievements
    };
    const res = await updateStudent(user.connection_id, updatedProfile);

    if (res.status === "success") {
      message.destroy("saveProfile");
      message.success("Profile updated successfully!");
      console.log(2);
      console.log(res.data);
    } else {
      message.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col space-y-4 min-h-screen">
      {/* About Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">About</div>
          <div>Tell us about yourself so startups know who you are.</div>
        </div>

        <div className="flex-col grow shrink">
          <div className="flex w-full justify-between items-center flex-wrap">
            <div className="flex-col basis-80 grow shrink">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                />
              </div>
            </div>
            <div className="basis-32 px-8 py-2 justify-center items-center">
              <ProfilePic />
            </div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Course Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedCourse}
                onChange={(option) => setSelectedCourse(option)}
                style={{
                  width: "100%"
                }}
                options={courses.map((course) => ({
                  value: course,
                  label: course
                }))}
              />
            </div>
            <div className="mb-4 basis-72 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedDepartment}
                onChange={(option) => setSelectedDepartment(option)}
                style={{
                  width: "100%"
                }}
                options={departments.map((department) => ({
                  value: department,
                  label: department
                }))}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 flex-wrap pb-2">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={CGPA}
                onChange={(e) => setCGPA(e.target.value)}
                placeholder="Current Grade"
              />
            </div>
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Year Of Grad <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className="grow shrink w-full pb-2 mt-1"
                picker="year"
                selected={yearOfGrad} // Changed from value to selected
                onChange={(value) => handleYearOfGrad(value)}
                placeholderText="Year of Graduation"
              />
            </div>

            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700">DOB</label>
              <DatePicker
                className="grow shrink w-full pb-2 mt-1"
                picker="date"
                value={DOB}
                onChange={handleDOB}
                placeholder="Date Of Birth"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eg. abc@gmail.com"
            />
          </div>

          <div className="flex justify-between gap-4 flex-wrap">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Your Gender"
              />
            </div>
            <div className="mb-4 basis-72 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fields of Interest</label>
            <div className="flex gap-2 flex-wrap py-2">
              {interests.map((interest) => (
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="mt-1 grow shrink p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Add Interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <button
                className="basis-28 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={AddInterest}>
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Your bio</label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Write your bio here"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />

      {/* Social Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Social Profiles</div>
          <div>Where can people find you online?</div>
        </div>
        <div className="flex-col grow shrink">
          <div className="flex-col basis-80 grow shrink">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Linkedin</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Github</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Experience Section */}
      <div className="flex w-full flex-wrap items-start">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Experience</div>
          <div>What all have you done?</div>
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
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={() => setAddExp(true)}>
              + Add Experience
            </span>
          )}
        </div>
      </div>
      <hr />

      {/* Education Section */}
      <div className="flex w-full flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Education</div>
          <div>Which school have you studied at?</div>
        </div>
        <div className="flex-col pl-4 md:basis-2/3 grow shrink">
          {educations.map((edu, index) => (
            <EducationCard key={index} education={edu} onDelete={() => deleteEducation(index)} />
          ))}
          {addEdu ? (
            <EducationForm setAddEdu={setAddEdu} updateProfile={updateProfileEducation} />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={() => setAddEdu(true)}>
              + Add Education
            </span>
          )}
        </div>
      </div>
      <hr />

      {/* Skills Section */}
      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="md:basis-1/3 p-4 pb-0">
          <div className="font-bold">Skills</div>
          <div>What are you skilled at?</div>
        </div>
        <div className="flex-col grow shrink ml-4">
          <div className="flex gap-2 flex-wrap py-2 mb-4">
            {skills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add Interest"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
              onClick={AddSkill}>
              Add
            </button>
          </div>
        </div>
      </div>
      <hr />

      {/* Achievements Section */}
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Achievements</div>
          <div>Sharing more details about yourself will help you stand out more.</div>
        </div>
        <div className="flex-col grow shrink">
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
