import Updates from "../models/updates";

const createUpdate = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const update = await Updates.create({ title, description, link });
    return res.status(201).json({
      status: "success",
      message: "Update created successfully",
      data: update,
    });
  } catch (err) {
    console.log(err);
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
    return res.status(200).json({
      status: "success",
      message: "Updates retrieved successfully",
      data: updates,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const getUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Updates.findById(id);
    if (!update) {
      return res.status(404).json({
        status: "error",
        message: "Update not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Update retrieved successfully",
      data: update,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const editUpdate = async (req, res) => {
  try {
    const { id } = req.params;
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
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Updates.findByIdAndDelete(id);
    if (!update) {
      return res.status(404).json({
        status: "error",
        message: "Update not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Update deleted successfully",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

export { createUpdate, getUpdates, getUpdateById, editUpdate, deleteUpdate };
