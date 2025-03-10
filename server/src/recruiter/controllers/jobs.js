import Jobs from "../models/jobs.js";
import Student from "../../students/models/student.js";
import logger from "../../utils/logger.js";
import recruiter from "../models/recruiter.js";
import axios from "axios";

const createJob = async (req, res) => {
  try {
    const data = req.body;
    const recruiter_data = await recruiter.findById(req?.user?.connection_id);

    if (recruiter_data.isVerified === false) {
      return res.status(400).json({
        message: "Recruiter not verified contact admin",
        status: "error",
        data: null,
      });
    }

    const job = await Jobs.create(data);
    const response = await axios.post(
      `${process.env.NOTIFICATION_URL}/create-students`,
      {
        title: "New Job",
        message: `A new internship opportunity has been posted by ${recruiter_data.name}.\nClick on "View More" to know more about the internship.`,
        link: `/internships/internship/${job._id}`,
      }
    );
    console.log(response.data);
    return res.status(201).json({
      message: "Job created successfully",
      data: job,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", status: "error", data: null });
  }
};

const getAllJobsOfRecruiter = async (req, res) => {
  try {
    const { recruiter_id } = req.params;
    const jobs = await Jobs.find({ recruiter: recruiter_id });

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      data: jobs,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", status: "error", data: null });
  }
};

const getAllAcceptingJobs = async (req, res) => {
  try {
    const activeJobs = await Jobs.find({ accepting: true });
    const currentDate = new Date();
    const jobs = activeJobs.filter((job) => {
      const jobEndDate = new Date(job.last_date);
      jobEndDate.setHours(23, 59, 59, 999);
      return jobEndDate >= currentDate;
    });
    return res.status(200).json({
      message: "Accepting Jobs Successfully retrieved",
      data: jobs,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", status: "error", data: null });
  }
};

const getJob = async (req, res) => {
  try {
    const getAllJobs = await Jobs.find();
    return res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: getAllJobs,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found", data: null, status: "error" });
    }

    return res.status(200).json({
      message: "Job retrieved successfully",
      data: job,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const stopAcceptingApplications = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, { accepting: false });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found", data: null, status: "error" });
    }
    const recruiter_data = await recruiter.findById(job.recruiter);
    await axios.post(`${process.env.NOTIFICATION_URL}/create-students`, {
      title: "Changes in Application Criteria",
      message: `${recruiter_data.name} has stopped accepting applications for the internship.`,
      link: `/internships/internship/${job._id}`,
    });

    return res.status(200).json({
      message: "Job applications stopped",
      data: job,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const reopenApplications = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, { accepting: true });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found", data: null, status: "error" });
    }
    const recruiter_data = await recruiter.findById(job.recruiter);
    await axios.post(`${process.env.NOTIFICATION_URL}/create-students`, {
      title: "Application Reopened",
      message: `The application period of internship created by ${recruiter_data.name} has been reopened.\nClick on "View More" to know more about the internship.`,
      link: `/internships/internship/${job._id}`,
    });
    return res.status(200).json({
      message: "Job applications reopened",
      data: job,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, req.body);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found", data: null, status: "error" });
    }
    const recruiter_data = await recruiter.findById(job.recruiter);
    console.log(recruiter_data);
    await axios.post(`${process.env.NOTIFICATION_URL}/create-students`, {
      title: "Changes in Application Criteria",
      message: `${recruiter_data.name} has changed the application criteria for the internship.\nClick on "View More" to know more about the internship.`,
      link: `/internships/internship/${job._id}`,
    });

    return res.status(200).json({
      message: "Job updated successfully",
      data: job,
      status: "success",
    });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const getAllStudentsOfJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found", data: null, status: "error" });
    }

    let applicantsData = [];

    if (job.applicants.length > 0) {
      applicantsData = await Promise.all(
        job.applicants.map(async (applicantDetail) => {
          const applicant = await Student.findById(applicantDetail.applicant);
          return applicant;
        })
      );
    }

    return res.status(200).json({
      message: "Job retrieved successfully",
      data: applicantsData,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", data: null, status: "error" });
  }
};

const getJobByfilter = async (req, res) => {
  try {
    const data = req.body;
    const job = await Jobs.find({ $and: [{ isActive: true }, data] });

    if (job.length == 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const applyForJob = async (req, res) => {
  try {
    const { job_id, user_id } = req.body;
    let user = await Student.findById(user_id);
    let job = await Jobs.findById(job_id);
    let jobRequirement = job.requirements;

    if (
      jobRequirement.cpi <= user.cpi &&
      jobRequirement.department == user.department &&
      new Date(job.last_date) >= new Date()
    ) {
      const apply = await Jobs.findByIdAndUpdate(job_id, {
        $push: { applicants: user_id },
      });
      if (!apply) {
        return res.status(404).json({ message: "Something went wrong" });
      }
      return res
        .status(200)
        .json({ message: "Successfully applied for the job" });
    } else {
      return res.status(404).json({ message: "Requirements did't match" });
    }
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const selectStudent = async (req, res) => {
  try {
    const { job_id, student_id } = req.body;
    const job = await Jobs.findById(job_id);
    const student = await Student.findById(student_id);
    if (!job || !student) {
      return res.status(404).json({ message: "Job or Student not found" });
    }
    const selected = await Jobs.findByIdAndUpdate(job_id, {
      $set: { selected: student_id },
    });
    if (!selected) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    await axios.post(`${process.env.NOTIFICATION_URL}/createOne`, {
      title: "Selected for Internship",
      message: `Congratulations! You have been selected for the internship posted by ${recruiter_data.name}`,
      userIds: [student_id],
    });
    return res.status(200).json({ message: "Student selected successfully" });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const rejectStudent = async (req, res) => {
  try {
    const { job_id, student_id } = req.body;
    const job = await Jobs.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const rejected = await Jobs.findByIdAndUpdate(job_id, {
      $pull: { applicants: student_id },
    });
    if (!rejected) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    await axios.post(`${process.env.NOTIFICATION_URL}/createOne`, {
      title: "Application Rejected",
      message: `Your application for the internship created by ${recruiter_data.name} has been rejected.`,
      userIds: [student_id],
    });
    return res.status(200).json({ message: "Student rejected successfully" });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export {
  getJob,
  getJobById,
  updateJob,
  createJob,
  applyForJob,
  getJobByfilter,
  getAllJobsOfRecruiter,
  stopAcceptingApplications,
  getAllStudentsOfJob,
  getAllAcceptingJobs,
  reopenApplications,
  selectStudent,
  rejectStudent,
};
