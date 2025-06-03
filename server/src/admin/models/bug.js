import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Bug:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the bug report.
 *           example: Button not responding
 *         description:
 *           type: string
 *           description: A detailed description of the bug.
 *           example: The submit button does not respond when clicked.
 *         userId:
 *           type: string
 *           description: The ID of the user who reported the bug. Must be a valid User ID.
 *           example: 60c72b2f5f1b2c001c8e4c67
 *         isResolved:
 *           type: boolean
 *           description: Indicates whether the bug has been resolved.
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the bug was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the bug was last updated.
 *           example: 2023-10-09T14:48:00.000Z
 */

export default mongoose.model("Bug", bugSchema);
