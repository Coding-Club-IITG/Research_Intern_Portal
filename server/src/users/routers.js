import { Router } from "express";
import { createUser, getSavedJobs, verifyEmail } from "./controller.js";
const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a new user of type Student, Recruiter, or Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               typeOfUser:
 *                 type: string
 *                 enum: [student, recruiter, admin]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);
/**
 * @swagger
 * /users/verify:
 *   get:
 *     tags:
 *       - Users
 *     summary: Verify email
 *     description: Verify the email of a user
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
router.get("/verify", verifyEmail);
/**
 * @swagger
 * /users/{userId}/saved-jobs:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get saved jobs of a user
 *     description: Fetch the saved jobs for a specific user by their ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the saved jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 savedJobs:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:userId/saved-jobs", getSavedJobs);

export default router;
