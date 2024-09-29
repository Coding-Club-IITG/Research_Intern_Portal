import Student from "../../students/models/student";
import Recruiter from "../../recruiters/models/recruiter";
import Jobs from "../../recruiter/models/jobs";
import logger from "../../utils/logger.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    logger.info(`Fetched all students. Total students: ${students.length}`);
    res.status(200).json(students);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    logger.info(`Fetched all recruiters. Total recruiters: ${recruiters.length}`);
    res.status(200).json(recruiters);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allStudentsAppliedForJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.find();
    let students = [];

    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j < allJobs[i].applicants.length; j++) {
        students.push(allJobs[i].applicants[j]);
      }
    }

    logger.info(`Fetched all students who applied for jobs. Total students: ${students.length}`);
    res.status(200).json(students);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
