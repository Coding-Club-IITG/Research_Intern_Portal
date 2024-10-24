import React from "react";
import { Card, Col, Row, Statistic } from "antd";

const Professors = [
  {
    name: "John Doe",
    areaOfInterest: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    university: "MIT",
    email: "john.doe@mit.edu",
    socialMedia: {
      linkedIn: "https://www.linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe"
    },
    phoneNumber: 1234567890,
    isActive: true,
    createdAt: "2023-09-01T10:15:30.789Z",
    updatedAt: "2023-09-10T12:15:30.789Z",
    rating: 4.5,
    qualifications: [
      {
        degree: "PhD in Artificial Intelligence",
        year: 2015,
        college: "Stanford University",
        commnets: "Focused on reinforcement learning"
      },
      {
        degree: "MSc in Computer Science",
        year: 2012,
        college: "Stanford University",
        commnets: "Specialized in AI"
      }
    ],
    isVerified: true,
    jobs: []
  },
  {
    name: "Jane Smith",
    areaOfInterest: ["Blockchain", "Cryptography", "Cybersecurity"],
    university: "Harvard",
    email: "jane.smith@harvard.edu",
    socialMedia: {
      linkedIn: "https://www.linkedin.com/in/janesmith",
      twitter: "https://twitter.com/janesmith"
    },
    phoneNumber: 9876543210,
    isActive: false,
    createdAt: "2023-06-12T11:30:22.456Z",
    updatedAt: "2023-07-10T09:15:10.123Z",
    rating: 5,
    qualifications: [
      {
        degree: "PhD in Cryptography",
        year: 2017,
        college: "Harvard University",
        commnets: "Researched secure encryption algorithms"
      },
      {
        degree: "MSc in Cybersecurity",
        year: 2014,
        college: "Harvard University",
        commnets: "Focus on ethical hacking"
      }
    ],
    isVerified: true,
    jobs: ["650aebc1c1f92e987b3e40d9"]
  },
  {
    name: "Mark Johnson",
    areaOfInterest: ["Data Analytics", "Business Intelligence"],
    university: "UC Berkeley",
    email: "mark.johnson@berkeley.edu",
    socialMedia: {
      linkedIn: "https://www.linkedin.com/in/markjohnson",
      twitter: "https://twitter.com/markjohnson"
    },
    phoneNumber: 5551234567,
    isActive: true,
    createdAt: "2023-08-22T14:45:32.789Z",
    updatedAt: "2023-09-15T13:22:45.654Z",
    rating: 4.8,
    qualifications: [
      {
        degree: "MBA",
        year: 2019,
        college: "UC Berkeley",
        commnets: "Specialized in data-driven decision making"
      }
    ],
    isVerified: false,
    jobs: ["650aebc1c1f92e987b3e40d8", "650aebc1c1f92e987b3e40da"]
  },
  {
    name: "Sarah Lee",
    areaOfInterest: ["Healthcare Technology", "AI in Medicine"],
    university: "Johns Hopkins University",
    email: "sarah.lee@jhu.edu",
    socialMedia: {
      linkedIn: "https://www.linkedin.com/in/sarahlee",
      twitter: ""
    },
    phoneNumber: 7894561230,
    isActive: true,
    createdAt: "2023-05-10T09:30:15.987Z",
    updatedAt: "2023-08-12T10:20:18.456Z",
    rating: 4.6,
    qualifications: [
      {
        degree: "PhD in Biomedical Engineering",
        year: 2016,
        college: "Johns Hopkins University",
        commnets: "Focus on AI applications in medical imaging"
      }
    ],
    isVerified: true,
    jobs: []
  },
  {
    name: "Michael Anderson",
    areaOfInterest: ["Quantum Computing", "Physics"],
    university: "University of Cambridge",
    email: "michael.anderson@cam.ac.uk",
    socialMedia: {
      linkedIn: "https://www.linkedin.com/in/michaelanderson",
      twitter: ""
    },
    phoneNumber: 8765432109,
    isActive: false,
    createdAt: "2023-02-15T14:22:12.345Z",
    updatedAt: "2023-06-18T09:45:32.654Z",
    rating: 5,
    qualifications: [
      {
        degree: "PhD in Quantum Physics",
        year: 2012,
        college: "University of Cambridge",
        commnets: "Focused on quantum algorithms"
      }
    ],
    isVerified: false,
    jobs: ["650aebc1c1f92e987b3e40db"]
  }
];

