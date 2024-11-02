import axios from "axios";
import { backendURL } from "./server";

export const getStudent = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/students/${id}`);
    return response.data.data._id;
  } catch (error) {
    //navigate("/500");
    return error?.response?.data || error;
  }
};

export const getStudentsApplicationById = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/students/${id}/intern-applied`);
    const applicationlist = response.data.data;
    return applicationlist;
  } catch (error) {
    //navigate("/500");
    return error?.response?.data || error;
  }
};
