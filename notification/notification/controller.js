import Notification from "./model.js";
import Student from "../student/model.js";

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

// Create notification for all students
const createNotificationForAll = async (req, res) => {
  try {
    const { title, message } = req.body;

    const students = await Student.find({}, "_id");
    const userIds = students.map((student) => student._id);

    const notifications = userIds.map((userId) => ({
      userId,
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

// Create notification for specific students
const createNotificationForSpecificUsers = async (req, res) => {
  try {
    const { notificationType, message, userIds } = req.body;

    if (!notificationType) {
      return res.status(400).json({ error: "Notification type is required" });
    }

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one user ID is required" });
    }

    // Validate if all provided userIds exist in the database
    const existingStudents = await Student.find(
      { _id: { $in: userIds } },
      "_id"
    );
    const existingIds = existingStudents.map((student) =>
      student._id.toString()
    );

    // Filter out non-existent userIds
    const validUserIds = userIds.filter((id) =>
      existingIds.includes(id.toString())
    );

    if (validUserIds.length === 0) {
      return res
        .status(400)
        .json({ error: "None of the provided user IDs exist" });
    }

    // Create notification objects for specific students
    const notifications = validUserIds.map((userId) => ({
      userId,
      notificationType,
      message: message || "",
      createdAt: new Date(),
      isRead: false,
    }));

    // Bulk insert notifications
    const result = await Notification.insertMany(notifications);

    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} students`,
      count: result.length,
      nonExistentUsers: userIds.length - validUserIds.length,
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return res.status(500).json({ error: "Failed to create notifications" });
  }
};

export {
  createNotificationForAll,
  createNotificationForSpecificUsers,
  getNewNotifications,
};
