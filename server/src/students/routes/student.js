import express from "expresss";

import {
  getStudentByID,
  getStudentByInterests,
  getStudents,
  getStudentsByFilter,
  deleteStudent,
  updateStudent,
  createStudent,
  getStudentsApplicationById,
  addStudentsApplications,
} from "../controllers/student";

const router = express.Router();

// router.post('/create' , createStudent)
// router.get('/', getStudents);
// router.get('/:id', getStudentByID);
// router.get('/search-filter' , getStudentsByFilter)
// router.get('/search-interest' , getStudentByInterests)
// router.get('/:id/intern-applied' , getStudentsApplicationById)
// router.post('/:id/intern-apply/:internId' , addStudentsApplications)
// router.put('/:id', updateStudent);
// router.delete('/:id', deleteStudent);

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - createdAt
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the student
 *         email:
 *           type: string
 *           format: email
 *           description: The student's email address
 *         phoneNumber:
 *           type: integer
 *           description: The student's phone number
 *         rollNo:
 *           type: integer
 *           description: The student's roll number
 *         college:
 *           type: string
 *           default: 'Indian Instituition of Technology, Guwahati'
 *           description: The college the student is associated with
 *         gender:
 *           type: string
 *           description: The student's gender
 *         course:
 *           type: string
 *           enum:
 *             - BTech
 *             - MTech
 *             - BDes
 *             - MDes
 *             - MA
 *             - MSR
 *             - MSc
 *             - Phd
 *             - MBA
 *           description: The course the student is enrolled in
 *         department:
 *           type: string
 *           enum:
 *             - Chemistry
 *             - Chemical Engineering
 *             - Computer Science
 *             - Design
 *             - Humanities and Social Science
 *             - Physics
 *             - Mathematics
 *             - Mehta School of Data Science
 *             - Mechanical Engineering
 *             - Electrical and Electronics Engineering
 *             - Civil Engineering
 *             - Bioscience and Bioengineering
 *             - Energy Engineering
 *           description: The department the student belongs to
 *         cpi:
 *           type: number
 *           description: The student's CPI (Cumulative Performance Index)
 *         social:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 description: The social media platform
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: The URL of the social media profile
 *           description: Social media profiles of the student
 *         dob:
 *           type: string
 *           format: date
 *           description: The student's date of birth
 *         yearOfGrad:
 *           type: integer
 *           description: The year of graduation
 *         resume:
 *           type: string
 *           description: The URL or path to the student's resume
 *         interest:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: Area of interest for the student
 *           description: The student's areas of interest
 *         prevEducation:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *                 description: The degree obtained
 *               year:
 *                 type: integer
 *                 description: The year of obtaining the degree
 *               college:
 *                 type: string
 *                 description: The college where the degree was obtained
 *               grade:
 *                 type: string
 *                 description: The grade received
 *           description: Previous educational background of the student
 *         bio:
 *           type: string
 *           description: A brief biography of the student
 *         prevExperience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role held
 *               company_college:
 *                 type: string
 *                 description: The company or college where the experience was gained
 *               description:
 *                 type: string
 *                 description: Description of the role
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: Start date of the experience
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: End date of the experience
 *           description: Previous work or internship experiences of the student
 *         applications:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ObjectId references to updates or applications
 *           description: List of applications or updates associated with the student
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student record was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing student Profiles
 */

/**
 * @swagger
 * /api/v1/students/create:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 */
router.post("/create", createStudent);

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Retrieve all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/", getStudents);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
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
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 */
router.get("/:id", getStudentByID);

/**
 * @swagger
 * /api/v1/students/search-filter:
 *   get:
 *     summary: Retrieve students by filter
 *     tags: [Students]
 *     parameters:
 *       - name: filter
 *         in: query
 *         description: Query parameters for filtering students
 *         schema:
 *           type: object
 *           additionalProperties: true
 *     responses:
 *       200:
 *         description: List of students matching filter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/search-filter", getStudentsByFilter);

/**
 * @swagger
 * /api/v1/students/search-interest:
 *   get:
 *     summary: Retrieve students by interest
 *     tags: [Students]
 *     parameters:
 *       - name: interest
 *         in: query
 *         description: Interest for searching students
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of students with the given interest
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/search-interest", getStudentByInterests);

/**
 * @swagger
 * /api/v1/students/{id}/intern-applied:
 *   get:
 *     summary: Retrieve internship applications by student ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of internship applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   internId:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: Student not found
 */
router.get("/:id/intern-applied", getStudentsApplicationById);

/**
 * @swagger
 * /api/v1/students/{id}/intern-apply/{internId}:
 *   post:
 *     summary: Apply for an internship
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student applying
 *         schema:
 *           type: string
 *       - name: internId
 *         in: path
 *         required: true
 *         description: The ID of the internship
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student or internship not found
 */
router.post("/:id/intern-apply/:internId", addStudentsApplications);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
router.put("/:id", updateStudent);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", deleteStudent);

export default router;
