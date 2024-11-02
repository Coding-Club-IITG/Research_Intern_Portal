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
  logoutStudent
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
 *  /api/v1/students:
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
 * /api/v1/students/{id}:
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
 * /api/v1/students/search-filter:
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
 * /api/v1/students/search-interest:
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
 * /api/v1/students/{id}/intern-applied:
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
 * /api/v1/students/{id}/intern-apply/{internId}:
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
 * /api/v1/students/{id}:
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
router.get("/logout/:id" , logoutStudent)
//router.delete('/:id', deleteStudent);

export default router;
