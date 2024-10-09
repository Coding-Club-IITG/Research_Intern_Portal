import mongoose from "mongoose";

const admin = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the admin, must be unique.
 *           example: admin@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the admin account was created.
 *           example: 2024-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the admin account was last updated.
 *           example: 2024-10-09T14:48:00.000Z
 */

export default mongoose.model("Admin", admin);
