import Job from '../models/jobs.js';
import Students from '../models/students.js';
const createJob = async (req, res) => {
    try {
        const { prof_name, title, description, tags, type, stipend, hours_required, last_date, requirements } = req.body;

        const job = await Job.create({ prof_name, title, description, tags, type, stipend, hours_required, last_date,requirements });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ message: "Create job success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body
        const job = await Job.findByIdAndUpdate(id, { ...update });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ message: "Update success" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndDelete(id)
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ message: "Delete success" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getJob = async (req, res) => {
    try {
        const job = await Job.find();
        if (job.length==0) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
const getJobbyfilter = async (req, res) => {
    try {
        const data=req.body
        const job = await Job.find({$and:[{isActive:true},data]});

        if (job.length==0) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const applyforjob = async (req, res) => {
    try {
        const { job_id, user_id } = req.body;
        let user=await Students.findById(user_id)
        let job=await Job.findById(job_id)
        let jobrequirement=job.requirements

        if(jobrequirement.cpi<=user.cpi && jobrequirement.branch==user.branch && jobrequirement.study_year==user.study_year){

            const apply = await Job.findByIdAndUpdate(job_id, {$push:{applicants:user_id}});
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
    createJob,
    updateJobById,
    deleteJob,
    getJobById,
    getJob,
    getJobbyfilter,
    applyforjob
}


