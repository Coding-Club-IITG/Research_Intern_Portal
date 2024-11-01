import axios from "axios";
import { backendURL } from "./server";

// Verify a recruiter
export const verifyRecruiter = async (id, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/admin/controls/verify-recruiter/${id}`);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

// Remove a recruiter
export const removeRecruiter = async (id, navigate) => {
  try {
    const response = await axios.delete(
      `${backendURL}/api/v1/admin/controls//remove-recruiter/${id}`
    );
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

// Ban a recruiter
export const banRecruiter = async (id, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/admin/controls//ban-recruiter/${id}`);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

// Remove a student
export const removeStudent = async (id, navigate) => {
  try {
    const response = await axios.delete(`${backendURL}/api/v1/admin/controls/remove-student/${id}`);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
