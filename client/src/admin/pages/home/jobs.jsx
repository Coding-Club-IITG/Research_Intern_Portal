import { Button, Flex } from "antd";
import { Card, Col, Row } from "antd";

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

export default function JobPage() {
  return (
    <div>
      {Jobs.map((Job, i) => (
        <Row gutter={16} key={i}>
          <Col span={16}>
            <Card key={i} title={Job.title} bordered={true}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Professor Name : </li> {Job.prof_name}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Job description : </li>
                    {Job.description}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Stipend : </li>
                    {Job.stipend}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Hours required : </li>
                    {Job.hours_required}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Total applicants : </li>
                    {Job.total_applicants}
                  </p>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Job type : </li> {Job.type}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Accepting : </li>
                    {Job.accepting ? "Yes" : "No"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Status : </li>{" "}
                    {Job.isActive ? "Active" : "Inactive"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Last Date : </li>
                    {Job.last_date}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Created at : </li>
                    {Job.createdAt}
                  </p>
                </div>
                <div>
                  <Button type="primary">Delete Job</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
)};

