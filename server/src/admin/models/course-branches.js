import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
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
 *     Branch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the branch.
 *           example: Main Branch
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the branch was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the branch was last updated.
 *           example: 2023-10-09T14:48:00.000Z
 */

export default mongoose.model("Branch", branchSchema);