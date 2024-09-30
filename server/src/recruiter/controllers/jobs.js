
import { Student } from "../../students/models/student.js";

 import Jobs from "../models/jobs.js";
 import Recruiter from "../models/recruiter.js";


//  {
//   "prof_name":"abcd kumar",
//   "title":"title2",
//   "description":"dij3ec3oiewofire",
//   "tags":["tag4","tag2"],
//   "stipend":12346,
//   "hours_required":10,
//   "last_date":"2024-10-03T15:30:00.000Z",
//   "type":"Flutter",
//   "accepting":true,
//   "isActive":true,
//   "requirements":{"cpi":7 , "department":["Open"], "study_year":3}
// }

 //creating the job 
 const createJob = async(req,res)=>{
  try {
    const { prof_name,title,description,tags,stipend,hours_required,last_date,type,accepting,isActive,requirements} = req.body;
    //requirements:{cpi, department, study_year}
    
    if(typeof stipend !== "number")  return res.status(400).json({message:"Stipend should be a number"})
    if(typeof hours_required !== "number")  return res.status(400).json({message:"Hours should be in number"})

    const createJob = await Jobs.create({ prof_name,title,description,tags,stipend,hours_required,last_date,type,accepting,isActive,requirements });
    return res.status(201).json(createJob);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
 }

 
 

// getting all job 
const getJob = async (req, res) => {
  try {
    let getAllJobs = await Jobs.find({isActive:true ,  accepting:true});
    return res.status(200).json(getAllJobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// getting job by id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //cases for is the job is not active or accepting
    if(!job.isActive) return res.status(400).json('Job is no longer active')
    if(!job.accepting) return res.status(400).json('Job is not accepting anymore')
    
    
    return res.status(200).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};



//deleting job with specific id
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Jobs.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    return res.status(200).json({ job: deletedJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


//job filtering with is condition of whether is it active or not
const getJobByfilter = async (req, res) => {
  try {
      const data=req.body
      const job = await Jobs.find({$and:[{isActive:true},data]});

      if (job.length==0) {
          return res.status(404).json({ message: "Job not found" });
      }
      return res.status(200).json(job);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const updateJob = async(req, res)=>{
  try {
    const {job_id , prof_id} = req.params
    const  {isActive , accepting , hours_required, stipend , requirements} = req.body
  
    const  prof = await Recruiter.findById(prof_id)
    const job = await Jobs.findById(job_id)
  
    if(!job) return res.status(404).json({message:'Job not found'});
    if(!prof) return res.status(404).json({message:'Professor not found'})
    if((job?.prof_name).toLowerCase !== (prof?.name).toLowerCase) return res.status(400).json({message:'Professor can only edit their Job postings'})
    
    job.isActive = isActive!==null?isActive : job.isActive
    job.accepting = accepting!==null?accepting : job.accepting
    job.hours_required = hours_required || job.hours_required
    job.stipend = stipend || job.stipend;
    (job.requirements).cpi = requirements?.cpi ||  (job.requirements).cpi;
    (job.requirements).department = requirements?.department ||  (job.requirements).department;
    (job.requirements).study_year = requirements?.study_year ||  (job.requirements).study_year
  
    await job.save({validateBeforeSave:false})
  
    return res.status(200).json({error:false ,  message:'Job Updated Successfully'})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }

}



//check the condition whether job of user fulfills condition of recruiter
const applyForJob = async (req, res) => {
  try {
      const { job_id, user_id } = req.body;
      let user=await Student.findById(user_id)
      let job=await Jobs.findById(job_id)
      let jobRequirement=job.requirements

      if(jobRequirement.cpi<=user.cpi && 
        (jobRequirement.department.includes(user.department) || jobRequirement.department[1] === 'Open') && 
        jobRequirement.study_year==user.study_year){

          const apply = await Jobs.findByIdAndUpdate(job_id, {$push:{applicants:user_id}});
          if (!apply) {
              return res.status(404).json({ message: "Something went wrong" });
          }
          return res.status(200).json({ message: "Successfully applied for the job" });
      }else{
          return res.status(404).json({ message: "Requirements didn't match" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  getJob,
  getJobById,
  deleteById,
  createJob,
  applyForJob,
  getJobByfilter,
  updateJob
};



//ISSUES : 
//1. In schema of jobs, use Recruiter Ref instead of Prof_name. Then make the necessary change to the createJob()-Do not do it now as it might break the due to change required in multiple files:might cause conflicts
//2. In cwreateJob(), job requirements are not handled but are mentioned in the schema as required=true
//3. In applyForJob(), what if a job is open to all. Presently the way it is handled won't allow anyone to apply in this case
//4. In schema of jobs, use department enum instead of branch like in students. This will keep them on the same page and will also lessen the trouble in above point.
//5. Write a controller for updatingJobs by the profs.
//6. In getJobsByFilter(), the data in the req.body must be tuned to make sure no problem arises while sorting.
//7. In getJobs(), remove the jobs that are not Active or accepting 
