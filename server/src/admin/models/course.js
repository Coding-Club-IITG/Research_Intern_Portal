import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the course.
 *           example: Introduction to Computer Science
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was last updated.
 *           example: 2023-10-09T14:48:00.000Z
 */

export default mongoose.model("Course", courseSchema);