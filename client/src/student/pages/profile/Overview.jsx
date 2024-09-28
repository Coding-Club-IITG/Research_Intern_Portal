// import React, { useEffect, useState } from "react";

const Overview = () => {
  const profileData = {
    name: "Mahak ",
    activityStatus: "Active today",
    location: "Kota, India",
    timezone: "0.5 hours behind",
    lookingFor: "Eager to learn.",
    education: {
      degree: "Bachelor's, Civil engineering",
      institution: "Indian Institute of Technology - Guwahati",
      graduationYear: "2027",
    },
    idealNextOpportunity: {
      desiredSalary: "Flexible",
      desiredRole: "Software Engineer",
      remoteWork: "Onsite Or Remote",
      desiredLocation: "Kota (current)",
      desiredTechStack: ["Node.js", "React", "Express.js", "C++"],
      wants: [
        "To solve technical problems",
        "Progression to management",
        "Company with clear roles",
        "Team members to learn from",
        "Challenging problems to work on",
      ],
    },
  };

  // const Overview = () => {
  //   const [profileData, setProfileData] = useState(null);

  //   useEffect(() => {

  //     fetch('url of api')
  //       .then(response => response.json())
  //       .then(data => setProfileData(data))
  //       .catch(error => console.error('Error fetching profile data:', error));
  //   }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mb-4">
        <div className="font-semibold">What recruiters will see</div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-6 border border-gray-300">
        <div className="flex items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-6">
            <img
              src={profileData.profilePicUrl}
              alt="Profile Pic"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {profileData.name}
            </h1>
            <p className="text-gray-600 mt-1 bg-gray-100 inline-block p-1 rounded-md">
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

        <div className="bg-white p-2 rounded-lg mb-2">
          <h2 className="text-gray-500 mb-2">Looking for</h2>
          <p className="black">{profileData.lookingFor}</p>
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h3 className="text-gray-500 mb-2">Education</h3>
          <p className="black semi-bold">{profileData.education.degree}</p>
          <p className="text-gray-600">
            {profileData.education.institution} •{" "}
            {profileData.education.graduationYear}
          </p>
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ideal Next Opportunity
          </h3>
          <h2 className="text-gray-500 mb-2">Desired Salary</h2>
          <p className="text-gray-600 bg-gray-100 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredSalary}
          </p>
          <h2 className="text-gray-500 mb-2">Desired role</h2>
          <p className="text-gray-600 bg-gray-100 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredRole}
          </p>
          <h2 className="text-gray-500 mb-2">Remote Work</h2>
          <p className="text-gray-600 bg-gray-100 inline-block p-1 mb-2 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.remoteWork}
          </p>
          <h2 className="text-gray-500 mb-2">Desired Location</h2>
          <p className="text-gray-600 bg-gray-100 inline-block p-1 rounded-md">
            {" "}
            {profileData.idealNextOpportunity.desiredLocation}
          </p>
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Desired Tech Stack</h4>
          <div className="flex flex-wrap gap-4">
            {profileData.idealNextOpportunity.desiredTechStack.map(
              (tech, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-1 rounded-md shadow-sm"
                >
                  <p className="text-gray-600">{tech}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg mb-2">
          <h4 className="text-gray-500 mb-2">Wants</h4>
          <ul className="list-disc list-inside">
            {profileData.idealNextOpportunity.wants.map((want, index) => (
              <li key={index}>{want}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
