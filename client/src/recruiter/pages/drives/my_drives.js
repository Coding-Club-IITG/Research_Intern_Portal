import React from "react";

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
  },
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
    prof_name: "Dr. Emily White",
    title: "Data Science Intern",
    description: "Work on data analysis and visualization for various projects.",
    isActive: true,
    tags: "data science, Python, R, SQL",
    type: "Full-Time",
    stipend: 7000,
    hours_required: 30,
    applicants: [
      {
        name: "Alice Johnson",
        img: null,
        roll: "CS101",
        courses: ["BTech"],
        departments: ["Computer Science"],
        interests: ["data science"],
        skills: ["Python", "SQL"],
        social: {
          website: "",
          linkedin: "https://linkedin.com/in/alice-johnson",
          github: "https://github.com/alice-johnson"
        },
        educations: [],
        experiences: [],
        department: "Computer Science",
        course: "BTech",
        number: "",
        gender: "Female",
        CGPA: "8.2",
        yearOfGrad: "2025",
        DOB: "",
        email: "alice.johnson@example.com",
        achievements: "",
        bio: "A passionate data science enthusiast."
      },
      {
        name: "Bob Smith",
        img: null,
        roll: "CS102",
        courses: ["BTech"],
        departments: ["Computer Science"],
        interests: ["machine learning", "data analysis"],
        skills: ["R", "Python"],
        social: {
          website: "",
          linkedin: "https://linkedin.com/in/bob-smith",
          github: "https://github.com/bob-smith"
        },
        educations: [],
        experiences: [],
        department: "Computer Science",
        course: "BTech",
        number: "",
        gender: "Male",
        CGPA: "7.8",
        yearOfGrad: "2025",
        DOB: "",
        email: "bob.smith@example.com",
        achievements: "",
        bio: "Interested in data-driven solutions for real-world problems."
      }
    ],
    requirements: {
      cpi: 7.0,
      branch: ["Computer Science", "Statistics"],
      study_year: 3
    },
    accepting: true,
    last_date: "2024-10-30"
  },
  {
    prof_name: "Dr. Sarah Lee",
    title: "Software Development Intern",
    description: "Develop and maintain software applications.",
    isActive: true,
    tags: "software development, Java, C++",
    type: "Full-Time",
    stipend: 7500,
    hours_required: 40,
    applicants: [],
    requirements: {
      cpi: 7.0,
      branch: ["Computer Science", "Software Engineering"],
      study_year: 3
    },
    accepting: true,
    last_date: "2024-11-01"
  }
];

export default my_drives;