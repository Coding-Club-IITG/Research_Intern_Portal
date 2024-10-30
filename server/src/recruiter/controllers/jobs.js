import Jobs from "../models/jobs.js";
import Student from "../../students/models/student.js";
import logger from "../../utils/logger.js";

const createJob = async(req,res)=>{
  try {
    const job = await Jobs.create(req.body);
    return res.status(201).json({ message: "Job created successfully", data: job, status: "success" });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", status: "error", data: null });
  }
}

const getAllJobsOfRecruiter = async (req, res) => { 
  try {
    const { recruiter_id } = req.params;  
    const jobs = await Jobs.find({ recruiter: recruiter_id });

    return res.status(200).json({ message: "Jobs retrieved successfully", data: jobs, status: "success" });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", status: "error", data: null });
  }
};

const getAllAcceptingJobs = async (req, res)=>{
  try {
    const activeJobs = await Jobs.find({accepting:true});
    return res.status(200).json({message:"Accepting Jobs Successfully retrieved",data:activeJobs,status:"success"});
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", status: "error", data: null });
  }
}

const getJob = async (req, res) => {
  try {
    const getAllJobs = await Jobs.find();
    return res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: getAllJobs,
    });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", data: null, status: "error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const job = await Jobs.findById(id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found", data: null, status: "error" });
    }

    return res.status(200).json({ message: "Job retrieved successfully", data: job, status: "success" });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", data: null, status: "error" });
  }
};

const stopAcceptingApplications = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, { accepting: false });
    
    if (!job) {
      return res.status(404).json({ message: "Job not found", data: null, status: "error" });
    }

    return res.status(200).json({ message: "Job applications stopped", data: job, status: "success" });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", data: null, status: "error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, req.body);

    if (!job) {
      return res.status(404).json({ message: "Job not found", data: null, status: "error" });
    }

    return res.status(200).json({ message: "Job updated successfully", data: job, status: "success" });
  }
  catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", data: null, status: "error" });
  }
};

const getAllStudentsOfJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found", data: null, status: "error" });
    }
    const applicantsData = [];

    if(job.applicants.length > 0){
      for (let i = 0; i < job.applicants.length; i++) {
        const student = await Student.findById(job.applicants[i]);
        applicantsData.push(student);
      }
    }

    return res.status(200).json({ message: "Job retrieved successfully", data: applicantsData, status: "success" });
  } catch (error) {
    // console.error(error);
    logger.error(error);
    return res.status(500).json({ message: "Server Error", data: null, status: "error" });
  }
}


const getJobByfilter = async (req, res) => {
  try {
      const data=req.body
      const job = await Jobs.find({$and:[{isActive:true},data]});

      if (job.length==0) {
          return res.status(404).json({ message: "Job not found" });
      }
      return res.status(200).json(job);
  } catch (error) {
      // console.error(error);
      logger.error(error);
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const applyForJob = async (req, res) => {
  try {
      const { job_id, user_id } = req.body;
      let user=await Student.findById(user_id)
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
      // console.error(error);
      logger.error(error);
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  getJob,
  getJobById,
  updateJob,
  createJob,
  applyForJob,
  getJobByfilter,
  getAllJobsOfRecruiter,
  stopAcceptingApplications,
  getAllStudentsOfJob,
  getAllAcceptingJobs
};
