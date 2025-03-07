// notificationRoutes.js
import express from 'express';
import NotificationController from '../controllers/NotificationController.js';

const router = express.Router();

// POST /api/notifications/broadcast - for all students
router.post('/broadcast', NotificationController.createNotificationForAll);

// POST /api/notifications/target - for specific students
router.post('/target', NotificationController.createNotificationForSpecificUsers);

export default router;