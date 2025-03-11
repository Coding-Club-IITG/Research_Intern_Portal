import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String || null },
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
