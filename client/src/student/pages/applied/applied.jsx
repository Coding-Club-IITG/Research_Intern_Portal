import React from "react";
import InternshipCard from "../internships/InternshipCard";

function Internships() {
  const appliedInternships = [
    {
      proffName: "PSM",
      department: "Mathematics",
      image: "https://via.placeholder.com/100",
      description:
        "Personalised entrepreneurship learning and guidance. Made as simple as texting.",
      tags: ["Top 1% of responders", "Responds within a day", "Early Stage", "Growing fast"],
      role: "Flutter Intern",
      stipend: "1000",
      applications: "35"
    },
    {
      proffName: "John Jose",
      department: "CSE",
      image: "https://via.placeholder.com/100",
      description:
        "Personalised entrepreneurship learning and guidance. Made as simple as texting.",
      tags: ["Top 1% of responders", "Responds within a day", "Early Stage", "Growing fast"],
      role: "Flutter Intern",
      stipend: "2000",
      applications: "75"
    }
  ];

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Your Applied Internships</div>
      <div>
        {appliedInternships.map((arr, index) => (
          <InternshipCard key={index} arr={arr} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Internships;
