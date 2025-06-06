import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
  cpi: {
    type: Number,
    required: true,
  },
  department: {
    type: [String],
    default:"Computer Science",
    // required: true,
  },
  study_year: {
    type: Number,
    required: true,
  },
});

const ApplicantStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prof_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  tags: [String],
  type: {
    type: String,
    required: true,
  },
  stipend: {
    type: Number,
    required: true,
  },
  hours_required: {
    type: Number,
    required: true,
  },
  applicants:{
    type: [String]
  },

  selected_student: {
    type: [String],
  },

  rejected_student: {
    type: [String],
  },

  requirements: requirementSchema,

  accepting: {
    type: Boolean,
    default: true,
    required: true,
  },
  last_date: {
    type: Date,
    required: true,
  },
  recruiter: {
    type: String,
    required: true,
  },
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Requirement:
 *       type: object
 *       required:
 *         - cpi
 *         - department
 *         - study_year
 *       properties:
 *         cpi:
 *           type: number
 *           description: The minimum CPI requirement for the job.
 *           example: 7.5
 *         department:
 *           type: string
 *           description: The department of study required for the job.
 *           example: Computer Science
 *         study_year:
 *           type: number
 *           description: The study year required for the job.
 *           example: 3
 *     Job:
 *       type: object
 *       required:
 *         - prof_name
 *         - title
 *         - description
 *         - type
 *         - stipend
 *         - hours_required
 *         - last_date
 *       properties:
 *         prof_name:
 *           type: string
 *           description: The name of the professor offering the job.
 *           example: Dr. Smith
 *         title:
 *           type: string
 *           description: The title of the job position.
 *           example: Research Assistant
 *         description:
 *           type: string
 *           description: A detailed description of the job.
 *           example: Assist in research projects and data analysis.
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the job is currently active.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the job was created.
 *           example: 2024-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the job was last updated.
 *           example: 2024-10-09T14:48:00.000Z
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the job for easier searching.
 *           example: [ "internship", "research", "computer science" ]
 *         type:
 *           type: string
 *           description: The type of job (e.g., internship, part-time).
 *           example: Internship
 *         stipend:
 *           type: number
 *           description: The stipend amount for the job.
 *           example: 5000
 *         hours_required:
 *           type: number
 *           description: The number of hours required per week for the job.
 *           example: 20
 *         applicants:
 *           type: array
 *           items:
 *             type: string
 *           description: List of applicants who applied for the job.
 *           example: [ "user1@example.com", "user2@example.com" ]
 *         requirements:
 *           $ref: '#/components/schemas/Requirement'
 *         accepting:
 *           type: boolean
 *           description: Indicates whether the job is accepting applications.
 *           example: true
 *         last_date:
 *           type: string
 *           format: date-time
 *           description: The last date to apply for the job.
 *           example: 2024-11-30T00:00:00.000Z
 */

export default mongoose.model("Jobs", JobSchema);
