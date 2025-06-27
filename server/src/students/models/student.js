import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
  },
  roll: {
    type: Number,
  },
  college: {
    type: String,
    default: "Indian Instituition of Technology, Guwahati",
  },
  //keeping a default value unless we outsource it for other colleges
  gender: {
    type: String,
  },
  course: {
    type: String,
  },
  department: {
    type: String,
  },
  // course: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Course",
  // },
  // department: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Department",
  // },
  CGPA: {
    type: Number,
  },
  social: {
    type: [
      {
        platform: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  DOB: {
    type: String,
  },
  yearOfGrad: {
    type: String,
  },
  resume: {
    type: String,
    default: "",
  },
  interests: {
    type: [{ type: String }],
  },
  educations: {
    type: [
      {
        role: {
          type: String,
        },
        description: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        name: {
          type: String,
        },
        grade: {
          type: String,
        },
      },
    ],
  },
  bio: {
    type: String,
  },
  experiences: {
    type: [
      {
        role: {
          type: String,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
      },
    ],
  },
  achievements: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  applications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Updates" }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isUpdated:{
    type: Boolean,
    default: false,
  },
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Social:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *           description: The name of the social media platform.
 *           example: LinkedIn
 *         url:
 *           type: string
 *           description: The URL of the social media profile.
 *           example: https://www.linkedin.com/in/johndoe
 *     PreviousEducation:
 *       type: object
 *       properties:
 *         degree:
 *           type: string
 *           description: The degree obtained in previous education.
 *           example: Bachelor of Technology
 *         year:
 *           type: number
 *           description: The year in which the degree was obtained.
 *           example: 2020
 *         college:
 *           type: string
 *           description: The name of the college or university attended.
 *           example: Indian Institute of Technology
 *         grade:
 *           type: string
 *           description: The grade obtained in the degree.
 *           example: A
 *     PreviousExperience:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           description: The role held in previous experience.
 *           example: Intern
 *         company_college:
 *           type: string
 *           description: The company or college where the experience was gained.
 *           example: ABC Technologies
 *         description:
 *           type: string
 *           description: A brief description of the responsibilities.
 *           example: Worked on developing a machine learning model.
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the experience.
 *           example: 2021-06-01
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the experience.
 *           example: 2021-08-01
 *     Interest:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *           description: Area of interest of the student.
 *           example: Artificial Intelligence
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - createdAt
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the student.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email address of the student.
 *           example: john.doe@example.com
 *         phoneNumber:
 *           type: number
 *           description: The phone number of the student.
 *           example: 1234567890
 *         rollNo:
 *           type: number
 *           description: The roll number assigned to the student.
 *           example: 123456
 *         college:
 *           type: string
 *           description: The college of the student.
 *           example: Indian Institute of Technology, Guwahati
 *         gender:
 *           type: string
 *           description: The gender of the student.
 *           example: Male
 *         course:
 *           type: string
 *           description: The course the student is enrolled in.
 *           example: 60c72b2f9b1e8e1b8d6a5573
 *         department:
 *           type: string
 *           description: The department of the student.
 *           example: 60c72b2f9b1e8e1b8d6a5574
 *         cpi:
 *           type: number
 *           description: The Cumulative Performance Index of the student.
 *           example: 8.5
 *         social:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Social'
 *           description: List of social media profiles associated with the student.
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the student.
 *           example: 2000-01-01
 *         yearOfGrad:
 *           type: number
 *           description: The expected year of graduation.
 *           example: 2024
 *         resume:
 *           type: string
 *           description: A link to the student's resume.
 *           example: https://example.com/resume.pdf
 *         interest:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Interest'
 *           description: Areas of interest for the student.
 *         prevEducation:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PreviousEducation'
 *           description: List of previous education qualifications.
 *         bio:
 *           type: string
 *           description: A brief biography of the student.
 *           example: Passionate about technology and innovation.
 *         prevExperience:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PreviousExperience'
 *           description: List of previous work or educational experiences.
 *         applications:
 *           type: array
 *           items:
 *             type: string
 *           description: List of application IDs related to updates.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student was created.
 *           example: 2024-10-09T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student's information was last updated.
 *           example: 2024-10-09T14:48:00.000Z
 */

export default mongoose.model("Student", studentSchema);
