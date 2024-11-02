import mongoose from "mongoose";

const Recruiter = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  areaOfInterest: {
    type: [String],
  },
  university: {
    type: String,
  },
  email: {
    type: String,
    unqiue: true,
    required: true,
  },
  department: {
    type: String,
  },
  socialMedia: {
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    website: {
      type: String
    }
  },
  phoneNumber: {
    type: Number,
    // required: true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 5,
  },
  qualifications: {
    type: [
      {
        degree: {
          type: String,
        },
        startYear: {
          type: Number,
        },
        endYear: {
          type: Number,
        },
        college: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Qualification:
 *       type: object
 *       properties:
 *         degree:
 *           type: string
 *           description: The degree obtained by the recruiter.
 *           example: Bachelor of Technology
 *         year:
 *           type: number
 *           description: The year in which the degree was obtained.
 *           example: 2020
 *         college:
 *           type: string
 *           description: The name of the college or university.
 *           example: Indian Institute of Technology
 *         comments:
 *           type: string
 *           description: Any additional comments related to the qualification.
 *           example: Graduated with honors
 *     Recruiter:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the recruiter.
 *           example: John Doe
 *         areaOfInterest:
 *           type: array
 *           items:
 *             type: string
 *           description: Areas of interest for the recruiter.
 *           example: [ "Data Science", "Machine Learning" ]
 *         university:
 *           type: string
 *           description: The university from which the recruiter graduated.
 *           example: Stanford University
 *         email:
 *           type: string
 *           description: The email address of the recruiter.
 *           example: john.doe@example.com
 *         socialMedia:
 *           type: object
 *           properties:
 *             linkedIn:
 *               type: string
 *               description: The LinkedIn profile URL of the recruiter.
 *               example: https://www.linkedin.com/in/johndoe
 *             twitter:
 *               type: string
 *               description: The Twitter handle of the recruiter.
 *               example: https://twitter.com/johndoe
 *         phoneNumber:
 *           type: number
 *           description: The phone number of the recruiter.
 *           example: 1234567890
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the recruiter is active.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the recruiter was created.
 *           example: 2024-10-09T14:48:00.000Z
 *         updateAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the recruiter's information was last updated.
 *           example: 2024-10-09T14:48:00.000Z
 *         rating:
 *           type: number
 *           description: The rating of the recruiter.
 *           example: 4.5
 *         qualifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Qualification'
 *           description: List of qualifications obtained by the recruiter.
 *         isVerified:
 *           type: boolean
 *           description: Indicates whether the recruiter has been verified.
 *           example: false
 *         jobs:
 *           type: array
 *           items:
 *             type: string
 *             description: An array of job IDs associated with the recruiter.
 *           example: [ "60c72b2f9b1e8e1b8d6a5573", "60c72b2f9b1e8e1b8d6a5574" ]
 */

export default mongoose.model("Recruiter", Recruiter);
