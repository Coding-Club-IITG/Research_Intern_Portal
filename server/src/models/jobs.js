import mongoose from "mongoose";
const Jobs = new mongoose.Schema({
    prof_name:{
type:String,
required:true
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
    tags:[String],
    type:{
    type:String,
        required:true,
    }
    ,
    stipend:{
        type:Number,
        required:true
    },
    hours_required:{
        type:Number,
        required:true,

    },
    total_applicants:{
        type:Number,
        default:0
    },
    accepting:{
        type:Boolean,
        required:true,
        default:true
    },
    last_date:{
        type:Date,
        required:true,
    }

});

export default mongoose.model("Jobs", Jobs);