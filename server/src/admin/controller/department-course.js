import logger from "../../utils/logger.js";
import Department from "../models/course-departments.js";
import Course from "../models/course.js";

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    logger.info(`Departments fetched successfully`);
    return res.status(200).json({
      status: "success",
      data: departments,
      message: "Departments fetched successfully",
    });
  } catch (error) {
    logger.error(`Error in fetching departments: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const department = await Department.create({ name });

    logger.info(`Department created successfully`);
    return res.status(201).json({
      status: "success",
      data: department,
      message: "Department created successfully",
    });
  } catch (error) {
    logger.error(`Error in creating department: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await Department.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    logger.info(`Department updated successfully`);
    return res.status(200).json({
      status: "success",
      data: department,
      message: "Department updated successfully",
    });
  } catch (error) {
    logger.error(`Error in updating department: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    logger.info(`Courses fetched successfully`);
    return res.status(200).json({
      status: "success",
      data: courses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    logger.error(`Error in fetching courses: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;

    const course = await Course.create({ name });

    logger.info(`Course created successfully`);
    return res.status(201).json({
      status: "success",
      data: course,
      message: "Course created successfully",
    });
  } catch (error) {
    logger.error(`Error in creating course: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const course = await Course.findByIdAndUpdate(id, { name }, { new: true });

    logger.info(`Course updated successfully`);
    return res.status(200).json({
      status: "success",
      data: course,
      message: "Course updated successfully",
    });
  } catch (error) {
    logger.error(`Error in updating course: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

import mongoose from "mongoose";

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid department ID" });
    }

    const department = await Department.findById(id);
    if (!department) {
      return res
        .status(404)
        .json({ status: "error", message: "Department not found" });
    }

    logger.info(`Department fetched successfully`);
    return res.status(200).json({
      status: "success",
      data: department,
      message: "Department fetched successfully",
    });
  } catch (error) {
    logger.error(`Error in fetching department: ${error.message}`);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// export {
//     getAllDepartments,
//     createDepartment,
//     updateDepartment,
//     getAllCourse,
//     createCourse,
//     updateCourse
// }
