import axios from "axios";
import { backendURL } from "./server";

export const getAllDepartments = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/departments/department`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getDepartmentById = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/departments/department/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getAllCourses = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/departments/course`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getCourseById = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/departments/course/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
