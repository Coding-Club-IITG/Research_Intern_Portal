
import { Button, Flex } from 'antd';
import { Card, Col, Row } from 'antd';

const Professors = 
  [
    {
      "name": "John Doe",
      "areaOfInterest": ["Artificial Intelligence", "Machine Learning", "Data Science"],
      "university": "MIT",
      "email": "john.doe@mit.edu",
      "socialMedia": {
        "linkedIn": "https://www.linkedin.com/in/johndoe",
        "twitter": "https://twitter.com/johndoe"
      },
      "phoneNumber": 1234567890,
      "isActive": true,
      "createdAt": "2023-09-01T10:15:30.789Z",
      "updatedAt": "2023-09-10T12:15:30.789Z",
      "rating": 4.5,
      "qualifications": [
        {
          "degree": "PhD in Artificial Intelligence",
          "year": 2015,
          "college": "Stanford University",
          "commnets": "Focused on reinforcement learning"
        },
        {
          "degree": "MSc in Computer Science",
          "year": 2012,
          "college": "Stanford University",
          "commnets": "Specialized in AI"
        }
      ],
      "isVerified": true,
      "jobs": []
    },
    {
      "name": "Jane Smith",
      "areaOfInterest": ["Blockchain", "Cryptography", "Cybersecurity"],
      "university": "Harvard",
      "email": "jane.smith@harvard.edu",
      "socialMedia": {
        "linkedIn": "https://www.linkedin.com/in/janesmith",
        "twitter": "https://twitter.com/janesmith"
      },
      "phoneNumber": 9876543210,
      "isActive": false,
      "createdAt": "2023-06-12T11:30:22.456Z",
      "updatedAt": "2023-07-10T09:15:10.123Z",
      "rating": 5,
      "qualifications": [
        {
          "degree": "PhD in Cryptography",
          "year": 2017,
          "college": "Harvard University",
          "commnets": "Researched secure encryption algorithms"
        },
        {
          "degree": "MSc in Cybersecurity",
          "year": 2014,
          "college": "Harvard University",
          "commnets": "Focus on ethical hacking"
        }
      ],
      "isVerified": true,
      "jobs": ["650aebc1c1f92e987b3e40d9"]
    },
    {
      "name": "Mark Johnson",
      "areaOfInterest": ["Data Analytics", "Business Intelligence"],
      "university": "UC Berkeley",
      "email": "mark.johnson@berkeley.edu",
      "socialMedia": {
        "linkedIn": "https://www.linkedin.com/in/markjohnson",
        "twitter": "https://twitter.com/markjohnson"
      },
      "phoneNumber": 5551234567,
      "isActive": true,
      "createdAt": "2023-08-22T14:45:32.789Z",
      "updatedAt": "2023-09-15T13:22:45.654Z",
      "rating": 4.8,
      "qualifications": [
        {
          "degree": "MBA",
          "year": 2019,
          "college": "UC Berkeley",
          "commnets": "Specialized in data-driven decision making"
        }
      ],
      "isVerified": false,
      "jobs": ["650aebc1c1f92e987b3e40d8", "650aebc1c1f92e987b3e40da"]
    },
    {
      "name": "Sarah Lee",
      "areaOfInterest": ["Healthcare Technology", "AI in Medicine"],
      "university": "Johns Hopkins University",
      "email": "sarah.lee@jhu.edu",
      "socialMedia": {
        "linkedIn": "https://www.linkedin.com/in/sarahlee",
        "twitter": ""
      },
      "phoneNumber": 7894561230,
      "isActive": true,
      "createdAt": "2023-05-10T09:30:15.987Z",
      "updatedAt": "2023-08-12T10:20:18.456Z",
      "rating": 4.6,
      "qualifications": [
        {
          "degree": "PhD in Biomedical Engineering",
          "year": 2016,
          "college": "Johns Hopkins University",
          "commnets": "Focus on AI applications in medical imaging"
        }
      ],
      "isVerified": true,
      "jobs": []
    },
    {
      "name": "Michael Anderson",
      "areaOfInterest": ["Quantum Computing", "Physics"],
      "university": "University of Cambridge",
      "email": "michael.anderson@cam.ac.uk",
      "socialMedia": {
        "linkedIn": "https://www.linkedin.com/in/michaelanderson",
        "twitter": ""
      },
      "phoneNumber": 8765432109,
      "isActive": false,
      "createdAt": "2023-02-15T14:22:12.345Z",
      "updatedAt": "2023-06-18T09:45:32.654Z",
      "rating": 5,
      "qualifications": [
        {
          "degree": "PhD in Quantum Physics",
          "year": 2012,
          "college": "University of Cambridge",
          "commnets": "Focused on quantum algorithms"
        }
      ],
      "isVerified": false,
      "jobs": ["650aebc1c1f92e987b3e40db"]
    }
  ]
  

const Professorcontent= ()=> {

  return (
    <div>
    {Professors.
    map((Prof,i)=>(

    <Row  gutter={16} key={i}>
    <Col  span={16}>
      <Card key = {i} title={Prof.name} bordered={true}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{padding:"0px 10px"}}>
        <p><li style={{color:"#0000FF"}}>Qualifications : </li> {Prof.qualifications.map((qualification,i)=>(
          <li key={i}>
            {qualification.degree} in {qualification.year} at {qualification.college }
             
          </li>
         
        ))}</p>
        <p><li style={{color:"#0000FF"}}>Area of Intrest : </li>{Prof.areaOfInterest}</p>
        <p><li style={{color:"#0000FF"}}>University : </li>{Prof.university}</p>
        <p><li style={{color:"#0000FF"}}>Email : </li>{Prof.email}</p>
        <p><li style={{color:"#0000FF"}}>Phone Number : </li>{Prof.phoneNumber}</p>
        </div>
        <div style={{padding:"0px 10px"}}>
        <p><li style={{color:"#0000FF"}}>Status : </li> {(Prof.isActive? "Active":"Inactive")}</p>
        <p><li style={{color:"#0000FF"}}>Rating : </li>{Prof.rating}</p>
        <p><li style={{color:"#0000FF"}}>Verified : </li> {(Prof.isVerified)? "Yes": "No"}</p>
        <p><li style={{color:"#0000FF"}}>Created at : </li>{Prof.createdAt}</p>
        <p><li style={{color:"#0000FF"}}>Updated at : </li>{Prof.updatedAt}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
        <Button style={{margin:"10px"}} type="primary">Verify Recruiter</Button>
        <Button style={{margin:"10px"}} type="primary">Ban Recruiter</Button>
        <Button style={{margin:"10px"}} type="primary">Remove Recruiter</Button>
        </div>
        </div>
      </Card>
    </Col>
  </Row>
  ))}
    </div>);
  }

  export default Professorcontent;