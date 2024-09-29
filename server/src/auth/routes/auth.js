import express from "express";
import { onedriveLogin, onedriveRedirect } from "../controllers/auth.js";
const router = express.Router();

router.get("/login", onedriveLogin);
router.get("/", onedriveRedirect);

export default router;
