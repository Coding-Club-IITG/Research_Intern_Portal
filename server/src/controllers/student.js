import Student from '../models/student.js'

const createStudent =  async(req, res)=>{
    try{
        const {name , email , password , rollNo , course , department , cpi , yearOfGrad} = req.body;
        if(
            [name , email , password , rollNo , course , department , cpi , yearOfGrad].some((field)=>{field!==null})
        ) {
           return res.status(400).json({error:true , message:'All fields are necesary'})
        }
        const checkEmail = await Student.find({email:email})
        if(checkEmail) return res.status(400).json({error:true , message:'Student with same email already exists'})
        const newStudent  =  await Student.create({name , email , password , rollNo , course , department , cpi , yearOfGrad , createdAt:Date.now()})
        if(!newStudent) return res.status(500).json({error:true , message:'Student could not be created'})
        return res.status(200).json({error:false , message:'Student Created succesfully'})
    }catch(error){
        console.log(error)
        res.status(500).json({error:true , message:'Internal server error'})
    }
}

const updateStudent  = async (req, res)=>{
   try {
     const {data} = req.body
     const id = req.params.id
 
     const student =  await Student.findById(id)
     if(!student) return res.status(400).json({error:true , message:'No such Student found'})
     
     student.cpi = data.cpi
     student.social = data.social
     student.interest = data.interest
     student.prevEducation = data.prevEducation
     student.resume = data.resume
     student.bio = data.bio
     student.social = data.social
 
     await student.save({validateBeforeSave:false})
     
     return res.status(200).json({error:false ,  message:'Account Updated Successfully'})
 
   } catch (error) {
        return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
   }
}

const deleteStudent = async (req, res)=>{
    try {
        const id = req.params.id
        const password = req.body.password
        const student =  await Student.findById(id)
        
        if(!student) return res.status(400).json({error:true , message:'Student does not exist'})
        
        if(!student.isPasswordCorrect(password)) return res.status(401).josn({error:true , message:'password not correct, unauthorised user'})
        
        const deletedStudent=await Student.findByIdAndDelete(id)
    
        if(!deletedStudent) return res.status(500).josn({error:true, message : ' account not deleted'})
        
        return res.status(201).json({error:false , message: 'deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
    }
}

const getStudentByID = async (req,res)=>{
    try {
        const id =req.param.id
        const student = await Student.findById(id).select('-password')
        if(!student) return res.status(400).json({error:true , message:'Student does not exist'})
        
        return res.status(201).json({error:false , message:'student found' ,data :student})
    } catch (error) {
        return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
    }
}

const getStudents =async (res,req)=>{
    try {
        const student = await Student.find().select('-password').exec()
        return res.status(201).json({error:false , message:'student found' ,data :student || []})
        
    } catch (error) {
        return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})        
    }
}

export{
    getStudentByID,
    getStudents,
    createStudent,
    deleteStudent,
    updateStudent
}