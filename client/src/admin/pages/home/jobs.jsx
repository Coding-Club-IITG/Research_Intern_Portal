import { Button} from "antd";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../apis/recruiter";
import { deleteJob } from "../../../apis/job";

export default function JobPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getJobs() {
      const res = await getAllJobs(navigate);
      setJobs(res.data || []);
    }
    getJobs();
  }, [navigate]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    const res = await deleteJob(jobId, navigate);
    if (res.status === "success") {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    }
  };

  const [Jobs, setJobs] = useState([]);

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
                    {Job?.description}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Stipend : </li>
                    {Job?.stipend}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Hours required : </li>
                    {Job?.hours_required}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Total applicants : </li>
                    {Job?.total_applicants}
                  </p>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <p>
                    <li style={{ color: "#0000FF" }}>Job type : </li> {Job.type}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Accepting : </li>
                    {Job?.accepting ? "Yes" : "No"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Status : </li>{" "}
                    {Job?.isActive ? "Active" : "Inactive"}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Last Date : </li>
                    {Job?.last_date}
                  </p>
                  <p>
                    <li style={{ color: "#0000FF" }}>Created at : </li>
                    {Job?.createdAt}
                  </p>
                </div>
                <div>
                  <Button type="primary" onClick={() => handleDelete(Job?._id)}>
                    Delete Job
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
