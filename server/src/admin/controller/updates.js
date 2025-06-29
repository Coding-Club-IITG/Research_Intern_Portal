import logger from "../../utils/logger.js";
import Updates from "../models/updates.js";
import axios from "axios";
const createUpdate = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const update = await Updates.create({ title, description, link });
    await axios.post(`${process.env.NOTIFICATION_URL}/create`, 
      { 
        title: title, 
        message: `A new internship opportunity has been posted by ${recruiter_data.name}.\nClick on "View More" to know more about the internship.`,
        link: link });
    logger.info(`Update created with ID: ${update._id}, title: ${title}`);
    return res.status(201).json({
      status: "success",
      message: "Update created successfully",
      data: update,
    });
  } catch (err) {
    logger.error(`Error creating update: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const getUpdates = async (req, res) => {
  try {
    const updates = await Updates.find();
    logger.info(`Fetched ${updates.length} updates`);
    return res.status(200).json({
      status: "success",
      message: "Updates retrieved successfully",
      data: updates,
    });
  } catch (err) {
    logger.error(`Error fetching updates: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const getUpdateById = async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Updates.findById(id);
    if (!update) {
        logger.warn(`Update with ID ${id} not found`);
      return res.status(404).json({
        status: "error",
        message: "Update not found",
        data: null,
      });
    }
    logger.info(`update retrieved successfully!`);
    return res.status(200).json({
      status: "success",
      message: "Update retrieved successfully",
      data: update,
    });
  } catch (err) {
    logger.error(`Error fetching update with ID ${id}: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const editUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = req.body;

    const update = await Updates.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).json({
        status: "error",
        message: "Update not found",
        data: null,
      });
    }
    
    return res.status(200).json({
      status: "success",
      message: "Update edited successfully",
      data: update,
    });
  } catch (err) {
logger.error(`Error editing update with ID ${id}: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    const update = await Updates.findByIdAndDelete(id);
    if (!update) {
        logger.warn(`update not found!`);
        return res.status(404).json({
            status: "error",
            message: "Update not found",
            data: null,
        });
    }
    logger.info(`Update with ID ${id} was deleted`);
    return res.status(200).json({
      status: "success",
      message: "Update deleted successfully",
      data: null,
    });
  } catch (err) {
    logger.error(`Error deleting update with ID ${id}: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

export { createUpdate, getUpdates, getUpdateById, editUpdate, deleteUpdate };
