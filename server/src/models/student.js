import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , time:true ,required:true},
    contact:{type:Number , required:true},
    rollNo:{type:Number , required:true},
    college:{type:String , default:'Indian Instituition of Technology, Guwahati'},
    password:{type:String , required:true},
    gender:{type:String,required:true},
    //keeping a default value unless we outsource it for other colleges
    course:{type:String, required:true, enum:[
        'BTech',
        'MTech',
        'BDes',
        'MDes',
        'MA',
        'MSR',
        'MSc',
        'Phd',
        'MBA'
    ]},
    department:{type:String, required:true, enum:[
        'Chemistry',
        'Chemical Enginerring',
        'Computer Science',
        'Design',
        'Humanities and Social Science',
        'Physics',
        'Mathematics',
        'Mehta School of Data Science',
        'Mechanical Engineering',
        'Electrical and Electronics Enginnering',
        'Civil Engineering',
        'Bioscience and Bioengineering',
        'Energy Engineering',
    ]},
    cpi:{type:Number,required:true},
    social:{
        type:[{
            platform:{type:String, required:true},
            url:{type:String, required:true}
        }]
    } , 
    dob:{type:Date , trim:true ,required:true},
    yearOfGrad : {type:Number , required:true},
    resume:{type:String , trim:true , default:''},
    interest:[{type:String}],
    prev_education: {
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
            grade: {
                type: String,
            }
            
        }]
    },
    bio:{type:String},
    prev_experience: {
        type: [{
            role:{type:String,required:true},
            company_college:{type:String,required:true},
            description:{type:String,required:true},
            start_date:{type:Date,required:true},
            end_date:{type:Date,required:true}
        }]
    },
    createdAt:{type:Date , required:true},
    updatedAt:{type:Date , required:true},
}) 
