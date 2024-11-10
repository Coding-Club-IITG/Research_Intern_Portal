import express from "express";
import {
  createDepartment,
  createCourse,
  getAllDepartments,
  getAllCourse,
  updateDepartment,
  updateCourse,
  getDepartmentById,
} from "../controller/department-course.js";

const router = express.Router();

router.get("/course", getAllCourse);
router.get("/department", getAllDepartments);
router.put("/department/:id", updateDepartment);
router.get("/department/:id", getDepartmentById);
router.put("/course/:id", updateCourse);
router.post("/course", createCourse);
router.post("/department", createDepartment);

/**
 * @swagger
 * /api/v1/admin/departments/course:
 *   get:
 *     summary: Retrieve all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *                   example: Courses fetched successfully
 *       500:
 *         description: Failed to fetch courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/v1/admin/departments/department:
 *   get:
 *     summary: Retrieve all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Department'
 *                 message:
 *                   type: string
 *                   example: Departments fetched successfully
 *       500:
 *         description: Failed to fetch departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/v1/admin/departments/course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *                   example: Course created successfully
 *       500:
 *         description: Failed to create course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/v1/admin/departments/department:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *                 message:
 *                   type: string
 *                   example: Department created successfully
 *       500:
 *         description: Failed to create department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/v1/admin/departments/course/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *                   example: Course updated successfully
 *       500:
 *         description: Failed to update course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/v1/admin/departments/department/{id}:
 *   put:
 *     summary: Update a department
 *     tags: [Departments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the department to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *                 message:
 *                   type: string
 *                   example: Department updated successfully
 *       500:
 *         description: Failed to update department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 */

export default router;
