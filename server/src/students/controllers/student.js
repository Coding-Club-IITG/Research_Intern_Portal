import Student from "../models/student.js";
import Updates from "../../admin/models/updates.js";

const createStudent =  async(req, res)=>{
  try{
      let {name , email , rollNo , course , department , cpi , yearOfGrad} = req.body;
      //frontend team just make sure that none of these values is undefined type
      //also make sure the name attribute of the input fields *EXACTLY* corresponds with these names
      if(
          [name , email , rollNo , course , department , cpi , yearOfGrad].some((field)=>{field!==null && field!==""})
      ) {
         return res.status(400).json({error:true , message:'All fields are necesary'})
      }
      if(typeof rollNo === 'string'){
          rollNo = Number(rollNo)
          if(isNaN(rollNo)) return res.status(400).json({error:true , message:'Roll No should only have Numbers'})
      }
      if(typeof yearOfGrad === 'string'){
          yearOfGrad = Number(yearOfGrad)
          if(isNaN(yearOfGrad)) return res.status(400).json({error:true , message:'Year of Graduation should only have Numbers'})
      }
      if(typeof cpi === 'string'){
          cpi = Number(cpi)
          if(isNaN(cpi)) return res.status(400).json({error:true , message:'CPI should only have Numbers'})
      }
      
      const checkEmail = await Student.find({email:email})
      if(checkEmail.length!==0) return res.status(400).json({error:true , message:'Student with same email already exists'})
      const newStudent  =  await Student.create({name , email , rollNo , course , department , cpi , yearOfGrad , createdAt:Date.now()})
      if(!newStudent) return res.status(500).json({error:true , message:'Student could not be created'})
      return res.status(200).json({error:false , message:'Student Created succesfully'})
  }catch(error){
      console.log(error)
      res.status(500).json({error:true , message:'Internal server error'})
  }
}

const updateStudent  = async (req, res)=>{
 try {
   const data = req.body
   const id = req.params.id
   const student =  await Student.findById(id)
   if(!student) return res.status(400).json({error:true , message:'No such Student found'})

   student.cpi =data.cpi || student.cpi
   student.interest = data.interest || student.interest 
   //in interest we expect an array of strings
   student.prevEducation = data.prevEducation || student.prevEducation
   //in prevEducation we expect an array of objects that consists for the Uni/Clg , Degree , Grade, year Of graduation
   student.resume = data.resume || student.resume
   //in resume we expect a url of the google drive link
   student.bio = data.bio || student.bio
   student.social = data.social || student.social
   //we expect an array of objects that conists of the platform name and url link. 
   student.updatedAt = Date.now()

   await student.save({validateBeforeSave:false})
   
   return res.status(200).json({error:false ,  message:'Account Updated Successfully'})

 } catch (error) {
      return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
 }
}

const deleteStudent = async (req, res)=>{
  try {
      const id = req.params.id
      // const password = req.body.password
      //taking the password so that their is some authentication before deleting the account
      const student =  await Student.findById(id)
      
      if(!student) return res.status(400).json({error:true , message:'Student does not exist'})
      
      // if(!student.isPasswordCorrect(password)) return res.status(401).json({error:true , message:'password not correct, unauthorised user'})
      
      const deletedStudent=await Student.findByIdAndDelete(id)
  
      if(!deletedStudent) return res.status(500).json({error:true, message : ' account not deleted'})
      
      return res.status(201).json({error:false , message: 'deleted successfully'})
      
  } catch (error) {
      return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
  }
}

const getStudentByID = async (req,res)=>{
  try {
      const id =req.params.id
      const student = await Student.findById(id)
      if(!student) return res.status(400).json({error:true , message:'Student does not exist'})
      
      return res.status(201).json({error:false , message:'student found' ,data :student})
  } catch (error) {
      return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})
  }
}

const getStudents =async (req, res)=>{
  try {
      const student = await Student.find().exec()
      return res.status(201).json({error:false , message:'student found' ,data :student || []})
      
  } catch (error) {
      return res.status(500).json({error:true ,  message:'Some Internal Server error occured'})        
  }
}

const getStudentsByFilter = async (req, res)=>{
  try {
      let  {course , department , yearofGrad , rangeUpperCpi , rangeLowerCpi , reqInterests} = req.body
      //making sure some numbers are sent from frontend for cpi, else puting the least and max poaaible value
      if((!rangeLowerCpi) || (!rangeUpperCpi)){
          rangeLowerCpi = 0
          rangeUpperCpi = 100
      }
      //using a array to store only such filters whoch are sent to the server. This removes any filter choice that might be null
      let conditions = []
      if(course) conditions.push({course})
      if(department) conditions.push({department})
      if(yearofGrad) conditions.push({yearofGrad})
      conditions.push({ cpi: { $gte: rangeLowerCpi, $lte: rangeUpperCpi } })
      //db query to filter out the students
      const students =  await Student.find({$and : conditions})
      
      let filteredStudents = []
      students.forEach((student) => {
          let interests = student.interest
          const initialInterest = student.interest
          initialInterest.forEach((interest)=>{
              console.log(interest)
              let interestWords = interest.split(" ")
              interests.push(...interestWords)
          })
          
          let interestCheck = []
          //checking if this student is having any common interest with the sent required intreste
          interestCheck = reqInterests.filter((interest)=>{
            return interests.includes(interest)
          })
          //storing such a stident to the filtered stidents array
          if(interestCheck.length > 0) filteredStudents.push({student}) 
      });
      
      return res.status(200).json({error:false , message:'Search success' , data:filteredStudents || []})
  } catch (error) {
      return res.status(500).json({error:true , message:'Internal Server Error Occured'})
  }
}

const getStudentsApplicationById = async (req, res)=>{
  try {
      const id = req.params.id
      const student = await Student.findById(id).populate('applications').exec()
      if(!student) return res.status(400).json({error:true , message:'Invalid Id' , applicationsList:[]})
      const studentApplicationList = student.applications
      return res.status(200).json({error:false , message:'Success' , applicationsList:studentApplicationList || []})
  } catch (error) {
      return res.status(500).json({error:true , message:'Some Internal Error Occured'})
  }
}

// const addStudentsApplications = async (req, res)=>{
//   try {
//       const {id , internId} = req.params.id
//       //assumed for now that the id for the document of intern post is sent is params
  
//       //checking if the id's sent are true or not
//       const [student , intern] = await Promise.all([
//           Student.findById(id), Updates.findById(internId)
//       ])
//       if(!student) return res.status(401).json({error:true , message:'Invalid Student Id'})
//       if(!intern) return res.status(401).json({error:true , message:'Invalid Intern Id'})
      
//       //checking if the student had already applied ti this intern
//       const applicationsList = student.applications
//       if(applicationsList.includes(internId)) return res.status(400).json({error:true , message:'Already applied'})
      
//       student.applications.push(intern._id)
//       await student.save({validateBeforeSave:false})
//       return res.status(200).json({error:false , message:'Intern Applied'})
//   } catch (error) {
//       return res.status(500).json({error:true , message:'Internal Server Error Occured'})
//   }
// }
//REMOVING THIS CONTROLLER SINCE IT IS HANDLED IN JOBS 



export{
  getStudentByID,
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentsByFilter,
  getStudentsApplicationById,
//   addStudentsApplications
}