const Jobs = [
  {
    prof_name: "Dr. Jane Smith",
    title: "Machine Learning Research Assistant",
    description:
      "Assist in research on machine learning algorithms and their application in healthcare.",
    isActive: true,
    createdAt: "2023-09-12T12:34:56.789Z",
    updatedAt: "2023-09-12T12:34:56.789Z",
    tags: ["Machine Learning", "Research", "AI", "Healthcare"],
    type: "Internship",
    stipend: 2000,
    hours_required: 20,
    total_applicants: 45,
    accepting: true,
    last_date: 1725148800,
    applications: []
  },
  {
    prof_name: "Dr. Alan Walker",
    title: "Data Science Teaching Assistant",
    description: "Support data science students with coursework, tutorials, and lab sessions.",
    isActive: false,
    createdAt: "2023-08-05T09:21:45.123Z",
    updatedAt: "2023-09-01T11:34:22.789Z",
    tags: ["Data Science", "Teaching", "Python"],
    type: "Part-time",
    stipend: 1500,
    hours_required: 15,
    total_applicants: 30,
    accepting: false,
    last_date: 1722643200,
    applications: []
  },
  {
    prof_name: "Prof. Emily Green",
    title: "Blockchain Research Assistant",
    description:
      "Explore decentralized solutions and work on blockchain projects related to supply chain management.",
    isActive: true,
    createdAt: "2023-07-19T14:22:15.654Z",
    updatedAt: "2023-09-10T16:45:32.987Z",
    tags: ["Blockchain", "Decentralization", "Supply Chain"],
    type: "Full-time",
    stipend: 3000,
    hours_required: 40,
    total_applicants: 20,
    accepting: true,
    last_date: 1727904000,
    applications: []
  },
  {
    prof_name: "Dr. Robert King",
    title: "Computer Vision Intern",
    description:
      "Develop and test computer vision algorithms for automated image recognition systems.",
    isActive: true,
    createdAt: "2023-10-01T08:45:12.456Z",
    updatedAt: "2023-10-05T10:15:22.789Z",
    tags: ["Computer Vision", "Image Processing", "AI"],
    type: "Internship",
    stipend: 2500,
    hours_required: 25,
    total_applicants: 35,
    accepting: true,
    last_date: 1728316800,
    applications: []
  },
  {
    prof_name: "Dr. Sarah Liu",
    title: "Natural Language Processing Assistant",
    description:
      "Assist in research on NLP for improving sentiment analysis in social media content.",
    isActive: true,
    createdAt: "2023-09-25T12:12:45.789Z",
    updatedAt: "2023-09-30T15:30:12.456Z",
    tags: ["NLP", "Sentiment Analysis", "AI"],
    type: "Part-time",
    stipend: 1800,
    hours_required: 20,
    total_applicants: 28,
    accepting: true,
    last_date: 1727155200,
    applications: []
  },
  {
    prof_name: "Prof. Michael Harris",
    title: "Quantum Computing Research Assistant",
    description: "Conduct experiments and simulations on quantum algorithms for cryptography.",
    isActive: false,
    createdAt: "2023-07-10T11:30:00.654Z",
    updatedAt: "2023-08-15T09:45:12.123Z",
    tags: ["Quantum Computing", "Cryptography", "Research"],
    type: "Full-time",
    stipend: 4000,
    hours_required: 40,
    total_applicants: 18,
    accepting: false,
    last_date: 1725571200,
    applications: []
  },
  {
    prof_name: "Dr. Olivia White",
    title: "Robotics Research Intern",
    description:
      "Work on developing robotic systems for autonomous navigation and object manipulation.",
    isActive: true,
    createdAt: "2023-06-28T13:55:32.987Z",
    updatedAt: "2023-09-20T14:22:10.789Z",
    tags: ["Robotics", "Autonomy", "Mechanical Engineering"],
    type: "Internship",
    stipend: 2800,
    hours_required: 30,
    total_applicants: 50,
    accepting: true,
    last_date: 1726790400,
    applications: []
  },
  {
    prof_name: "Dr. Liam Scott",
    title: "Bioinformatics Research Assistant",
    description: "Assist in genomic data analysis for cancer research using bioinformatics tools.",
    isActive: false,
    createdAt: "2023-07-15T12:10:22.654Z",
    updatedAt: "2023-08-20T14:30:45.987Z",
    tags: ["Bioinformatics", "Genomics", "Cancer Research"],
    type: "Full-time",
    stipend: 3500,
    hours_required: 40,
    total_applicants: 40,
    accepting: false,
    last_date: 1723584000,
    applications: []
  },
  {
    prof_name: "Dr. Emma Johnson",
    title: "Human-Computer Interaction Research Assistant",
    description:
      "Conduct user experience testing and design interactive systems for enhancing user engagement.",
    isActive: true,
    createdAt: "2023-09-10T15:30:22.987Z",
    updatedAt: "2023-09-18T16:40:32.456Z",
    tags: ["HCI", "User Experience", "UI/UX"],
    type: "Part-time",
    stipend: 2200,
    hours_required: 20,
    total_applicants: 25,
    accepting: true,
    last_date: 1727318400,
    applications: []
  },
  {
    prof_name: "Dr. David Thompson",
    title: "Cybersecurity Research Assistant",
    description:
      "Assist in cybersecurity research projects focused on developing secure systems for IoT devices.",
    isActive: true,
    createdAt: "2023-08-22T10:20:45.123Z",
    updatedAt: "2023-09-05T13:50:12.654Z",
    tags: ["Cybersecurity", "IoT", "Research"],
    type: "Internship",
    stipend: 2600,
    hours_required: 25,
    total_applicants: 33,
    accepting: true,
    last_date: 1727155200,
    applications: []
  },
  {
    prof_name: "Prof. Nathan Collins",
    title: "Artificial Intelligence Teaching Assistant",
    description:
      "Support AI courses by helping students with programming assignments and holding office hours.",
    isActive: true,
    createdAt: "2023-09-17T09:45:12.456Z",
    updatedAt: "2023-09-30T11:10:34.789Z",
    tags: ["AI", "Teaching", "Python"],
    type: "Part-time",
    stipend: 2400,
    hours_required: 20,
    total_applicants: 42,
    accepting: true,
    last_date: 1727395200,
    applications: []
  },
  {
    prof_name: "Dr. Grace Miller",
    title: "Healthcare Data Analytics Research Assistant",
    description:
      "Analyze large-scale healthcare datasets for identifying trends and improving patient outcomes.",
    isActive: false,
    createdAt: "2023-06-30T14:50:22.123Z",
    updatedAt: "2023-08-25T15:40:12.789Z",
    tags: ["Healthcare", "Data Analytics", "Python"],
    type: "Full-time",
    stipend: 3200,
    hours_required: 40,
    total_applicants: 38,
    accepting: false,
    last_date: 1723670400,
    applications: []
  }
];

