import { application } from "express";
import mongoose from "mongoose";
const Jobs = new mongoose.Schema({
  prof_name: {
    type: String,
    required: true,
  },
  title: {
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
  total_applicants: {
    type: Number,
  },
  accepting: {
    type: Boolean,
    required: true,
  },
  last_date: {
    type: Number,
    required: true,
  },
  applications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
});

export default mongoose.model("Jobs", Jobs);
