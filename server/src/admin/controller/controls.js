import Recruiter from "../../recruiter/models/recruiter";
import Student from "../../student/models/student";
import Jobs from "../../recruiter/models/jobs";
import logger from "../../utils/logger.js";

export const verifyRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    recruiter.isVerified = true;
    await recruiter.save();

    return res.status(200).json(recruiter);
  } catch (error) {
    logger.error(error);
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    await recruiter.remove();

    return res.status(200).json({ message: "Recruiter removed" });
  } catch (error) {
    logger.error(error);
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(id);

    await student.remove();

    return res.status(200).json({ message: "Student removed" });
  } catch (error) {
    logger.error(error);
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const banRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    recruiter.isActive = false;
    await recruiter.save();

    return res.status(200).json(recruiter);
  } catch (error) {
    logger.error(error);
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    const job = await Jobs.findById(id);

    await job.remove();

    return res.status(200).json({ message: "Job removed" });
  } catch (error) {
    logger.error(error);
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
