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
<<<<<<< HEAD
        default:0
=======
>>>>>>> 2959bc05554a4476772b313ad6d9889154832464
    },
    accepting:{
        type:Boolean,
        required:true,
<<<<<<< HEAD
        default:true
    },
    last_date:{
        type:Date,
=======
    },
    last_date:{
        type:Number,
>>>>>>> 2959bc05554a4476772b313ad6d9889154832464
        required:true,
    }

});

export default mongoose.model("Jobs", Jobs);