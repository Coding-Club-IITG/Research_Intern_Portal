import express from "express";
import {
  createBranch,
  createCourse,
  getAllBranches,
  getAllCourse,
  updateBranch,
  updateCourse,
} from "../controller/branch-course.js";

const router = express.Router();

router.get("/course", getAllCourse);
router.get("/branch", getAllBranches);
router.put("/branch/:id", updateBranch);
router.put("/course/:id", updateCourse);
router.post("/course", createCourse);
router.post("/branch", createBranch);

export default router;
