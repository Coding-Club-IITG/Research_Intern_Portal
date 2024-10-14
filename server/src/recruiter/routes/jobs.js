import express from 'express'
// import { getRecruiterById, getRecruiters, updateRecruiter, deleteRecruiter } from '../controllers/recruiter.js'
import { createJob, deleteById, getJob, getJobById,applyForJob,getJobByfilter } from '../controllers/jobs.js';


const jobRouter = express.Router()

jobRouter.get('/:id',getJobById);
jobRouter.get('/',getJob );
jobRouter.post('/',createJob );
jobRouter.post('/apply', applyForJob);
jobRouter.post('/filter',getJobByfilter );
jobRouter.delete('/:id', deleteById);



/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /api/v1/job:
 *   get:
 *     summary: Retrieve all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/job/{id}:
 *   get:
 *     summary: Retrieve a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A job object
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prof_name:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               stipend:
 *                 type: number
 *               hours_required:
 *                 type: number
 *               last_date:
 *                 type: string
 *                 format: date
 *               type:
 *                 type: string
 *               accepting:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/job/apply:
 *   post:
 *     summary: Apply for a job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: string
 *               applicantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application submitted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/job/filter:
 *   get:
 *     summary: Get jobs by filter
 *     tags: [Jobs]
 *     parameters:
 *       - name: criteria
 *         in: query
 *         required: true
 *         description: Filter criteria
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered list of jobs
 *       500:
 *         description: Server Error
 */

export default jobRouter;