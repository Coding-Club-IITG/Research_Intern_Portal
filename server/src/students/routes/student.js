import express from "express";

import {
  getStudentByID,
  getStudentByInterests,
  getStudents,
  getStudentsByFilter,
  // deleteStudent,
  updateStudent,
  createStudent,
  getStudentsApplicationById,
  addStudentsApplications,
} from "../controllers/student.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API endpoints for managing students
 */

// router.post('/create' , createStudent)

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The student ID
 *         name:
 *           type: string
 *           description: The name of the student
 *         email:
 *           type: string
 *           description: The email address of the student
 *         phoneNumber:
 *           type: number
 *           description: The phone number of the student
 *         rollNo:
 *           type: number
 *           description: The roll number of the student
 *         college:
 *           type: string
 *           description: The college of the student
 *         gender:
 *           type: string
 *           description: The gender of the student
 *         course:
 *           type: string
 *           description: The course of the student
 *         department:
 *           type: string
 *           description: The department of the student
 *         cpi:
 *           type: number
 *           description: The CPI of the student
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the student
 *         yearOfGrad:
 *           type: number
 *           description: The year of graduation of the student
 *         resume:
 *           type: string
 *           description: The URL of the student's resume
 *         interest:
 *           type: array
 *           items:
 *             type: string
 *           description: The interests of the student
 *         prevEducation:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               year:
 *                 type: number
 *               college:
 *                 type: string
 *               grade:
 *                 type: string
 *         applications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Update' # Reference to another schema
 *         previousExperience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role or position held at the company or college.
 *               company_college:
 *                 type: string
 *                 description: The name of the company or college.
 *               description:
 *                 type: string
 *                 description: A brief description of the responsibilities or achievements in that role.
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: The start date of the experience (YYYY-MM-DD).
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: The end date of the experience (YYYY-MM-DD).
 *         bio:
 *           type: string
 *           description: A short biography of the student
 *         social:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *               url:
 *                 type: string
 */


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Students found
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get("/", getStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Student found
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Student does not exist
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getStudentByID);

/**
 * @swagger
 * /students/search-filter:
 *   get:
 *     summary: Retrieve students based on filter criteria
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course:
 *                 type: string
 *               department:
 *                 type: string
 *               yearofGrad:
 *                 type: number
 *               rangeUpperCpi:
 *                 type: number
 *               rangeLowerCpi:
 *                 type: number
 *     responses:
 *       200:
 *         description: Filtered students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Search success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get("/search-filter", getStudentsByFilter);

/**
 * @swagger
 * /students/search-interest:
 *   get:
 *     summary: Retrieve students based on interests
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reqInterests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Students found with matching interests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Search Successful
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student:
 *                         $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get("/search-interest", getStudentByInterests);

/**
 * @swagger
 * /students/{id}/intern-applied:
 *   get:
 *     summary: Retrieve applications of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
router.get("/:id/intern-applied", getStudentsApplicationById);

/**
 * @swagger
 * /students/{id}/intern-apply/{internId}:
 *   post:
 *     summary: Apply for an internship
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *       - in: path
 *         name: internId
 *         required: true
 *         description: The ID of the internship
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully applied for the internship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Intern Applied
 *       400:
 *         description: Already applied or invalid IDs
 *       500:
 *         description: Internal server error
 */

router.post("/:id/intern-apply/:internId", addStudentsApplications);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   cpi:
 *                     type: number
 *                   interest:
 *                     type: array
 *                     items:
 *                       type: string
 *                   prevEducation:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         degree:
 *                           type: string
 *                         year:
 *                           type: number
 *                         college:
 *                           type: string
 *                         grade:
 *                           type: string
 *                   resume:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   social:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         platform:
 *                           type: string
 *                         url:
 *                           type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Account Updated Successfully
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Student does not exist
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateStudent);
//router.delete('/:id', deleteStudent);

export default router;
