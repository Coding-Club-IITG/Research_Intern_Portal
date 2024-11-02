import { Button, Flex } from "antd";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecruiters } from "../../../apis/recruiter";
import { banRecruiter, removeRecruiter, verifyRecruiter } from "../../../apis/admin";

export default function ProfessorsPage() {
  const navigate = useNavigate();
  const [Professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const refreshProfessors = async () => {
    await fetchProfessors();
  };

  const fetchProfessors = async () => {
    const response = await getAllRecruiters(navigate);
    setProfessors(response.data);
  };

  const handleVerify = async (id) => {
    try {
      await verifyRecruiter(id, navigate);
      alert("Recruiter verified successfully.");
      refreshProfessors();
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleBan = async (id) => {
    try {
      await banRecruiter(id, navigate);
      alert("Recruiter banned successfully.");
      refreshProfessors();
    } catch (error) {
      console.error("Ban failed:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeRecruiter(id, navigate);
      alert("Recruiter removed successfully.");
      refreshProfessors();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  return (
    <div>
      {Professors.map((Prof, i) => (
        <Row gutter={16} key={i}>
          <Col span={16}>
            <Card key={i} title={Prof.name} bordered={true}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Qualifications : </li>{" "}
                    {Prof.qualifications.map((qualification, i) => (
                      <li key={i}>
                        {qualification.degree} in {qualification.year} at {qualification.college}
                      </li>
                    ))}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Area of Intrest : </li>
                    {Prof.areaOfInterest}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>University : </li>
                    {Prof.university}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Email : </li>
                    {Prof.email}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Phone Number : </li>
                    {Prof.phoneNumber}
                  </p>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Status : </li>{" "}
                    {Prof.isActive ? "Active" : "Inactive"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Rating : </li>
                    {Prof.rating}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Verified : </li>{" "}
                    {Prof.isVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Created at : </li>
                    {Prof.createdAt}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Updated at : </li>
                    {Prof.updatedAt}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button style={{ margin: "10px" }} type="primary" onClick={handleVerify}>
                    Verify Recruiter
                  </Button>
                  <Button style={{ margin: "10px" }} type="primary" onClick={handleBan}>
                    Ban Recruiter
                  </Button>
                  <Button style={{ margin: "10px" }} type="primary" onClick={handleRemove}>
                    Remove Recruiter
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
}
