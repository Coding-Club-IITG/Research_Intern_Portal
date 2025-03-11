import axios from "axios";
import { backendURL } from "./server";

export const getRecruiter = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/recruiters/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getAllRecruiters = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/recruiters`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const updateRecruiter = async (id, data) => {
  try {
    const response = await axios.put(`${backendURL}/api/v1/recruiters/${id}`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteRecruiter = async () => {
  try {
    const response = await axios.delete(`${backendURL}/api/v1/recruiters`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const createJob = async (data) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/job`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllJobs = async (navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getJobsOfRecruiter = async (recruiter_id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/recruiter/${recruiter_id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getJobById = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/${id}`, {
      withCredentials: true
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const updateJob = async (id, data) => {
  try {
    const response = await axios.put(`${backendURL}/api/v1/job/${id}`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const stopAcceptingApplications = async (id) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/stop/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllStudentsOfJob = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/job/students/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const getStudentById = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/recruiters/student-data/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const selectStudent = async (data, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/recruiters/accept-student`, {
      data,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const rejectStudent = async (data, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/recruiters/reject-student`, {
      data,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
