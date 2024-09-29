import Recruiter from "../../recruiter/models/recruiter";
import Student from "../../student/models/student";
import Jobs from "../../recruiter/models/jobs";
import logger from "../../utils/logger.js";

// Verify a recruiter
export const verifyRecruiter = async (req, res) => {
  const { id } = req.body;
  try {
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      logger.warn(`Attempt to verify recruiter with ID ${id} failed: Recruiter not found`);
      return res.status(404).json({ message: "Recruiter not found" });
    }

    recruiter.isVerified = true;
    await recruiter.save();

    logger.info(`Recruiter verified successfully with ID: ${id}`);
    return res.status(200).json(recruiter);
  } catch (error) {
    logger.error(`Error verifying recruiter with ID ${id}: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a recruiter
export const removeRecruiter = async (req, res) => {
  const { id } = req.body;
  try {
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      logger.warn(`Attempt to remove recruiter with ID ${id} failed: Recruiter not found`);
      return res.status(404).json({ message: "Recruiter not found" });
    }

    await recruiter.remove();
    logger.info(`Recruiter removed successfully with ID: ${id}`);
    return res.status(200).json({ message: "Recruiter removed" });
  } catch (error) {
    logger.error(`Error removing recruiter with ID ${id}: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a student
export const removeStudent = async (req, res) => {
  const { id } = req.body;
  try {
    const student = await Student.findById(id);

    if (!student) {
      logger.warn(`Attempt to remove student with ID ${id} failed: Student not found`);
      return res.status(404).json({ message: "Student not found" });
    }

    await student.remove();
    logger.info(`Student removed successfully with ID: ${id}`);
    return res.status(200).json({ message: "Student removed" });
  } catch (error) {
    logger.error(`Error removing student with ID ${id}: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Ban a recruiter
export const banRecruiter = async (req, res) => {
  const { id } = req.body;
  try {
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      logger.warn(`Attempt to ban recruiter with ID ${id} failed: Recruiter not found`);
      return res.status(404).json({ message: "Recruiter not found" });
    }

    recruiter.isActive = false;
    await recruiter.save();

    logger.info(`Recruiter banned successfully with ID: ${id}`);
    return res.status(200).json(recruiter);
  } catch (error) {
    logger.error(`Error banning recruiter with ID ${id}: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  const { id } = req.body;
  try {
    const job = await Jobs.findById(id);

    if (!job) {
      logger.warn(`Attempt to delete job with ID ${id} failed: Job not found`);
      return res.status(404).json({ message: "Job not found" });
    }

    await job.remove();
    logger.info(`Job deleted successfully with ID: ${id}`);
    return res.status(200).json({ message: "Job removed" });
  } catch (error) {
    logger.error(`Error deleting job with ID ${id}: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
