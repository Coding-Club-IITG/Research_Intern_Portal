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
/**
 * @swagger
 * components:
 *   schemas:
 *     Recruiter:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The recruiter's name
 *         areaOfInterest:
 *           type: array
 *           items:
 *             type: string
 *           description: Areas of interest of the recruiter
 *         university:
 *           type: string
 *           description: The university the recruiter is associated with
 *         email:
 *           type: string
 *           description: The recruiter's email address
 *         socialMedia:
 *           type: object
 *           properties:
 *             linkedIn:
 *               type: string
 *               description: LinkedIn profile of the recruiter
 *             twitter:
 *               type: string
 *               description: Twitter handle of the recruiter
 *           description: Social media profiles of the recruiter
 *         phoneNumber:
 *           type: number
 *           description: The recruiter's phone number
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the recruiter is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the recruiter was created
 *         updateAt:
 *           type: string
 *           format: date-time
 *           description: When the recruiter was last updated
 *         rating:
 *           type: number
 *           default: 5
 *           description: The recruiter's rating
 *         qualifications:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *                 description: The degree obtained by the recruiter
 *               year:
 *                 type: number
 *                 description: The year the degree was obtained
 *               college:
 *                 type: string
 *                 description: The college where the degree was obtained
 *               comments:
 *                 type: string
 *                 description: Additional comments about the qualification
 *           description: The recruiter's qualifications
 *         isVerified:
 *           type: boolean
 *           default: false
 *           description: Whether the recruiter is verified
 *         jobs:
 *           type: array
 *           items:
 *             type: string
 *             description: ObjectId references to jobs associated with the recruiter
 *           description: List of jobs posted by the recruiter
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
 * /recruiters:
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
 * /recruiters:
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
 * /recruiters/{id}:
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
 * /recruiters/{id}:
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
 * /recruiters/{id}:
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