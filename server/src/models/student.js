import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const studentSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , time:true ,required:true,unique:true},
    phoneNumber:{type:Number , required:true},
    rollNo:{type:Number , required:true},
    college:{type:String , default:'Indian Instituition of Technology, Guwahati'},
    //keeping a default value unless we outsource it for other colleges
    password:{type:String , required:true},
    gender:{type:String},
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
    dob:{type:Date , trim:true},
    yearOfGrad : {type:Number , required:true},
    resume:{type:String , trim:true , default:''},
    interest:{
        type:[{field:{type:String}}]
    },
    prevEducation: {
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
    prevExperience: {
        type: [{
            role:{type:String,required:true},
            company_college:{type:String,required:true},
            description:{type:String,required:true},
            start_date:{type:Date,required:true},
            end_date:{type:Date,required:true}
        }]
    },
    applications:{
        type:[{type:mongoose.Schema.Types.ObjectId , ref:'Updates'}]
    },
    createdAt:{type:Date , required:true},
    updatedAt:{type:Date},
}) 


studentSchema.pre("save", async function(next){
    try{
        if(!(this.isModified("password")))
            return next();
        this.password=await bcrypt.hash(this.password, 10);
        next()
    }
    catch(error){
        console.log("Errorr in hashing password\n" , error)
        return false
    }
} )


studentSchema.methods.isPasswordCorrect = async function(password){
    try{
     return await bcrypt.compare(password, this.password)
    }catch(error){
     console.log('Error in Comparing using bcrypt')
     return false
    }
 }

export const Student  =  mongoose.model('Student' , studentSchema)
