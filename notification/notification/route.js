import express from "express";
import {
  getAllNotificationsOfUser,
  getNewNotifications,
  createNotificationForAll,
  createNotificationForSpecificUsers,
  createNotificationForStudents,
  createNotificationForRecruiters,
  deleteNotification,
  markAsRead,
  markAsUnread,
} from "./controller.js";

const router = express.Router();

router.get("/get/:id", getAllNotificationsOfUser);
router.get("/get-new/:id", getNewNotifications);
router.post("/create", createNotificationForAll);
router.post("/createOne", createNotificationForSpecificUsers);
router.post("/create-students", createNotificationForStudents);
router.post("/create-recruiters", createNotificationForRecruiters);
router.post("/delete/:id", deleteNotification);
router.post("/mark-as-read/:id", markAsRead);
router.post("/mark-as-unread/:id", markAsUnread);

export default router;
