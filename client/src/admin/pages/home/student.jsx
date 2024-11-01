import React, { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { Card, Col, Row } from "antd";
import { removeStudent } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import { getAllStudents, getStudent } from "../../../apis/students";

export default function StudentPage() {
  const [Students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const refreshStudents = async () => {
    console.log(11);
    await fetchStudents();
  };

  const fetchStudents = async () => {
    const response = await getAllStudents(navigate);
    setStudents(response.data);
    console.log(response.data);
  };

  const handleRemove = async (id) => {
    try {
      const response = await removeStudent(id, navigate);
      // const response = await getStudent(id, navigate);
      console.log(response);
      refreshStudents();
    } catch (error) {
      navigate("/500");
      console.error("Remove failed:", error);
    }
  };

  return (
    <div>
      {Students.map((Student, i) => (
        <Row gutter={16} key={i}>
          <Col span={16}>
            <Card key={i} title={Student.name} bordered={true}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Email : </li> {Student.email}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>PhoneNumber : </li>
                    {Student.phoneNumber}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>RollNumber : </li>
                    {Student.rollNo}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>College : </li>
                    {Student.college}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Gender : </li>
                    {Student.gender}
                  </p>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Course : </li>
                    {Student.course}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Department : </li> {Student.department}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>CPI : </li>
                    {Student.cpi}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Date of Birth : </li>
                    {Student.dob}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Year of Grad : </li> {Student.yearOfGrad}
                  </p>
                </div>
                <div>
                  <Button type="primary" onClick={() => handleRemove(Student._id)}>
                    Delete User
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
