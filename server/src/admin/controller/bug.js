import Bug from "../models/bug.js";
import logger from "../../utils/logger.js";
// Create new bug report
export const createBugReport = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const newBug = new Bug({
      title,
      description,
      userId,
    });

    await newBug.save();
    res.status(201).json({ message: "Bug report submitted successfully." });
  } catch (error) {
    logger.error(error);
    // console.error("Error submitting bug report:", error);
    res.status(500).json({ error: "Failed to submit bug report." });
  }
};

// Retrieve all bug reports
export const getAllBugReports = async (req, res) => {
  try {
    const bugs = await Bug.find().populate("userId", "name email");
    res.status(200).json(bugs);
  } catch (error) {
    logger.error(`Error fetching bugs: ${error}`);
    // console.error("Error fetching bugs:", error);
    res.status(500).json({ error: "Failed to fetch bugs." });
  }
};
