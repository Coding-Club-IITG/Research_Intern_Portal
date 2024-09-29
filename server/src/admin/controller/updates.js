import logger from "../../utils/logger.js";
import Updates from "../models/updates";

const createUpdate = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const update = await Updates.create({ title, description, link });
    logger.info(`Update created with ID: ${update._id}, title: ${title}`);
    return res.status(201).json(update);
  } catch (err) {
    // console.log(err);
    // logger.error(err);
    logger.error(`Error creating update: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUpdates = async (req, res) => {
  try {
    const updates = await Updates.find();
    logger.info(`Fetched ${updates.length} updates`);
    return res.status(200).json(updates);
  } catch (err) {
    // console.log(err);
    logger.error(`Error fetching updates: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUpdateById = async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Updates.findById(id);
    if (!update) {
      logger.warn(`Update with ID ${id} not found`);
      return res.status(404).json({ message: "Update not found" });
    }
    logger.info(`Fetched update with ID: ${id}`);
    return res.status(200).json(update);
  } catch (err) {
    // console.log(err);
    logger.error(`Error fetching update with ID ${id}: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = req.body;

    const update = await Updates.findById(id);
  } catch (err) {
    // console.log(err);
    logger.error(`Error editing update with ID ${id}: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    await Updates.findByIdAndDelete(id);
    logger.info(`Update with ID ${id} was deleted`);
    return res.status(200).json({ message: "Update deleted successfully" });
  } catch (err) {
    // console.log(err);
    logger.error(`Error deleting update with ID ${id}: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createUpdate, getUpdates, getUpdateById, editUpdate, deleteUpdate };