const Active_recruiters = Professors.filter((recruiter) => recruiter.isActive).length;
const Active_jobs = Jobs.filter((job) => job.isActive).length;

export default function Dashboard(){
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Recruiters" value={Active_recruiters} />
        </Col>
        <Col span={12}>
          <Statistic title="Available Jobs" value={Active_jobs} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Students ist" bordered={false}>
            {Students.map((student, i) => (
              <p key={i}>{student.name}</p>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Professors List" bordered={false}>
            {Professors.map((Professor, i) => (
              <p key={i}>{Professor.name}</p>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Jobs List" bordered={false}>
            {Jobs.map((Job, i) => (
              <p key={i}>{Job.title}</p>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const Students = [
  {
    name: "John Doe",
    email: "johndoe1@gmail.com",
    phoneNumber: 9876543210,
    rollNo: 101,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Male",
    course: "BTech",
    department: "Computer Science",
    cpi: 8.5,
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe1"
      }
    ],
    dob: "2001-01-15",
    yearOfGrad: 2024,
    resume: "",
    interest: [
      {
        field: "Artificial Intelligence"
      }
    ],
    prevEducation: [
      {
        degree: "High School",
        year: 2018,
        college: "XYZ School",
        grade: "A+"
      }
    ],
    bio: "Computer science student passionate about AI.",
    prevExperience: [
      {
        role: "Intern",
        company_college: "ABC Corp",
        description: "Worked on machine learning models.",
        start_date: "2022-06-01",
        end_date: "2022-08-01"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  },
  {
    name: "Jane Smith",
    email: "janesmith2@gmail.com",
    phoneNumber: 9876543211,
    rollNo: 102,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Female",
    course: "MTech",
    department: "Electrical and Electronics Engineering",
    cpi: 9.0,
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/janesmith2"
      }
    ],
    dob: "1999-07-10",
    yearOfGrad: 2023,
    resume: "",
    interest: [
      {
        field: "Embedded Systems"
      }
    ],
    prevEducation: [
      {
        degree: "BTech",
        year: 2021,
        college: "XYZ Engineering College",
        grade: "A"
      }
    ],
    bio: "MTech student specializing in Embedded Systems.",
    prevExperience: [
      {
        role: "Research Intern",
        company_college: "DEF University",
        description: "Worked on IoT devices.",
        start_date: "2021-06-01",
        end_date: "2021-09-01"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson3@gmail.com",
    phoneNumber: 9876543212,
    rollNo: 103,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Female",
    course: "PhD",
    department: "Physics",
    cpi: 9.5,
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/alicejohnson3"
      }
    ],
    dob: "1998-05-22",
    yearOfGrad: 2025,
    resume: "",
    interest: [
      {
        field: "Quantum Physics"
      }
    ],
    prevEducation: [
      {
        degree: "MSc",
        year: 2020,
        college: "XYZ University",
        grade: "A+"
      }
    ],
    bio: "Researching quantum mechanics for PhD.",
    prevExperience: [
      {
        role: "Teaching Assistant",
        company_college: "IIT Guwahati",
        description: "Assisted in undergraduate physics courses.",
        start_date: "2022-08-01",
        end_date: "2023-05-01"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  },
  {
    name: "Mark Thompson",
    email: "markthompson4@gmail.com",
    phoneNumber: 9876543213,
    rollNo: 104,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Male",
    course: "BTech",
    department: "Mechanical Engineering",
    cpi: 8.2,
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/markthompson4"
      }
    ],
    dob: "2001-03-10",
    yearOfGrad: 2024,
    resume: "",
    interest: [
      {
        field: "Robotics"
      }
    ],
    prevEducation: [
      {
        degree: "High School",
        year: 2018,
        college: "XYZ School",
        grade: "A"
      }
    ],
    bio: "Enthusiast in robotics and mechanical systems.",
    prevExperience: [
      {
        role: "Intern",
        company_college: "XYZ Robotics",
        description: "Developed robotic systems.",
        start_date: "2022-06-01",
        end_date: "2022-09-01"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  },
  {
    name: "Emma White",
    email: "emmawhite5@gmail.com",
    phoneNumber: 9876543214,
    rollNo: 105,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Female",
    course: "MBA",
    department: "Mehta School of Data Science",
    cpi: 9.1,
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/emmawhite5"
      }
    ],
    dob: "1997-08-01",
    yearOfGrad: 2023,
    resume: "",
    interest: [
      {
        field: "Business Analytics"
      }
    ],
    prevEducation: [
      {
        degree: "BBA",
        year: 2019,
        college: "XYZ Business School",
        grade: "A"
      }
    ],
    bio: "Pursuing MBA with a focus on business analytics.",
    prevExperience: [
      {
        role: "Data Analyst",
        company_college: "XYZ Corp",
        description: "Analyzed business data for insights.",
        start_date: "2020-06-01",
        end_date: "2022-06-01"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  },
  {
    name: "David Brown",
    email: "davidbrown6@gmail.com",
    phoneNumber: 9876543215,
    rollNo: 106,
    college: "Indian Institution of Technology, Guwahati",
    gender: "Male",
    course: "BDes",
    department: "Design",
    cpi: 8.7,
    social: [
      {
        platform: "Behance",
        url: "https://behance.net/davidbrown6"
      }
    ],
    dob: "2000-12-12",
    yearOfGrad: 2024,
    resume: "",
    interest: [
      {
        field: "Product Design"
      }
    ],
    prevEducation: [
      {
        degree: "High School",
        year: 2018,
        college: "XYZ School",
        grade: "A"
      }
    ],
    bio: "Passionate about user-centered design.",
    prevExperience: [
      {
        role: "Design Intern",
        company_college: "Creative Solutions",
        description: "Worked on designing user interfaces.",
        start_date: "2022-07-01",
        end_date: "2022-09-30"
      }
    ],
    createdAt: "2021-01-01",
    updatedAt: "2023-01-01"
  }
];
