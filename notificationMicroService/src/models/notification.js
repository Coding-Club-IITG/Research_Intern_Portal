const mongoose = require('mongoose');

// Notification Schema
const notificationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model, but not directly using it
    required: true,
  },
  notificationType: {
    type: String,  // The type of the notification (e.g., "exam", "deadline", "event")
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'read'],
    default: 'pending', // Default status when notification is created
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
