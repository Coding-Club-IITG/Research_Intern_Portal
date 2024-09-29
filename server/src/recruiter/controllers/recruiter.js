import BadRequest from "../../errors/BadRequest.js";
import Recruiter from "../models/recruiter.js";
import bcrypt from "bcrypt";
import NotFound from "../../errors/Notfound.js"
import logger from "../../utils/logger.js";

const createRecuiter = async (req, res) => {
  try {
    const { name, email } = req.body;
    const recruiter = await Recruiter.create({ name, email });
    logger.info(`Recruiter created successfully with ID ${recruiter?._id}`);
    return res.status(201).json({ status: "success", message: "Recruiter created successfully", data: recruiter });
  } catch (err) {
    logger.error(`error creating recruiter ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    logger.info(`Retrieved ${recruiters.length} recruiters from the database`);
    return res.status(200).json({ status: "success", message: "Recruiters retrieved successfully", data: recruiters });
  } catch (err) {
    logger.error(`error retrieving recruiters ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

const getRecruiterById = async (req, res) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findById(id);
    if (!recruiter) {
      throw new NotFound(`No recruiter with id ${id}`);
    }
    logger.info(`Recruiter found with ID ${id}`);
    return res.status(200).json({ status: "success", message: "Recruiter retrieved successfully", data: recruiter });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      areaOfInterest,
      university,
      email,
      socialMedia,
      phoneNumber,
      isActive,
      rating,
      updateAt,
      qualifications,
    } = req.body;

    // const recruiter = await Recruiter.findById(id);
    const recruiter = await Recruiter.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recruiter) {
      throw new NotFound(`No recruiter with id ${id}`);
    }
    logger.info(`Recruiter updated successfully with ID ${id}`);
    res.status(200).json({ status: "success", message: "Recruiter updated successfully", data: recruiter });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

const deleteRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    await Recruiter.findByIdAndDelete(id);
    logger.info(`Recruiter deleted successfully with ID ${id}`);
    return res.status(200).json({ status: "success", message: "Recruiter deleted successfully", data: {} });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

export {
  createRecuiter,
  getRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
};
