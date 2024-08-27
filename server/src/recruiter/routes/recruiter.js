import express from "express";
import {
  getRecruiterById,
  getRecruiters,
  updateRecruiter,
  deleteRecruiter,
  createRecuiter,
  getRecruiterByFilter,
} from "../controllers/recruiter.js";

const router = express.Router();

router.route("/").get(getRecruiters).post(createRecuiter);
router.route("/filter").get(getRecruiterByFilter);
router
  .route("/:id")
  .get(getRecruiterById)
  .put(updateRecruiter)
  .delete(deleteRecruiter);


export default router;
