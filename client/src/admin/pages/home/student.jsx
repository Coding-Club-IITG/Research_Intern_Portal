import React from "react";
import { Flex, Tabs } from "antd";
import { Link, useParams, Outlet } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Jobscontent from "./components/Jobscontent.jsx";
import Professorcontent from "./components/Professorcontent.jsx";
import Studentcontent from "./components/Studentcontent.jsx";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "0",
    children: <Dashboard />,
    label: <Link to="/admin">Dash Board</Link>
  },
  {
    key: "1",
    children: <Professorcontent />,
    label: <Link to="/admin/professor">Professor Details</Link>
  },
  {
    key: "2",
    label: <Link to="/admin/student">Student Details</Link>,
    children: <Studentcontent />
  },
  {
    key: "3",
    label: <Link to="/admin/jobs">Job Details</Link>,
    children: <Jobscontent />
  }
];
const Student = () => (
  <Tabs style={{ marginLeft: "30px" }} defaultActiveKey="2" items={items} onChange={onChange} />
);
export default Student;
