const students = [
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
  ];
  
  export default students;