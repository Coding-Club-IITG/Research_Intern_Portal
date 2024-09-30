
import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
    cpi: {
        type: Number,
        required: true,
        default: 0
    },
    department:[ {
        type: String,
        enum: [
          "Chemistry",
          "Chemical Enginerring",
          "Computer Science",
          "Design",
          "Humanities and Social Science",
          "Physics",
          "Mathematics",
          "Mehta School of Data Science",
          "Mechanical Engineering",
          "Electrical and Electronics Enginnering",
          "Civil Engineering",
          "Bioscience and Bioengineering",
          "Energy Engineering",
          "Open"
        ],
      }],
      //making it an array of deptpartments as there might be multiple diciples eligible for the intern
      //it will also allow the intern to be open to all
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
         default: true,
        required: true,
        
    },
    last_date: {
        type: Date,
        required: true,
    },
    skills : [{type:String}],
    whoCanApply : [{type:String}]
});

export default mongoose.model("Jobs", JobSchema);