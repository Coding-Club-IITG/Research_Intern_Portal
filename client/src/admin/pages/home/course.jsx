import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { backendURL } from "../../../apis/server";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [newcourse, setNewCourse] = useState("");
  const [editcourseId, setEditCourseId] = useState(null);
  const [updatedcourseName, setUpdatedCourseName] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch(`${backendURL}/api/v1/admin/departments/course`);

  useEffect(() => {
    if (data && data.status === "success") {
      setCourses(data.data);
      console.log(data.data);
    }
  }, [data]);

  const createCourse = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/v1/admin/departments/course1`, {
        name: newcourse
      }, {
        withCredentials: true
      });
      if (response.data.status === "success") {
        setCourses([...courses, response.data.data]);
        setNewCourse("");
      }
    } catch (error) {
      console.error("Error creating course", error);
      navigate("/500");
    }
  };

  const updateCourse = async (courseId) => {
    try {
      const response = await axios.put(
        `${backendURL}/api/v1/admin/departments/course/${courseId}`,
        {
          name: updatedcourseName
        }, {
        withCredentials: true
        }
      );
      if (response.data.status === "success") {
        const updatedcourses = courses.map((course) =>
          course._id === courseId ? { ...course, name: updatedcourseName } : course
        );
        setCourses(updatedcourses);
        setEditCourseId(null);
        setUpdatedCourseName("");
      }
    } catch (error) {
      console.error("Error updating course", error);
      navigate("/500");
    }
  };

  if (loading) return <Spin />;

  return (
    <div className="p-6 bg-white rounded-lg">
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={true} title="course Manager">
            <div className="mb-6">
              <input
                type="text"
                value={newcourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="New course Name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={createCourse}
                className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                Create course
              </button>
            </div>

            {courses && courses.length === 0 ? (
              <p className="text-gray-500">No courses found</p>
            ) : (
              <ul className="space-y-4">
                {courses.map((course) => (
                  <li
                    key={course._id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition">
                    {editcourseId === course._id ? (
                      <>
                        <input
                          type="text"
                          value={updatedcourseName}
                          onChange={(e) => setUpdatedCourseName(e.target.value)}
                          placeholder="Update course Name"
                          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                          onClick={() => updateCourse(course._id)}
                          className="ml-4 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-700 font-medium">{course.name}</span>
                        <button
                          onClick={() => {
                            setEditCourseId(course._id);
                            setUpdatedCourseName(course.name);
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
