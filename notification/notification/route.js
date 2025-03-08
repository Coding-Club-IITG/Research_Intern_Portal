import express from "express";
import { getNewNotifications, createNotificationForAll } from "./controller.js";

const router = express.Router();

router.get("/get/:id", getNewNotifications);
router.post("/create", createNotificationForAll);

export default router;
