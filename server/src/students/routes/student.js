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

// router.post('/create' , createStudent)
router.get('/', getStudents);
router.get('/:id', getStudentByID); 
router.get('/search-filter' , getStudentsByFilter)
router.get('/search-interest' , getStudentByInterests)
router.get('/:id/intern-applied' , getStudentsApplicationById)
router.post('/:id/intern-apply/:internId' , addStudentsApplications)
router.put('/:id', updateStudent);
//router.delete('/:id', deleteStudent);

export default router;
