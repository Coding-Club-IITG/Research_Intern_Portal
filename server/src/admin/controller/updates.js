import logger from "../../utils/logger.js";
import Updates from "../models/updates";

const createUpdate = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const update = await Updates.create({ title, description, link });
    return res.status(201).json(update);
  } catch (err) {
    // console.log(err);
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUpdates = async (req, res) => {
  try {
    const updates = await Updates.find();
    return res.status(200).json(updates);
  } catch (err) {
    // console.log(err);
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Updates.findById(id);
    return res.status(200).json(update);
  } catch (err) {
    // console.log(err);
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const update = await Updates.findById(id);
  } catch (err) {
    // console.log(err);
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    await Updates.findByIdAndDelete(id);
    return res.status(200).json({ message: "Update deleted successfully" });
  } catch (err) {
    // console.log(err);
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createUpdate, getUpdates, getUpdateById, editUpdate, deleteUpdate };
