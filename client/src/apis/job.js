import axios from "axios";
import { backendURL } from "./server";

export const deleteJob = async (id, navigate) => {
  try {
    const response = await axios.delete(`${backendURL}/api/v1/job/delete-job/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (navigate) navigate("/500");
    return error?.response?.data || error;
  }
};
export const getAllJobs = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/internship/accepting`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getAllAcceptingJobs = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/internship/accepting`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const stopAcceptingJob = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/stop/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const reopenApplications = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/reopen/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
