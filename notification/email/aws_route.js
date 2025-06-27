import express from "express";
import { verifyEmailAddresses, sendEmail } from "./aws_ses.js";

const router = express.Router();

router.post("/verify-email", verifyEmailAddresses);
router.post("/send-email", sendEmail);

export default router;
