import { useEffect, useState } from "react";
import { message } from "antd";
import ProfilePic from "../../../root-components/ProfilePic";
import QualificationCard from "./QualificationCard";
import QualificationForm from "./QualificationForm";
import { getRecruiter, updateRecruiter } from "../../../apis/recruiter";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { getAllDepartments, getDepartmentById } from "../../../apis/courses-departments";

function Profile() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();
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
    async function getUser() {
      try {
        message.loading({ content: "Loading...", key: "loadingData" });

        const res = await getRecruiter(user.connection_id, navigate);
        if (res.status === "error") {
          message.destroy("loadingData");
          navigate("/500");
          return;
        }

        let deptId = res.data?.department || "Select";

        setName(res.data?.name || "");
        setEmail(res.data?.email || "");
        setSelectedDepartment(deptId || "Select");
        setGender(res.data?.gender || "");
        setNumber(res.data?.phoneNumber || "");
        setWebsite(res.data?.socialMedia?.website || "");
        setLinkedin(res.data?.socialMedia?.linkedIn || "");
        setInterests(res.data?.areaOfInterest || []);
        setQualifications(res.data?.qualifications || []);

        message.destroy("loadingData");
      } catch (error) {
        message.destroy("loadingData");
        message.error("An error occurred while fetching recruiter data.");
        console.error("Error in getUser:", error);
        navigate("/500");
      }
    }

    getUser();
  }, [user.connection_id, navigate]);

  // Profile Information
  const [name, setName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Select");

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");

  const AddInterest = (e) => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  // Social Profiles
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [addEdu, setAddEdu] = useState(false);
  const [qualifications, setQualifications] = useState([]);

  const updateProfileQualification = (newQualification) => {
    setQualifications([...qualifications, newQualification]);
    console.log(qualifications);
  };

  const deleteQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };

  const removeInterest = (interest) => {
    const tempInterests = interests.filter((int) => {
      return interest !== int;
    });
    setInterests(tempInterests);
  };

  const handleSaveProfile = async () => {
    message.loading({ content: "Saving Profile...", key: "saveProfile" });
    if (
      !name.trim() ||
      !email.trim() ||
      selectedDepartment === "Select" ||
      !number ||
      !gender.trim()
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const updatedProfile = {
      name,
      department: selectedDepartment,
      gender,
      email,
      phoneNumber: number,
      areaOfInterest: interests,
      socialMedia: {
        website,
        linkedIn: linkedin
      },
      qualifications
    };

    const res = await updateRecruiter(user.connection_id, updatedProfile);

    if (res.status === "success") {
      message.destroy("saveProfile");
      message.success("Profile updated successfully!");
    } else {
      message.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col space-y-4 min-h-screen bg-white px-4 py-6 rounded-md dark:bg-zinc-900">
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">About</div>
          <div className="dark:text-gray-400">Tell us about yourself.</div>
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Eg. abc@gmail.com"
                />
              </div>
            </div>
            <div className="basis-32 px-8 py-2 justify-center items-center">
              <ProfilePic />
            </div>
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
                  bg-white dark:bg-zinc-900 
                  dark:border-gray-600 
                  dark:text-white focus:outline-none 
                  focus:ring-1 dark:focus:ring-gray-400 
                  focus:border-gray-600 dark:focus:border-gray-600
                  sm:text-sm`}>
              <option value="Select" disabled className="dark:bg-zinc-900 dark:text-white">
                Select
              </option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between gap-4 flex-wrap">
            <div className="basis-32 grow shrink">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Mobile Number"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-0 dark:bg-zinc-900">
              Fields of Interest
            </label>
            <div className="flex gap-2 flex-wrap py-2">
              {interests.map((interest) => (
                <span
                  className="relative inline-flex items-center px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full shadow-lg font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo-200 hover:shadow-xl  dark:text-black dark:hover:bg-indigo-200 dark:hover:shadow-xl"
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
                className="mt-1 grow shrink p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-300"
                placeholder="Add Interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <button
                className="basis-28 p-2 bg-indigo-600  dark:hover:bg-indigo-700 dark:text-black text-white rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={AddInterest}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300" />

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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="eg. www.linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300" />

      {/* Experience Section */}
      {/* <div className="flex w-full flex-wrap items-start">
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
        </div> */}
      {/* no need for v1 */}
      {/* <hr /> */}

      <div className="flex w-full flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold dark:text-white">Education</div>
          <div className="dark:text-gray-400">Which school have you studied at?</div>
        </div>
        <div className="flex-col pl-4 md:basis-2/3 grow shrink">
          {qualifications.map((edu, index) => (
            <QualificationCard
              key={index}
              qualification={edu}
              onDelete={() => deleteQualification(index)}
              deletable={true}
            />
          ))}
          {addEdu ? (
            <QualificationForm
              setAddQualification={setAddEdu}
              updateProfileQualification={updateProfileQualification}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer dark:text-white"
              onClick={() => setAddEdu(true)}>
              + Add Qualification
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="primary"
          className="p-2 bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 transition duration-200 dark:text-black"
          onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
