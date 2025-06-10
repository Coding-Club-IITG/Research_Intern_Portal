import express from "express";
import { logout, onedriveLogin, onedriveRedirect } from "../controllers/auth.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OneDrive Auth
 *   description: API endpoints for OneDrive authentication
 */

/**
 * @swagger
 * /login:
 *   get:
 *     tags: [OneDrive Auth]
 *     summary: Initiates OneDrive login process
 *     responses:
 *       302:
 *         description: Redirects to OneDrive login page
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [OneDrive Auth]
 *     summary: Redirects after OneDrive authentication
 *     responses:
 *       200:
 *         description: Successfully redirected after OneDrive login
 *       500:
 *         description: Internal server error
 */
router.get("/login", onedriveLogin);
router.get("/", onedriveRedirect);
router.get("/logout", logout);

export default router;
