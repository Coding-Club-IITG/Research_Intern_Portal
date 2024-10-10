const express = require("express");
const router = express.Router();
const { createBugReport, getAllBugReports } = require("../controller/bug");

router.post("/", createBugReport); // Create a new bug report
router.get("/", getAllBugReports); // Retrieve all bug reports


// it is not working properly if i add swagger of this bug route

module.exports = router;
