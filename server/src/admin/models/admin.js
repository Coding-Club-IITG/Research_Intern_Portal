import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The unique email of the admin.
 *           example: johndoe@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the admin was created.
 *           example: 2023-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the admin was last updated.
 *           example: 2023-10-09T14:48:00.000Z
 */

export default mongoose.model("Admin", adminSchema);