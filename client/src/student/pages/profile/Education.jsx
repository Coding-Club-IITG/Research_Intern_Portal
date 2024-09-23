import { useState } from "react";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";

function Education({ profile }) {
  const [addEdu, setAddEdu] = useState(false);
  const [educations, setEducations] = useState(profile.educations || []);

  const updateProfile = (newEducation) => {
    setEducations([...educations, newEducation]);
  };

  function handleAddEdu() {
    setAddEdu(true);
  }

  return (
    <>
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">Education</div>
          <div>Which school have you studied at?</div>
        </div>

        <div className="flex-col grow shrink ">
          {educations.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))}

          {addEdu ? (
            <EducationForm
              profile={profile}
              setAddEdu={setAddEdu}
              updateProfile={updateProfile}
            />
          ) : (
            <span
              className="text-blue-700 hover:underline cursor-pointer"
              onClick={handleAddEdu}
            >
              + Add Education
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Education;
