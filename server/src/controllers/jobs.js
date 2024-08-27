

 import Jobs from "../models/jobs.js";


 //creating the job 
 const createJob = async(req,res)=>{
  try {
    const { prof_name,title,description,tags,stipend,hours_required,last_date,type} = req.body;
    const createJob = await Jobs.create({ prof_name,title,description,tags,stipend,hours_required,last_date,type });
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

export {
  getJob,
  getJobById,
  deleteById,
  createJob
};
