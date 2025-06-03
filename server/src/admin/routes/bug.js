import express from "express";
const router = express.Router();
import {createBugReport,getAllBugReports} from "../controller/bug.js";

router.post("/", createBugReport); // Create a new bug report
router.get("/", getAllBugReports); // Retrieve all bug reports

/**
 * @swagger
 * tags:
 *   name: Bugs
 *   description: API for managing bug reports
 */

/**
 * @swagger
 * /api/v1/admin/bugs:
 *   post:
 *     summary: Create a new bug report
 *     tags: [Bugs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Bug title"
 *               description:
 *                 type: string
 *                 example: "Description of the bug"
 *               userId:
 *                 type: string
 *                 example: "user123"
 *             required:
 *               - title
 *               - description
 *               - userId
 *     responses:
 *       '201':
 *         description: Bug report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bug report submitted successfully."
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to submit bug report."
 */

/**
 * @swagger
 * /api/v1/admin/bugs:
 *   get:
 *     summary: Retrieve all bug reports
 *     tags: [Bugs]
 *     responses:
 *       '200':
 *         description: A list of bug reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "bug123"
 *                   title:
 *                     type: string
 *                     example: "Bug title"
 *                   description:
 *                     type: string
 *                     example: "Description of the bug"
 *                   userId:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch bugs."
 */



export default router;
