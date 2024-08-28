import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
    cpi: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    study_year: {
        type: Number,
        required: true,
    },
});

const JobSchema = new mongoose.Schema({
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
    applicants: [String],
    
    requirements: requirementSchema,
    accepting: {
        type: Boolean,
        required: true,
        default: true,
    },
    last_date: {
        type: Date,
        required: true,
    }
});

export default mongoose.model("Job", JobSchema);
