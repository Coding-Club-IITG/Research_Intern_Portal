import React from 'react';
import { Button, Flex } from 'antd';
import { Card, Col, Row } from 'antd';

const Students = [
    {
      "name": "John Doe",
      "email": "johndoe1@gmail.com",
      "phoneNumber": 9876543210,
      "rollNo": 101,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Male",
      "course": "BTech",
      "department": "Computer Science",
      "cpi": 8.5,
      "social": [
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com/in/johndoe1"
        }
      ],
      "dob": "2001-01-15",
      "yearOfGrad": 2024,
      "resume": "",
      "interest": [
        {
          "field": "Artificial Intelligence"
        }
      ],
      "prevEducation": [
        {
          "degree": "High School",
          "year": 2018,
          "college": "XYZ School",
          "grade": "A+"
        }
      ],
      "bio": "Computer science student passionate about AI.",
      "prevExperience": [
        {
          "role": "Intern",
          "company_college": "ABC Corp",
          "description": "Worked on machine learning models.",
          "start_date": "2022-06-01",
          "end_date": "2022-08-01"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    },
    {
      "name": "Jane Smith",
      "email": "janesmith2@gmail.com",
      "phoneNumber": 9876543211,
      "rollNo": 102,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Female",
      "course": "MTech",
      "department": "Electrical and Electronics Engineering",
      "cpi": 9.0,
      "social": [
        {
          "platform": "GitHub",
          "url": "https://github.com/janesmith2"
        }
      ],
      "dob": "1999-07-10",
      "yearOfGrad": 2023,
      "resume": "",
      "interest": [
        {
          "field": "Embedded Systems"
        }
      ],
      "prevEducation": [
        {
          "degree": "BTech",
          "year": 2021,
          "college": "XYZ Engineering College",
          "grade": "A"
        }
      ],
      "bio": "MTech student specializing in Embedded Systems.",
      "prevExperience": [
        {
          "role": "Research Intern",
          "company_college": "DEF University",
          "description": "Worked on IoT devices.",
          "start_date": "2021-06-01",
          "end_date": "2021-09-01"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    },
    {
      "name": "Alice Johnson",
      "email": "alicejohnson3@gmail.com",
      "phoneNumber": 9876543212,
      "rollNo": 103,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Female",
      "course": "PhD",
      "department": "Physics",
      "cpi": 9.5,
      "social": [
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com/in/alicejohnson3"
        }
      ],
      "dob": "1998-05-22",
      "yearOfGrad": 2025,
      "resume": "",
      "interest": [
        {
          "field": "Quantum Physics"
        }
      ],
      "prevEducation": [
        {
          "degree": "MSc",
          "year": 2020,
          "college": "XYZ University",
          "grade": "A+"
        }
      ],
      "bio": "Researching quantum mechanics for PhD.",
      "prevExperience": [
        {
          "role": "Teaching Assistant",
          "company_college": "IIT Guwahati",
          "description": "Assisted in undergraduate physics courses.",
          "start_date": "2022-08-01",
          "end_date": "2023-05-01"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    },
    {
      "name": "Mark Thompson",
      "email": "markthompson4@gmail.com",
      "phoneNumber": 9876543213,
      "rollNo": 104,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Male",
      "course": "BTech",
      "department": "Mechanical Engineering",
      "cpi": 8.2,
      "social": [
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com/in/markthompson4"
        }
      ],
      "dob": "2001-03-10",
      "yearOfGrad": 2024,
      "resume": "",
      "interest": [
        {
          "field": "Robotics"
        }
      ],
      "prevEducation": [
        {
          "degree": "High School",
          "year": 2018,
          "college": "XYZ School",
          "grade": "A"
        }
      ],
      "bio": "Enthusiast in robotics and mechanical systems.",
      "prevExperience": [
        {
          "role": "Intern",
          "company_college": "XYZ Robotics",
          "description": "Developed robotic systems.",
          "start_date": "2022-06-01",
          "end_date": "2022-09-01"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    },
    {
      "name": "Emma White",
      "email": "emmawhite5@gmail.com",
      "phoneNumber": 9876543214,
      "rollNo": 105,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Female",
      "course": "MBA",
      "department": "Mehta School of Data Science",
      "cpi": 9.1,
      "social": [
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com/in/emmawhite5"
        }
      ],
      "dob": "1997-08-01",
      "yearOfGrad": 2023,
      "resume": "",
      "interest": [
        {
          "field": "Business Analytics"
        }
      ],
      "prevEducation": [
        {
          "degree": "BBA",
          "year": 2019,
          "college": "XYZ Business School",
          "grade": "A"
        }
      ],
      "bio": "Pursuing MBA with a focus on business analytics.",
      "prevExperience": [
        {
          "role": "Data Analyst",
          "company_college": "XYZ Corp",
          "description": "Analyzed business data for insights.",
          "start_date": "2020-06-01",
          "end_date": "2022-06-01"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    },
    {
      "name": "David Brown",
      "email": "davidbrown6@gmail.com",
      "phoneNumber": 9876543215,
      "rollNo": 106,
      "college": "Indian Institution of Technology, Guwahati",
      "gender": "Male",
      "course": "BDes",
      "department": "Design",
      "cpi": 8.7,
      "social": [
        {
          "platform": "Behance",
          "url": "https://behance.net/davidbrown6"
        }
      ],
      "dob": "2000-12-12",
      "yearOfGrad": 2024,
      "resume": "",
      "interest": [
        {
          "field": "Product Design"
        }
      ],
      "prevEducation": [
        {
          "degree": "High School",
          "year": 2018,
          "college": "XYZ School",
          "grade": "A"
        }
      ],
      "bio": "Passionate about user-centered design.",
      "prevExperience": [
        {
          "role": "Design Intern",
          "company_college": "Creative Solutions",
          "description": "Worked on designing user interfaces.",
          "start_date": "2022-07-01",
          "end_date": "2022-09-30"
        }
      ],
      "createdAt": "2021-01-01",
      "updatedAt": "2023-01-01"
    }]










const App = () => {

return (
    <div>
    {Students.
    map((Student,i)=>(

    <Row  gutter={16} key={i}>
    <Col  span={16}>
      <Card key = {i} title={Student.name} bordered={true}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{padding:"0px 10px"}}>
        <p><li style={{color:"#0000FF"}}>Email : </li> {Student.email}</p>
        <p><li style={{color:"#0000FF"}}>PhoneNumber : </li>{Student.phoneNumber}</p>
        <p><li style={{color:"#0000FF"}}>RollNumber : </li>{Student.rollNo}</p>
        <p><li style={{color:"#0000FF"}}>College : </li>{Student.college}</p>
        <p><li style={{color:"#0000FF"}}>Gender : </li>{Student.gender}</p>
        </div>
        <div style={{padding:"0px 10px"}}>
        <p><li style={{color:"#0000FF"}}>Course : </li>{Student.course}</p>
        <p><li style={{color:"#0000FF"}}>Department : </li> {Student.department}</p>
        <p><li style={{color:"#0000FF"}}>CPI : </li>{Student.cpi}</p>
        <p><li style={{color:"#0000FF"}}>Date of Birth : </li>{Student.dob}</p>
        <p><li style={{color:"#0000FF"}}>Year of Grad : </li> {Student.yearOfGrad}</p>
        </div>
        <div>
        <Button type="primary">Delete User</Button>
        </div>
        </div>
      </Card>
    </Col>
  </Row>
  ))}
    </div>);


};
export default App;



