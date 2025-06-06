import mongoose from "mongoose";

const typeOfUser = {
  STUDENT: "student",
  RECRUITER: "recruiter",
  ADMIN: "admin",
};

const UserSchema = new mongoose.Schema({
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
  typeOfUser: {
    type: String,
    enum: Object.values(typeOfUser),
    default: typeOfUser.STUDENT,
  },
  connection_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "typeOfUser",
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs", // Assuming you have a 'Job' model
    },
  ],
});

export default mongoose.model("User", UserSchema);
