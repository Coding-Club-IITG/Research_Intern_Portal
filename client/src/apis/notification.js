import axios from "axios";
import { notificationURL } from "./server";

export const getNewNotifications = async (id, lastChecked, navigate) => {
  try {
    const response = await axios.get(`${notificationURL}/api/v1/notifications/get/${id}`, {
      params: { lastChecked }
    });
    return response.data;
  } catch (error) {
    navigate("/500");
    return error?.response?.data || error;
  }
};
