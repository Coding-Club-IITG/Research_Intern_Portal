import axios from "axios";
import { backendURL } from "./server";

export const createBugReport = async (data) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/admin/bugs`, data);
    return response.message;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllBugReports = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/admin/bugs`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
