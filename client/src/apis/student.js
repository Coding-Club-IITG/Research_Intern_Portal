import axios from "axios";
import { backendURL } from "./server";
import { message } from "antd";

export const getStudent = async (id, navigate) => {
  try {
    console.log("get student", backendURL)
    const response = await axios.get(`${backendURL}/api/v1/students/${id}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const updateStudent = async (id, data) => {
  try {
    console.log(data);
    const response = await axios.put(`${backendURL}/api/v1/students/${id}`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || error;
    
  }
};

export const getAppliedJobsByStudents = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/students/${id}/intern-applied`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const applyToJobs = async (id, internId, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/students/${id}/intern-apply/${internId}`, {
      withCredentials: true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400) {
      message.error("Already Applied");
      return error?.response?.data;
    }
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const getAllStudents = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/students`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};
