const express = require("express");
const router = express.Router();
const Bug = require("../models/bug");

router.get("/bugs", async (req, res) => {
  try {
    const bugs = await Bug.find().populate("userId", "name email"); // Populate user details
    res.status(200).json(bugs);
  } catch (error) {
    console.error("Error fetching bugs:", error);
    res.status(500).json({ error: "Failed to fetch bugs" });
  }
});

module.exports = router;
