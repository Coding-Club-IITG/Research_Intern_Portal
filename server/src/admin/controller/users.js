import Student from "../../students/models/student";
import Recruiter from "../../recruiters/models/recruiter";
import Jobs from "../../recruiter/models/jobs";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: "success",
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: recruiters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
export const getJob = async (req, res) => {
  try {
    const getAllJobs = await Jobs.find();
    return res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: getAllJobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const allStudentsAppliedForJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.find().populate('applicants');
    let students = [];

    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j < allJobs[i].applicants.length; j++) {
        students.push(allJobs[i].applicants[j]);
      }
    }
    res.status(200).json({
      status: "success",
      message: "Students who applied for jobs retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

export const getStudentsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Jobs.findById(jobId).populate('applicants');

    if (!job) {
      return res.status(404).json({
        status: "error",
        message: "Job not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: `Students who applied for job ${jobId} retrieved successfully`,
      data: job.applicants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
