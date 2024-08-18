import Job from '../models/jobs.js';

const createJob = async (req, res) => {
    try {
        const { prof_name, title, description, tags, type, stipend, hours_required, last_date } = req.body;

        const job = await Job.create({ prof_name, title, description, tags, type, stipend, hours_required, last_date });

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

export {
    createJob,
    updateJobById,
    deleteJob,
    getJobById,
    getJob
}


