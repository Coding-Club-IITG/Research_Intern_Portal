// NotificationController.js

const Notification = require('../models/notification');
const Student = require('../models/student');

// Create notification for all students
const createNotificationForAll = async (req, res) => {
  try {
    const { notificationType, message } = req.body;
    
    if (!notificationType) {
      return res.status(400).json({ error: 'Notification type is required' });
    }
    
    // Get all student IDs from the database
    const students = await Student.find({}, '_id');
    const userIds = students.map(student => student._id);
    
    // Create notification objects for all students
    const notifications = userIds.map(userId => ({
      userId,
      notificationType,
      message: message || '',
      createdAt: new Date(),
      isRead: false
    }));
    
    // Bulk insert notifications
    const result = await Notification.insertMany(notifications);
    
    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} students`,
      count: result.length
    });
  } catch (error) {
    console.error('Error creating notifications:', error);
    return res.status(500).json({ error: 'Failed to create notifications' });
  }
};

// Create notification for specific students
const createNotificationForSpecificUsers = async (req, res) => {
  try {
    const { notificationType, message, userIds } = req.body;
    
    if (!notificationType) {
      return res.status(400).json({ error: 'Notification type is required' });
    }
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'At least one user ID is required' });
    }
    
    // Validate if all provided userIds exist in the database
    const existingStudents = await Student.find({ _id: { $in: userIds } }, '_id');
    const existingIds = existingStudents.map(student => student._id.toString());
    
    // Filter out non-existent userIds
    const validUserIds = userIds.filter(id => existingIds.includes(id.toString()));
    
    if (validUserIds.length === 0) {
      return res.status(400).json({ error: 'None of the provided user IDs exist' });
    }
    
    // Create notification objects for specific students
    const notifications = validUserIds.map(userId => ({
      userId,
      notificationType,
      message: message || '',
      createdAt: new Date(),
      isRead: false
    }));
    
    // Bulk insert notifications
    const result = await Notification.insertMany(notifications);
    
    return res.status(201).json({
      success: true,
      message: `Notification created for ${result.length} students`,
      count: result.length,
      nonExistentUsers: userIds.length - validUserIds.length
    });
  } catch (error) {
    console.error('Error creating notifications:', error);
    return res.status(500).json({ error: 'Failed to create notifications' });
  }
};

export default {
  createNotificationForAll,
  createNotificationForSpecificUsers
};