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
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    recruiter.isVerified = true;
    await recruiter.save();
    logger.info(`Recruiter verified successfully with ID: ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Recruiter verified successfully",
      data: recruiter,
    });
  } catch (error) {
    logger.error(`Error verifying recruiter with ID ${id}: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });    
  }
};

// Remove a recruiter
export const removeRecruiter = async (req, res) => {
  const { id } = req.body;
  try {
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
        logger.warn(`Attempt to remove recruiter with ID ${id} failed: Recruiter not found`);
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    await recruiter.remove();
    logger.info(`Recruiter removed successfully with ID: ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Recruiter removed successfully",
      data: null,
    });
  } catch (error) {
    logger.error(`Error removing recruiter with ID ${id}: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};


export const removeStudent = async (req, res) => {
  const { id } = req.body;
  try {
    const student = await Student.findById(id);

    if (!student) {
      logger.warn(`Attempt to remove student with ID ${id} failed: Student not found`);
      return res.status(404).json({ message: "Student not found" });
    }
    logger.error(`removed student with ID ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Student removed successfully",
      data: null,
    });
  } catch (error) {
    logger.error(`Error removing student with ID ${id}: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

// Ban a recruiter
export const banRecruiter = async (req, res) => {
  const { id } = req.body;
  try {
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
        logger.warn(`Attempt to ban recruiter with ID ${id} failed: Recruiter not found`);
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    recruiter.isActive = false;
    await recruiter.save();
    logger.info(`Recruiter banned successfully with ID: ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Recruiter banned successfully",
      data: recruiter,
    });
  } catch (error) {
    logger.error(`unable to ban Recruiter with ID: ${id}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};


export const deleteJob = async (req, res) => {
  const { id } = req.body;
  try {
    const job = await Jobs.findById(id);

    if (!job) {
      logger.warn(`Attempt to delete job with ID ${id} failed: Job not found`);
      return res.status(404).json({ message: "Job not found" });
    }
    logger.info(`deleted job with ID ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Job removed successfully",
      data: null,
    });
  } catch (error) {
    logger.error(`Error deleting job with ID ${id}: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
