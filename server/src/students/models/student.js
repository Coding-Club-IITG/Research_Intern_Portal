import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    time: true,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
  },
  rollNo: {
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
  // course: {
  //   type: String,
  //   enum: ["BTech", "MTech", "BDes", "MDes", "MA", "MSR", "MSc", "Phd", "MBA"],
  // },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  cpi: {
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
  dob: {
    type: Date,
  },
  yearOfGrad: {
    type: Number,
  },
  resume: {
    type: String,
    default: "",
  },
  interest: {
    type: [{ field: { type: String } }],
  },
  prevEducation: {
    type: [
      {
        degree: {
          type: String,
        },
        year: {
          type: Number,
        },
        college: {
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
  prevExperience: {
    type: [
      {
        role: {
          type: String,
        },
        company_college: {
          type: String,
        },
        description: {
          type: String,
        },
        start_date: {
          type: Date,
        },
        end_date: {
          type: Date,
        },
      },
    ],
  },
  applications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Updates" }],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model("Student", studentSchema);
