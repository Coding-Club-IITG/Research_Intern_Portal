import { useState } from "react";
import { Select } from "antd";
import ProfilePic from "./ProfilePic";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "./ExperienceForm";

function Profile() {
  const profile = {
    name: "Aditya Samal",
    img: null,
    roll: 230123002,
    courses: [
      "BTech",
      "MTech",
      "BDes",
      "MDes",
      "MA",
      "MSR",
      "MSc",
      "Phd",
      "MBA",
    ],
    departments: [
      "Chemistry",
      "Chemical Engineering",
      "Computer Science",
      "Design",
      "Humanities and Social Science",
      "Physics",
      "Mathematics",
      "Mehta School of Data Science",
      "Mechanical Engineering",
      "Electrical and Electronics Engineering",
      "Civil Engineering",
      "Bioscience and Bioengineering",
      "Energy Engineering",
    ],
    interests: ["software dev", "machine learning"],
    skills: ["React", "Node", "MongoDB"],
    social: {
      website: "https://aditya-samal/Portfolio",
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/in/",
    },
    educations: [],
    experiences: [],
    department: "",
    course: "",
  };

  // Profile Information
  const [name, setName] = useState(profile.name || "");
  const [roll, setRoll] = useState(profile.roll || "");
  const [selectedCourse, setSelectedCourse] = useState(
    profile.course || "Select"
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    profile.department || "Select"
  );
  const [interests, setInterests] = useState(profile.interests || []);
  const [newInterest, setNewInterest] = useState("");

  const AddInterest = (e) => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };
  const [bio, setBio] = useState(profile.bio || "");

  // Social Profiles
  const [website, setWebsite] = useState(profile.social.website || "");
  const [linkedin, setLinkedin] = useState(profile.social.linkedin || "");
  const [github, setGithub] = useState(profile.social.github || "");

  //Education & Experience
  const [addExp, setAddExp] = useState(false);
  const [experiences, setExperiences] = useState(profile.experiences);

  function updateProfileExperience(newExperience) {
    setExperiences([...experiences, newExperience]);
  }

  const deleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const [addEdu, setAddEdu] = useState(false);
  const [educations, setEducations] = useState(profile.educations);

  const updateProfileEducation = (newEducation) => {
    setEducations([...educations, newEducation]);
  };

  const deleteEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  //Skills
  const [skills, setSkills] = useState(profile.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const AddSkill = (e) => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  //Achievements
  const [achievements, setAchievements] = useState(profile.achievements || "");

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      name,
      roll,
      course: selectedCourse,
      department: selectedDepartment,
      interests,
      skills,
      bio,
      social: {
        website,
        linkedin,
        github,
      },
      educations,
      experiences,
      achievements,
    };
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
                  Your Name
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
                  Roll Number
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
                Course Type
              </label>
              <Select
                value={selectedCourse}
                onChange={(option) => setSelectedCourse(option)}
                style={{
                  width: "100%",
                }}
                options={profile.courses.map((course) => {
                  return {
                    value: course,
                    label: course,
                  };
                })}
              />
            </div>
            <div className="mb-4 basis-72 grow shrink">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <Select
                value={selectedDepartment}
                onChange={(option) => setSelectedDepartment(option)}
                style={{
                  width: "100%",
                }}
                options={profile.departments.map((department) => {
                  return {
                    value: department,
                    label: department,
                  };
                })}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fields of Interest
            </label>
            <div className="flex gap-2 flex-wrap py-2">
              {interests.map((interest) => (
                <span
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
                  key={interest}
                >
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
                onClick={AddInterest}
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Your bio
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Write your bio here"
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
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Linkedin
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Github
              </label>
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
            <ExperienceCard
              key={index}
              experience={exp}
              onDelete={() => deleteExperience(index)}
            />
          ))}
          {addExp ? (
            <ExperienceForm
              setAddExp={setAddExp}
              updateProfileExperience={updateProfileExperience}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={() => setAddExp(true)}
            >
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
            <EducationCard
              key={index}
              education={edu}
              onDelete={() => deleteEducation(index)}
            />
          ))}
          {addEdu ? (
            <EducationForm
              profile={profile}
              setAddEdu={setAddEdu}
              updateProfile={updateProfileEducation}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={() => setAddEdu(true)}
            >
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
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
              >
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
              onClick={AddSkill}
            >
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
          <div>
            Sharing more details about yourself will help you stand out more.
          </div>
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
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
