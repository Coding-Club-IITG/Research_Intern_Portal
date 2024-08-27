import { useState } from "react";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";

function Education({ profile }) {
  const [addEdu, setAddEdu] = useState(false);
  const [Educations, setEducations] = useState(profile.Educations || []);

  const updateProfile = (newEducation) => {
    setEducations([...Educations, newEducation]);
  };

  function handleAddEdu() {
    setAddEdu(true);
  }

  return (
    <div className="flex w-full space-x-4">
      <div className="w-1/3 p-4">
        <div className="font-bold">Education</div>
        <div>Which school have u studied at?</div>
      </div>

      <div className="flex-col w-2/3 p-4">
        {Educations.map((Edu, index) => (
          <EducationCard key={index} Education={Edu} />
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
  );
}

export default Education;
