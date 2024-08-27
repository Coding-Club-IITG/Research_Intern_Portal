import { Router } from "express";
import { banRecruiter, deleteJob, removeRecruiter, removeStudent, verifyRecruiter } from "../controller/controls";


const router = Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management API
- */

/**
 * @swagger
 * /verify-recruiter:
 *   post:
 *     summary: Verify a recruiter
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterId:
 *                 type: string
 *                 description: ID of the recruiter to verify
 *     responses:
 *       200:
 *         description: Recruiter verified successfully
 *       400:
 *         description: Bad request
 */
router.post('/verify-recruiter',verifyRecruiter);
router.post('/remove-recruiter',removeRecruiter);
router.post('/remove-student',removeStudent);
router.post('/ban-recruiter',banRecruiter);
router.post('/delete-job',deleteJob);