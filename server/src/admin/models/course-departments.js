import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
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
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the department.
 *           example: Main Department
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the department was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the department was last updated.
 *           example: 2023-10-09T14:48:00.000Z
 */

export default mongoose.model("Department", departmentSchema);
