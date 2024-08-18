import e from "express";
import mongoose from "mongoose";

const Recruiter = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    areaOfInterest: {
        type: [String],
    },
    university: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    socialMedia: {
        linkedIn: {
            type: String,
        },
        twitter: {
            type: String,
        },
    },
    phoneNumber: {
        type: Number,
        required: true
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
    password: {
        type: String,
        required: true,
    },
    qualifications: {
        type: [{
            degree: {
                type: String,
            },
            year: {
                type: Number,
            },
            college: {
                type: String,
            },
            comments: {
                type: String,
            }
        }],
    },
<<<<<<< HEAD
 department:{
type:String,
required:true
 } , 
=======
    posted: {
        type: Number
    },
    hired: {
        type: Number
    },
    portfolio: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    }
>>>>>>> 2959bc05554a4476772b313ad6d9889154832464

})

export default mongoose.model("Recruiter", Recruiter);