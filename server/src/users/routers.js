import { Router } from "express";
import { createUser,getSavedJobs } from "./controller";
const router = Router();

router.post("/", createUser);
router.get("/:userId/saved-jobs", getSavedJobs);
export default router;
