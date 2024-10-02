// import React, { useEffect, useState } from "react";

const Overview = () => {
const profileData = {
  name: "John Doe",
  profilePicUrl:" https://www.flaticon.com/free-icon/profile_8847419",
  areaOfInterest: ["Software Engineering", "Data Science"],
   activityStatus: "Active today",
  socialMedia: {
    "linkedIn": "https://www.linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  isActive: true,
  qualifications: [
    {
      "degree": "Bachelor of Computer Science",
      "year": 2015,
      "college": "MIT",
      "commnets": "Graduated with honors"
    },
    {
      "degree": "Master of Data Science",
      "year": 2017,
      "college": "Stanford University",
      "commnets": "Top 5% of the class"
    }
  ],
  activityStatus: "Active today",
    location: "Kota, India",
    timezone: "0.5 hours behind",
    idealNextOpportunity: {
      Stipend: "20k",
      role: "Software Engineer",
      typeOfWork: "Remote",
      location: "Kota (current)",
      techstacks: ["Node.js", "React", "Express.js", "C++"],
      otherSkills: [
        "Able to solve technical problems",
        "Management of time",
        "Logical thinking",
        "Good communication skills",
        "Challenging problem solving"
      ]
}
}


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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="py-4">
        <div className="font-semibold">What students will see</div>
      </div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg mt-6 border border-gray-300">
        <div className="flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hiddenflex items-center justify-center mr-6">
            <img
              src={profileData.profilePicUrl}
              alt="Profile Pic"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{profileData.name}</h1>
            <p className="text-green-600 mt-1 inline-block p-1 rounded-md">
              {profileData.activityStatus}
            </p>{" "}
            {/* Active Today */}
            <p>
              {profileData.location} • {profileData.timezone}
            </p>{" "}
            {/* Location and Timezone */}
          </div>
          <div className="ml-auto flex space-x-4">
            <a
              href={profileData.linkedinUrl}
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
            </a>
          </div>
        </div>

        <div className="p-2 rounded-lg mb-2">
          <h2 className="text-blue-500 mb-2">Area of Intrests</h2>
          <p className="black">{profileData.areaOfInterest.map(intrest=> intrest+ " ")}</p>
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h3 className="text-blue-500 mb-2">Qualification</h3>
          {profileData.qualifications.map((qualification )=>(
              <p className="black semi-bold">{qualification.degree} at {qualification.college} in {qualification.year}</p>
          ))}
        </div>

        <div className="p-2 rounded-lg mb-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ideal Next Opportunity</h3>
          <h2 className="text-blue-500 mb-2">Stipend</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.Stipend}
          </p>
          <h2 className="text-blue-500 mb-2">Role</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.role}
          </p>
          <h2 className="text-blue-500 mb-2">Working mode</h2>
          <p className="text-gray-600 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.typeOfWork}
          </p>
          <h2 className="text-blue-500 mb-2">Location of work</h2>
          <p className="text-gray-600 inline-block p-1 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.location}
          </p>
        </div>

        <div className="p-2 rounded-lg mb-2">
          <h4 className="text-blue-500 mb-2"> Tech Stacks Required</h4>
          <div className="flex flex-wrap gap-4">
            {profileData.idealNextOpportunity.techstacks.map((tech, index) => (
              <div key={index} className="p-1 rounded-md shadow-sm">
                <p className="text-gray-600">{tech}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 rounded-lg mb-2">
          <h4 className="text-blue-500 mb-2">Other required skills</h4>
          <ul className="list-disc list-inside">
            {profileData.idealNextOpportunity.otherSkills.map((want, index) => (
              <li key={index}>{want}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
