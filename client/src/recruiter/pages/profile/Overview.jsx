import { useEffect, useState } from "react";
import { getRecruiter } from "../../../apis/recruiter";
import { message } from "antd";

export default function Overview() {
    const [profileData, setProfileData] = useState({});
  
    useEffect(() => {
      async function getUser(){
          message.loading({ content: "Fetching Profile...", key: "fetchProfile" });

          const res = await getRecruiter('671a4d6c09e816ee2fe4e03d');
          if(res.status === "success"){
            setProfileData(res?.data);
            message.destroy("fetchProfile");
          }else{
            message.destroy("fetchProfile");
            message.error(res.message);
          }
      }
  
      getUser();
    }, [])
  
    return (
      <div>
        <div className="py-4">
          <div className="font-semibold">What students will see</div>
        </div>
        <div className="max-w-4xl mx-auto p-6 rounded-lg mt-6 border border-gray-300">
          <div className="flex items-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
              <img
                src={profileData?.profilePicUrl || "https://img.icons8.com/ios-filled/"}
                alt="Profile Pic"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{profileData.name}</h1>
              <p className="text-green-600 mt-1 inline-block p-1 rounded-md">
                {profileData?.name}
              </p>{" "}
            </div>
            <div className="ml-auto flex space-x-4">
              <a
                href={profileData?.socialMedia?.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
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
                className="text-gray-700 hover:text-gray-900"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/resume.png"
                  alt="Resume"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
  
          <div className="p-2 rounded-lg mb-2">
            <h2 className="text-blue-500 mb-2">Area of Intrests</h2>
            <p className="black">{profileData?.areaOfInterest && profileData?.areaOfInterest.map(intrest=> intrest+ " ")}</p>
          </div>
  
          <div className="bg-white p-2 rounded-lg mb-2">
            <h3 className="text-blue-500 mb-2">Qualification</h3>
            {profileData?.qualifications && profileData?.qualifications.map((qualification )=>(
                <p className="black semi-bold">{qualification.degree} at {qualification.college} in {qualification.year}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  