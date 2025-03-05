import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [updatedDepartmentName, setUpdatedDepartmentName] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch("http://localhost:8000/api/v1/admin/departments/department");

  useEffect(() => {
    if (data && data.status === "success") {
      setDepartments(data.data);
      console.log(data.data);
    }
  }, [data]);

  const createDepartment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/departments/department",
        {
          name: newDepartment
        }, {
          withCredentials: true
        }
      );
      if (response.data.status === "success") {
        setDepartments([...departments, response.data.data]);
        setNewDepartment("");
      }
    } catch (error) {
      console.error("Error creating department", error);
      navigate("/500");
    }
  };

  const updateDepartment = async (departmentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/admin/departments/department/${departmentId}`,
        {
          name: updatedDepartmentName
        }, {
        withCredentials: true
        }
      );
      if (response.data.status === "success") {
        const updatedDepartments = departments.map((department) =>
          department._id === departmentId
            ? { ...department, name: updatedDepartmentName }
            : department
        );
        setDepartments(updatedDepartments);
        setEditDepartmentId(null);
        setUpdatedDepartmentName("");
      }
    } catch (error) {
      console.error("Error updating department", error);
      navigate("/500");
    }
  };

  if (loading) return <Spin />;

  return (
    <div className="p-6 bg-white rounded-lg">
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={true} title="Department Manager">
            <div className="mb-6">
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="New Department Name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={createDepartment}
                className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                Create Department
              </button>
            </div>

            {departments && departments.length === 0 ? (
              <p className="text-gray-500">No departments found</p>
            ) : (
              <ul className="space-y-4">
                {departments.map((department) => (
                  <li
                    key={department._id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition">
                    {editDepartmentId === department._id ? (
                      <>
                        <input
                          type="text"
                          value={updatedDepartmentName}
                          onChange={(e) => setUpdatedDepartmentName(e.target.value)}
                          placeholder="Update Department Name"
                          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                          onClick={() => updateDepartment(department._id)}
                          className="ml-4 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-700 font-medium">{department.name}</span>
                        <button
                          onClick={() => {
                            setEditDepartmentId(department._id);
                            setUpdatedDepartmentName(department.name);
                          }}
                          className="ml-4 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
