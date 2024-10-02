import logger from '../../utils/logger.js';
import Branch from '../models/course-branches.js';
import Course from '../models/course.js';

export const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find();

        logger.info(`Branches fetched successfully`);
        return res.status(200).json({ status: "success", data: branches, message: "Branches fetched successfully" });
    } catch (error) {
        logger.error(`Error in fetching branches: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const createBranch = async (req, res) => {
    try {
        const { name } = req.body;

        const branch = await Branch.create({ name });

        logger.info(`Branch created successfully`);
        return res.status(201).json({ status: "success", data: branch, message: "Branch created successfully" });
    } catch (error) {
        logger.error(`Error in creating branch: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const branch = await Branch.findByIdAndUpdate(id, { name }, { new: true });

        logger.info(`Branch updated successfully`);
        return res.status(200).json({ status: "success", data: branch, message: "Branch updated successfully" });
    } catch (error) {
        logger.error(`Error in updating branch: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find();

        logger.info(`Courses fetched successfully`);
        return res.status(200).json({ status: "success", data: courses, message: "Courses fetched successfully" });
    } catch (error) {
        logger.error(`Error in fetching courses: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const createCourse = async (req, res) => {
    try {
        const { name } = req.body;

        const course = await Course.create({ name });

        logger.info(`Course created successfully`);
        return res.status(201).json({ status: "success", data: course, message: "Course created successfully" });
    } catch (error) {
        logger.error(`Error in creating course: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const course = await Course.findByIdAndUpdate(id, { name }, { new: true });

        logger.info(`Course updated successfully`);
        return res.status(200).json({ status: "success", data: course, message: "Course updated successfully" });
    } catch (error) {
        logger.error(`Error in updating course: ${error.message}`);
        return res.status(500).json({ status: "error", message: error.message });
    }
}


export {
    getAllBranches,
    createBranch,
    updateBranch,
    getAllCourse,
    createCourse,
    updateCourse
}