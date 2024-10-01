import DriveCard from "./DriveCard";

const my_drives = [
  {
    prof_name: "Dr. John Doe",
    title: "Web Development Intern",
    description:
      "Develop and maintain the university's website, ensuring responsiveness and performance.",
    isActive: true,
    tags: "web, frontend, HTML, CSS, JavaScript",
    type: "Part-Time",
    stipend: 5000,
    hours_required: 20,
    applicants: [],
    requirements: {
      cpi: 7.5,
      branch: ["Computer Science", "Electrical"],
      study_year: 3
    },
    accepting: true,
    last_date: "2024-10-15"
  },
  {
    prof_name: "Dr. Jane Smith",
    title: "Machine Learning Intern",
    description: "Assist in building machine learning models and analyzing large datasets.",
    isActive: true,
    tags: "machine learning, Python, data analysis",
    type: "Full-Time",
    stipend: 8000,
    hours_required: 40,
    applicants: [],
    requirements: {
      cpi: 8.0,
      branch: ["Computer Science", "Physics"],
      study_year: 4
    },
    accepting: true,
    last_date: "2024-10-20"
  },
  {
    prof_name: "Dr. Alan Brown",
    title: "Chemical Engineering Research Assistant",
    description: "Support ongoing research projects related to chemical process optimization.",
    isActive: true,
    tags: "research, chemical engineering, process optimization",
    type: "Part-Time",
    stipend: 6000,
    hours_required: 15,
    applicants: [],
    requirements: {
      cpi: 7.0,
      branch: ["Chemistry", "Chemical Engineering"],
      study_year: 2
    },
    accepting: true,
    last_date: "2024-10-25"
  }
];

function Drives() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Internship Openings</h1>
      {my_drives.map((drive, index) => (
        <DriveCard key={index} drive={drive} />
      ))}
    </div>
  );
}

export default Drives;
