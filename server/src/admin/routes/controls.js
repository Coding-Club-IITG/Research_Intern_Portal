import { Router } from "express";
import {
  banRecruiter,
  deleteJob,
  removeRecruiter,
  removeStudent,
  verifyRecruiter,
} from "../controller/controls.js";

const router = Router();

router.post("/verify-recruiter", verifyRecruiter);
router.post("/remove-recruiter", removeRecruiter);
router.post("/remove-student", removeStudent);
router.post("/ban-recruiter", banRecruiter);
router.post("/delete-job", deleteJob);

export default router;
