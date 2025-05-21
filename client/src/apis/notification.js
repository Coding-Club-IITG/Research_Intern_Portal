import axios from "axios";
import { notificationURL } from "./server";

export const getAllNotificationsOfUser = async (id, navigate) => {
  try {
    console.log("Fetching all notifications");
    const response = await axios.get(`${notificationURL}/api/v1/notifications/get/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const getNewNotifications = async (id, lastChecked, navigate) => {
  try {
    const response = await axios.get(`${notificationURL}/api/v1/notifications/get-new/${id}`, {
      params: { lastChecked }
    });
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const createNotificationForStudents = async (data, navigate) => {
  try {
    const response = await axios.post(
      `${notificationURL}/api/v1/notifications/create-students`,
      data
    );
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const createNotificationForRecruiters = async (data, navigate) => {
  try {
    const response = await axios.post(
      `${notificationURL}/api/v1/notifications/create-recruiters`,
      data
    );
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const createNotificationForAll = async (data, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/notifications/create`, data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const createNotificationForSpecificUsers = async (data, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/notifications/createOne`, data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const deleteNotification = async (id, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/notifications/delete/${id}`);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const markAsRead = async (id, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/notifications/mark-as-read/${id}`);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const markAsUnread = async (id, navigate) => {
  try {
    const response = await axios.post(
      `${notificationURL}/api/v1/notifications/mark-as-unread/${id}`
    );
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const verifyEmail = async (data, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/email/verify-email`, data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};

export const sendEmail = async (data, navigate) => {
  try {
    const response = await axios.post(`${notificationURL}/api/v1/email/send-email`, data);
    return response.data;
  } catch (error) {
    // navigate("/500");
    return error?.response?.data || error;
  }
};
