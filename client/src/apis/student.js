import axios from "axios";
import { backendURL } from "./server";

export const getStudent = async (id, navigate) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/students/${id}`);
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};

export const updateStudent = async (id, data) => {
  try {
    console.log(1);
    console.log(data);
    const response = await axios.put(`${backendURL}/api/v1/students/${id}`, data);

    return response.data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
