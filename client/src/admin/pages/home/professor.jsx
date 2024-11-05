import { Button, Flex, message } from "antd";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecruiters } from "../../../apis/recruiter";
import { banRecruiter, removeRecruiter, verifyRecruiter } from "../../../apis/admin";

export default function ProfessorsPage() {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const refreshProfessors = async () => {
    await fetchProfessors();
  };

  const fetchProfessors = async () => {
    const response = await getAllRecruiters(navigate);
    setRecruiters(response.data);
  };

  const handleVerify = async (id) => {
    const res = await verifyRecruiter(id, navigate);
    if(res.status === "success"){
        message.success({ content: res.message});
    }else{
      message.error({ content: res.message})
    }
  };

  const handleBan = async (id) => {
      const res = await banRecruiter(id, navigate);
      console.log(res);

      if(res.status == "success"){
        message.success({ content: res.message });
      }else{
        message.error({ content: res.message })
      }
  };


  return (
    <div>
      {recruiters.map((recruiter, i) => (
        <Row gutter={16} key={i}>
          <Col span={16}>
            <Card key={i} title={recruiter.name} bordered={true}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>University : </li>
                    {recruiter?.university}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Email : </li>
                    {recruiter?.email}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Phone Number : </li>
                    {recruiter?.phoneNumber}
                  </p>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Status : </li>{" "}
                    {recruiter?.isActive ? "Active" : "Inactive"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Rating : </li>
                    {recruiter?.rating}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Verified : </li>{" "}
                    {recruiter.isVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Created at : </li>
                    {new Date(recruiter?.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Updated at : </li>
                    {recruiter?.updatedAt}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button style={{ margin: "10px" }} type="primary" onClick={() => handleVerify(recruiter._id)}>
                    Verify Recruiter
                  </Button>
                  <Button style={{ margin: "10px" }} type="primary" onClick={() => handleBan(recruiter._id)}>
                    Ban Recruiter
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
