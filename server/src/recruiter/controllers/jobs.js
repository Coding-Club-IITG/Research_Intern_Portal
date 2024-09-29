


 import Jobs from "../models/jobs.js";


 //creating the job 
 const createJob = async(req,res)=>{
  try {
    const { prof_name,title,description,tags,stipend,hours_required,last_date,type,accepting,isActive} = req.body;
    const createJob = await Jobs.create({ prof_name,title,description,tags,stipend,hours_required,last_date,type,accepting,isActive });
    return res.status(201).json(createJob);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
 }

 
 

// getting all job 
const getJob = async (req, res) => {
  try {
    const getAllJobs = await Jobs.find();
    return res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: getAllJobs,
    });
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



//check the condition whether job of user fulfills condition of recruiter
const applyForJob = async (req, res) => {
  try {
      const { job_id, user_id } = req.body;
      let user=await Students.findById(user_id)
      let job=await Jobs.findById(job_id)
      let jobRequirement=job.requirements

      if(jobRequirement.cpi<=user.cpi && jobRequirement.branch==user.branch && jobRequirement.study_year==user.study_year){

          const apply = await Jobs.findByIdAndUpdate(job_id, {$push:{applicants:user_id}});
          if (!apply) {
              return res.status(404).json({ message: "Something went wrong" });
          }
          return res.status(200).json({ message: "Successfully applied for the job" });
      }else{
          return res.status(404).json({ message: "Requirements did't match" });
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
  getJobByfilter
  
};
