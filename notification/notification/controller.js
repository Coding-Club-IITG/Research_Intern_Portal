import Notification from "./model.js";
import User from "../users/model.js";

const getAllNotificationsOfUser = async (req, res) => {
  try {
    console.log("Fetching all notifications");
    const userId = req.params.id;
    const notifications = await Notification.find({ receiverId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching all notifications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getNewNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const lastChecked = req.query.lastChecked;

    const query = { receiverId: userId };
    if (lastChecked) {
      query.createdAt = { $gt: new Date(lastChecked) };
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({ notifications, lastChecked: new Date() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createNotificationForAll = async (req, res) => {
  try {
    const { title, message, link } = req.body;

    const users = await User.find({}, "connection_id");
    const userIds = users.map((user) => user.connection_id);

    const notifications = userIds.map((userId) => ({
      link: link || null,
      receiverId: userId,
      title: title || "",
      message: message || "",
      status: "unread",
      createdAt: new Date(),
    }));

    const result = await Notification.insertMany(notifications);
    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} users`,
      count: result.length,
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return res.status(500).json({ error: "Failed to create notifications" });
  }
};

const createNotificationForSpecificUsers = async (req, res) => {
  try {
    const { title, message, link, userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one user ID is required" });
    }

    const existingUsers = await User.find(
      { connection_id: { $in: userIds } },
      "connection_id"
    );
    const existingIds = existingUsers.map((user) =>
      user.connection_id.toString()
    );
    const validUserIds = userIds.filter((id) =>
      existingIds.includes(id.toString())
    );

    if (validUserIds.length === 0) {
      return res
        .status(400)
        .json({ error: "None of the provided user IDs exist" });
    }

    // Create notification objects for specific users
    const notifications = validUserIds.map((userId) => ({
      link: link || null,
      receiverId: userId,
      title: title || "",
      message: message || "",
      createdAt: new Date(),
      isRead: false,
    }));

    // Bulk insert notifications
    const result = await Notification.insertMany(notifications);

    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} users`,
      count: result.length,
      nonExistentUsers: userIds.length - validUserIds.length,
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return res.status(500).json({ error: "Failed to create notifications" });
  }
};

const createNotificationForStudents = async (req, res) => {
  try {
    const { title, message, link } = req.body;
    const students = await User.find(
      { typeOfUser: "student" },
      "connection_id"
    );
    const studentIds = students.map((student) => student.connection_id);

    const notifications = studentIds.map((studentId) => ({
      link: link || null,
      receiverId: studentId,
      title: title || "",
      message: message || "",
      status: "unread",
      createdAt: new Date(),
    }));

    const result = await Notification.insertMany(notifications);
    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} students`,
      count: result.length,
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return res.status(500).json({ error: "Failed to create notifications" });
  }
};

const createNotificationForRecruiters = async (req, res) => {
  try {
    const { title, message, link } = req.body;
    const recruiters = await User.find(
      { typeOfUser: "recruiter" },
      "connection_id"
    );
    const recruiterIds = recruiters.map((recruiter) => recruiter.connection_id);

    const notifications = recruiterIds.map((recruiterId) => ({
      link: link || null,
      receiverId: recruiterId,
      title: title || "",
      message: message || "",
      status: "unread",
      createdAt: new Date(),
    }));

    const result = await Notification.insertMany(notifications);
    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} recruiters`,
      count: result.length,
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return res.status(500).json({ error: "Failed to create notifications" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ error: "Failed to delete notification" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      status: "read",
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res
      .status(500)
      .json({ error: "Failed to mark notification as read" });
  }
};

const markAsUnread = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      status: "unread",
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notification marked as unread" });
  } catch (error) {
    console.error("Error marking notification as unread:", error);
    return res
      .status(500)
      .json({ error: "Failed to mark notification as unread" });
  }
};

export {
  createNotificationForAll,
  createNotificationForSpecificUsers,
  getNewNotifications,
  getAllNotificationsOfUser,
  createNotificationForStudents,
  createNotificationForRecruiters,
  deleteNotification,
  markAsRead,
  markAsUnread,
};
