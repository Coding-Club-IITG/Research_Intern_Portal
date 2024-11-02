import express from "express";
import {
  getRecruiterById,
  getRecruiters,
  updateRecruiter,
  deleteRecruiter,
  createRecuiter,
} from "../controllers/recruiter.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Recruiters
 *   description: API for managing recruiters
 */


router.route("/").get(getRecruiters).post(createRecuiter);

/**
 * @swagger
 * /api/v1/recruiters/{id}:
 *   get:
 *     summary: Retrieve a recruiter by ID
 *     tags: [Recruiters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the recruiter to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recruiter found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recruiter'
 *       404:
 *         description: Recruiter not found
 *   put:
 *     summary: Update a recruiter by ID
 *     tags: [Recruiters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the recruiter to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recruiter'
 *     responses:
 *       200:
 *         description: Recruiter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recruiter'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Recruiter not found
 *   delete:
 *     summary: Delete a recruiter by ID
 *     tags: [Recruiters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the recruiter to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recruiter deleted successfully
 *       404:
 *         description: Recruiter not found
 */
router
  .route("/:id")
  .get(getRecruiterById)
  .put(updateRecruiter)
  .delete(deleteRecruiter);

export default router;

/**
 * @swagger
 * tags:
 *   name: Recruiters
 *   description: API endpoints for managing recruiters
 */

/**
 * @swagger
 * /api/v1/recruiters:
 *   post:
 *     tags: [Recruiters]
 *     summary: Create a new recruiter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the recruiter
 *               email:
 *                 type: string
 *                 description: The email address of the recruiter
 *     responses:
 *       201:
 *         description: Recruiter created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/recruiters:
 *   get:
 *     tags: [Recruiters]
 *     summary: Retrieve all recruiters
 *     responses:
 *       200:
 *         description: List of recruiters retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/recruiters/{id}:
 *   get:
 *     tags: [Recruiters]
 *     summary: Retrieve a recruiter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recruiter to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recruiter retrieved successfully
 *       404:
 *         description: No recruiter found with the provided ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/recruiters/{id}:
 *   put:
 *     tags: [Recruiters]
 *     summary: Update a recruiter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recruiter to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               areaOfInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *               university:
 *                 type: string
 *               email:
 *                 type: string
 *               socialMedia:
 *                 type: object
 *                 properties:
 *                   linkedIn:
 *                     type: string
 *                   twitter:
 *                     type: string
 *               phoneNumber:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *               rating:
 *                 type: number
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     degree:
 *                       type: string
 *                     year:
 *                       type: number
 *                     college:
 *                       type: string
 *                     comments:
 *                       type: string
 *     responses:
 *       200:
 *         description: Recruiter updated successfully
 *       404:
 *         description: No recruiter found with the provided ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/recruiters/{id}:
 *   delete:
 *     tags: [Recruiters]
 *     summary: Delete a recruiter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recruiter to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recruiter deleted successfully
 *       404:
 *         description: No recruiter found with the provided ID
 *       500:
 *         description: Internal server error
 */
