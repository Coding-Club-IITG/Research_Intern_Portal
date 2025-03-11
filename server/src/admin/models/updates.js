import mongoose from "mongoose";

const Updates = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Update:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the update.
 *           example: New Course Launch
 *         description:
 *           type: string
 *           description: A detailed description of the update.
 *           example: We are launching a new course on Web Development.
 *         link:
 *           type: string
 *           description: A link to more information about the update.
 *           example: https://www.example.com/updates/new-course-launch
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the update is active or not.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the update was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the update was last modified.
 *           example: 2023-10-09T14:48:00.000Z
 */


export default mongoose.model("Updates", Updates);
