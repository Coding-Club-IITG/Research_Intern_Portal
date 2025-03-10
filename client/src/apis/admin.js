import axios from "axios";
import { backendURL } from "./server";

export const verifyRecruiter = async (id, navigate) => {
  try {
    const response = await axios.post(
      `${backendURL}/api/v1/admin/controls/verify-recruiter/${id}`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    //navigate("/500");
    return error?.response?.data || error;
  }
};

export const createBugReport = async (data, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/admin/bugs`, data, {
      withCredentials: true
    });
    return response.message;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

// Ban a recruiter
export const banRecruiter = async (id, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/admin/controls//ban-recruiter/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    //navigate("/500");
    return error?.response?.data || error;
  }
};

// Remove a student
export const removeStudent = async (id, navigate) => {
  try {
    const response = await axios.delete(
      `${backendURL}/api/v1/admin/controls/remove-student/${id}`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getAllBugReports = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/bugs`, {
      withCredentials: true
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
