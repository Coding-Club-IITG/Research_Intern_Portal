import express from "express";
const router = express.Router();
import {createBugReport,getAllBugReports} from "../controller/bug.js";

router.post("/", createBugReport); // Create a new bug report
router.get("/", getAllBugReports); // Retrieve all bug reports


// it is not working properly if i add swagger of this bug route

export default router;
