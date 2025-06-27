import express from "express";
import {
  getUpdateById,
  getUpdates,
  editUpdate,
  deleteUpdate,
  createUpdate,
} from "../controller/updates.js";

const router = express.Router();

router.post("/", createUpdate); // Route to create a new update
router.get("/", getUpdates); // Route to get all updates
router.get("/:id", getUpdateById); // Route to get a specific update by ID
router.put("/:id", editUpdate); // Route to update a specific update by ID
router.delete("/:id", deleteUpdate); // Route to delete a specific update by ID


/**
 * @swagger
 * tags:
 *   name: Updates
 *   description: API for managing updates
 */



/**
 * @swagger
 * /api/v1/admin/updates:
 *   post:
 *     summary: Create a new update
 *     tags: [Updates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the update
 *                 example: "New Course Launched"
 *               description:
 *                 type: string
 *                 description: Description of the update
 *                 example: "We have launched a new course on machine learning."
 *               link:
 *                 type: string
 *                 description: Link for more information
 *                 example: "http://example.com/course"
 *     responses:
 *       201:
 *         description: Update created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Update created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Update'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/updates:
 *   get:
 *     summary: Retrieve all updates
 *     tags: [Updates]
 *     responses:
 *       200:
 *         description: List of updates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Updates retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Update'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/updates/{id}:
 *   get:
 *     summary: Retrieve a specific update by ID
 *     tags: [Updates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the update to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Update retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Update'
 *       404:
 *         description: Update not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/updates/{id}:
 *   put:
 *     summary: Update a specific update by ID
 *     tags: [Updates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the update to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the update
 *                 example: "Updated Course Launched"
 *               description:
 *                 type: string
 *                 description: Description of the update
 *                 example: "The course has been updated with new content."
 *               link:
 *                 type: string
 *                 description: Link for more information
 *                 example: "http://example.com/updated-course"
 *     responses:
 *       200:
 *         description: Update edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Update edited successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Update'
 *       404:
 *         description: Update not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/updates/{id}:
 *   delete:
 *     summary: Delete a specific update by ID
 *     tags: [Updates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the update to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Update deleted successfully"
 *       404:
 *         description: Update not found
 *       500:
 *         description: Internal server error
 */


export default router;
