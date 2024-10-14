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
        name: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: 9876543210,
        rollNo: 101,
        college: "Indian Institute of Technology, Guwahati",
        gender: "Male",
        course: "BTech",
        department: "Computer Science",
        cpi: 8.5,
        social: [
          {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/johndoe"
          },
          {
            platform: "GitHub",
            url: "https://github.com/johndoe"
          }
        ],
        dob: new Date("2000-01-01"),
        yearOfGrad: 2023,
        resume: "https://example.com/johndoe-resume.pdf",
        interest: [{ field: "Artificial Intelligence" }, { field: "Web Development" }],
        prevEducation: [
          {
            degree: "Higher Secondary",
            year: 2018,
            college: "XYZ High School",
            grade: "A+"
          }
        ],
        bio: "A passionate learner and developer with a keen interest in AI and web technologies.",
        prevExperience: [
          {
            role: "Intern",
            company_college: "Tech Company",
            description: "Worked on developing web applications.",
            start_date: new Date("2022-06-01"),
            end_date: new Date("2022-08-31")
          }
        ],
        applications: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: 9876543211,
        rollNo: 102,
        college: "Indian Institute of Technology, Guwahati",
        gender: "Female",
        course: "MTech",
        department: "Chemical Engineering",
        cpi: 9.0,
        social: [
          {
            platform: "Twitter",
            url: "https://twitter.com/janesmith"
          }
        ],
        dob: new Date("1999-02-15"),
        yearOfGrad: 2024,
        resume: "https://example.com/janesmith-resume.pdf",
        interest: [{ field: "Sustainable Energy" }, { field: "Materials Science" }],
        prevEducation: [
          {
            degree: "BTech",
            year: 2020,
            college: "ABC College of Engineering",
            grade: "A"
          }
        ],
        bio: "A dedicated researcher focused on sustainable energy solutions.",
        prevExperience: [],
        applications: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phoneNumber: 9876543212,
        rollNo: 103,
        college: "Indian Institute of Technology, Guwahati",
        gender: "Female",
        course: "BDes",
        department: "Design",
        cpi: 8.7,
        social: [
          {
            platform: "Instagram",
            url: "https://instagram.com/alicejohnson"
          }
        ],
        dob: new Date("2001-05-20"),
        yearOfGrad: 2025,
        resume: "https://example.com/alicejohnson-resume.pdf",
        interest: [{ field: "Graphic Design" }, { field: "User Experience" }],
        prevEducation: [
          {
            degree: "Higher Secondary",
            year: 2019,
            college: "XYZ High School",
            grade: "A"
          }
        ],
        bio: "A creative designer passionate about enhancing user experiences.",
        prevExperience: [],
        applications: [],
        createdAt: new Date(),
        updatedAt: new Date()
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
