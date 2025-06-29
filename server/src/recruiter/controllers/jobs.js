import Jobs from "../models/jobs.js";
import Student from "../../students/models/student.js";
import logger from "../../utils/logger.js";
import recruiter from "../models/recruiter.js";
import axios from "axios";
import mongoose from "mongoose";

const createJob = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const recruiter_data = await recruiter.findById(data?.recruiter);

    // if (recruiter_data.isVerified === false) {
    //   return res.status(400).json({
    //     message: "Recruiter not verified contact admin",
    //     status: "error",
    //     data: null,
    //   });
    // }
    const job = await Jobs.create(data);

    const notificationResponse = await axios.post(
      `${process.env.NOTIFICATION_URL}/create-students`,
      {
        title: "New Job",
        message: `A new internship opportunity has been posted by ${recruiter_data.name}.\nClick on "View More" to know more about the internship.`,
        link: `/internships/internship/${job._id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    logger.info("Notification sent successfully:", notificationResponse.data);

    return res.status(201).json({
      message: "Job created successfully",
      data: job,
      status: "success",
    });
  } catch (error) {
    logger.error(error);
    console.log(error);
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

    const notificationResponse = await axios.post(
      `${process.env.NOTIFICATION_URL}/createOne`,
      {
        title: "Application Reopened",
        message: `The application period of internship created by ${recruiter_data.name} has been reopened.\nClick on "View More" to know more about the internship.`,
        link: `/internships/internship/${job._id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    logger.info("Notification sent successfully:", notificationResponse.data);

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

    const notificationResponse = await axios.post(
      `${process.env.NOTIFICATION_URL}/create-students`,
      {
        title: "Changes in Application Criteria",
        message: `${recruiter_data.name} has changed the application criteria for the internship.\nClick on "View More" to know more about the internship.`,
        link: `/internships/internship/${job._id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    logger.info("Notification sent successfully:", notificationResponse.data);

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

// const getAllStudentsOfJob = async (req, res) => {

//   try {
//     const { id } = req.params;
//     const job = await Jobs.findById(id);

//     if (!job) {
//       return res
//         .status(404)
//         .json({ message: "Job not found", data: null, status: "error" });
//     }
//     let applicantsData = [];

//     if (job.applicants.length > 0) {
//       applicantsData = await Promise.all(
//         job.applicants.map(async (applicantDetail) => {
//           console.log("Job applicants array:", job.applicants);
//           const applicant = await Student.findById(applicantDetail.applicant);
//           return applicant;
//         })
//       );
//     }
//    console.log('applicationsData=',applicantsData);

//     return res.status(200).json({
//       message: "Job retrieved successfully",
//       data: applicantsData,
//       status: "success",
//     });
//   }

//   catch (error) {
//     logger.error(error);
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", data: null, status: "error" });
//   }
// };

const getAllStudentsOfJob = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Fetch the job
    const job = await Jobs.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        data: null,
        status: "error",
      });
    }

    console.log("✅ Job found:", job);

    let applicantsData = [];

    // ✅ Check what applicants look like
    console.log("🔍 job.applicants =", job.applicants);

    if (job.applicants.length > 0) {
      applicantsData = await Promise.all(
        job.applicants.map(async (applicantEntry) => {
          try {
            let applicantId;

            // 🧠 Decide format: Object or direct ID
            if (
              typeof applicantEntry === "string" ||
              (typeof applicantEntry === "object" && applicantEntry.toString)
            ) {
              // Case: applicantEntry is a direct ID
              applicantId = applicantEntry;
            } else if (
              typeof applicantEntry === "object" &&
              applicantEntry.applicant
            ) {
              // Case: applicantEntry is { applicant: 'studentId' }
              applicantId = applicantEntry.applicant;
            } else {
              console.warn("⚠️ Unrecognized applicant entry:", applicantEntry);
              return null;
            }

            const applicant = await Student.findById(applicantId);
            if (!applicant) {
              console.warn(`Student not found: ${applicantId}`);
              return null;
            }

            return applicant;
          } catch (err) {
            console.error("🔥 Error fetching applicant:", err.message);
            return null;
          }
        })
      );
    }
    console.log("applicantsData", applicantsData);

    return res.status(200).json({
      message: "Job retrieved successfully",
      data: applicantsData.filter(Boolean),
      status: "success",
    });
  } catch (error) {
    console.error("Server Error in getAllStudentsOfJob:", error);
    return res.status(500).json({
      message: "Server Error",
      data: null,
      status: "error",
    });
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

      const recruiter_data = await recruiter.findById(job.recruiter);
      const notificationResponse = await axios.post(
        `${process.env.NOTIFICATION_URL}/createOne`,
        {
          title: "Application Submitted Successfully!",
          message: `Your application for the internship "${job.title}" by ${recruiter_data.name} has been submitted successfully.`,
          link: `/internships/internship/${job._id}`,
          userIds: [user_id],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      logger.info("Notification sent successfully:", notificationResponse.data);

      return res
        .status(200)
        .json({ message: "Successfully applied for the job" });
    } else {
      return res.status(404).json({ message: "Requirements didn't match" });
    }
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
};
