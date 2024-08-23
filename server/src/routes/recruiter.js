import express from "express";
import {
  getRecruiterById,
  getRecruiters,
  updateRecruiter,
  deleteRecruiter,
  createRecuiter,
} from "../controllers/recruiter.js";

const router = express.Router();

router.route("/").get(getRecruiters).post(createRecuiter);
router
  .route("/:id")
  .get(getRecruiterById)
  .put(updateRecruiter)
  .delete(deleteRecruiter);

export default router;
