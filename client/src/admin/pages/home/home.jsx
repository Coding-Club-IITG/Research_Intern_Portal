import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { getAllJobs, getAllRecruiters } from "../../../apis/recruiter";
import { getAllStudents } from "../../../apis/student";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [Professors, setProfessors] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const [Students, setStudents] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await getAllRecruiters(navigate);
      setProfessors(response.data);
    };
    fetchProfessors();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getAllStudents(navigate);
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getAllJobs(navigate);
      setJobs(response.data);
    };
    fetchJobs();
  }, []);

  const Active_recruiters = Professors.filter((recruiter) => recruiter.isActive).length;
  const Active_jobs = Jobs.filter((job) => job.isActive).length;

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
  );
}
