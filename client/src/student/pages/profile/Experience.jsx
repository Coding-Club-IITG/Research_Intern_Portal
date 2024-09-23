import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "./ExperienceForm";

function Experience({ profile }) {
  const [addExp, setAddExp] = useState(false);
  const [experiences, setExperiences] = useState(profile.experiences || []);

  const updateProfile = (newExperience) => {
    setExperiences([...experiences, newExperience]);
  };

  function handleAddExp() {
    setAddExp(true);
  }

  return (
    <>
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Experience</div>
          <div>What all have you done?</div>
        </div>

        <div className="flex-col grow shrink">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}

          {addExp ? (
            <ExperienceForm
              profile={profile}
              setAddExp={setAddExp}
              updateProfile={updateProfile}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={handleAddExp}
            >
              + Add Experience
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Experience;
