import BadRequest from "../../errors/BadRequest.js";
import Recruiter from "../models/recruiter.js";
import bcrypt from "bcrypt";
import NotFound from "../../errors/Notfound.js";
import logger from "../../utils/logger.js";
import { User } from "../../users/model.js";
import jobs from "../models/jobs.js";
import student from "../../students/models/student.js";

const createRecuiter = async (req, res) => {
  try {
    const { name, email } = req.body;
    const recruiter = await Recruiter.create({ name, email });
    logger.info(`Recruiter created successfully with ID ${recruiter?._id}`);
    return res.status(201).json({
      status: "success",
      message: "Recruiter created successfully",
      data: recruiter,
    });
  } catch (err) {
    logger.error(`error creating recruiter ${err}`);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = await student.findById(id);

    if (!studentData) {
      logger.error(`Student not found with ID ${id}`);
      return res
        .status(404)
        .json({ status: "error", message: "Student not found", data: {} });
    }

    logger.info(`Student retrieved successfully with ID ${id}`);

    return res.status(200).json({
      status: "success",
      message: "Student retrieved successfully",
      data: studentData,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    logger.info(`Retrieved ${recruiters.length} recruiters from the database`);
    return res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: recruiters,
    });
  } catch (err) {
    logger.error(`error retrieving recruiters ${err}`);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const getRecruiterById = async (req, res) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      logger.error(`Recruiter not found with ID ${id}`);
      return res
        .status(404)
        .json({ status: "error", message: "Recruiter not found", data: {} });
    }

    logger.info(`Recruiter retrieved successfully with ID ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Recruiter retrieved successfully",
      data: recruiter,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;

    const recruiter = await Recruiter.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recruiter) {
      res.send(404).json({
        status: "error",
        message: "No recruiter found with the provided ID",
        data: {},
      });
    }

    logger.info(`Recruiter updated successfully with ID ${id}`);
    res.status(200).json({
      status: "success",
      message: "Recruiter updated successfully",
      data: recruiter,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const deleteRecruiter = async (req, res) => {
  try {
    // console.log(req?.user);
    const { user_id, connection_id } = req?.user;

    // start mongodb transaction
    const session = await Recruiter.startSession();
    const user_session = await User.startSession();
    const job_session = await jobs.startSession();

    session.startTransaction();
    user_session.startTransaction();
    job_session.startTransaction();

    const options = { session };
    const options_user = { session: user_session };
    const options_job = { session: job_session };

    const user = await User.findById(user_id).session(user_session);
    const recruiter = await Recruiter.findById(connection_id).session(session);

    const allJobs = await jobs
      .find({ recruiter: user.connection_id })
      .session(job_session);

    if (!recruiter || !user) {
      logger.error(`Recruiter not found with ID ${user_id}`);
      return res
        .status(404)
        .json({ status: "error", message: "Recruiter not found", data: {} });
    }

    if (allJobs.length > 0) {
      for (let i = 0; i < allJobs.length; i++) {
        try {
          await jobs.findByIdAndDelete(allJobs[i]._id, options_job);
        } catch (error) {
          console.log(error);
          res.send(500).json({
            status: "error",
            message: "Internal server error",
            data: {},
          });
        }
      }
    }

    await User.findByIdAndDelete(user_id).session(user_session);
    await Recruiter.findByIdAndDelete(connection_id).session(session);

    await session.commitTransaction();
    await user_session.commitTransaction();
    await job_session.commitTransaction();

    session.endSession();
    user_session.endSession();
    job_session.endSession();

    logger.info(`Recruiter deleted successfully with ID ${user_id}`);

    return res.status(200).json({
      status: "success",
      message: "Recruiter deleted successfully",
      data: {},
    });
  } catch (err) {
    console.log(err);
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const acceptStudentForJob = async (req, res) => {
  try {
    const { job_id, student_id } = req.query;
    const job = await jobs.findById(job_id);
    const student_data = await student.findById(student_id);

    if (!job || !student_data) {
      logger.error(
        `Job or Student not found with ID ${job_id} or ${student_id}`
      );
      return res.status(404).json({
        status: "error",
        message: "Job or Student not found",
        data: {},
      });
    }

    job.selected_student.push(student_id);
    job.save();

    await axios.post(`${process.env.NOTIFICATION_URL}/createOne`, {
      title: "Selected for Internship",
      message: `Congratulations! You have been selected for the internship posted by ${recruiter_data.name}. An email has been sent to your Outlook email with the details of the further procedure.`,
      userIds: [student_id],
    });

    await axios.post(`${process.env.EMAIL_URL}/send-email`, {
      emails: [student_data.email],
      subject: "Selected for Internship",
      message: `Congratulations! You have been selected for the internship posted by ${recruiter_data.name}.\n\nRead the following instructions carefully for the furthur procedures:\n\n${furthur_procedure}`,
    });

    logger.info(`Student accepted successfully for job with ID ${job_id}`);

    return res.status(200).json({
      status: "success",
      message: "Student accepted successfully for job",
      data: job,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

const rejectStudentForJob = async (req, res) => {
  try {
    const { job_id, student_id } = req.query;
    const job = await jobs.findById(job_id);
    const student_data = await student.findById(student_id);

    if (!job || !student_data) {
      logger.error(
        `Job or Student not found with ID ${job_id} or ${student_id}`
      );
      return res.status(404).json({
        status: "error",
        message: "Job or Student not found",
        data: {},
      });
    }

    job.rejected_student.push(student_id);
    job.save();

    await axios.post(`${process.env.NOTIFICATION_URL}/createOne`, {
      title: "Application Rejected",
      message: `Your application for the internship created by ${recruiter_data.name} has been rejected.`,
      userIds: [student_id],
    });

    await axios.post(`${process.env.EMAIL_URL}/send-email`, {
      emails: [student_data.email],
      subject: "Rejected for Internship",
      message: `With regret, we inform you that your application for the internship created by ${recruiter_data.name} has been rejected.`,
    });

    logger.info(`Student rejected successfully for job with ID ${job_id}`);

    return res.status(200).json({
      status: "success",
      message: "Student rejected successfully for job",
      data: job,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: {} });
  }
};

export {
  createRecuiter,
  getRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
  getStudentById,
  acceptStudentForJob,
  rejectStudentForJob,
};
