import Recruiter from "../../recruiter/models/recruiter";
import Student from "../../student/models/student";
import Jobs from "../../recruiter/models/jobs";

export const verifyRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);
    if (!recruiter) {
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    recruiter.isVerified = true;
    await recruiter.save();

    return res.status(200).json({
      status: "success",
      message: "Recruiter verified successfully",
      data: recruiter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });    
  }
};

export const removeRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    await recruiter.remove();

    return res.status(200).json({
      status: "success",
      message: "Recruiter removed successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};


export const removeStudent = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(id);

    await student.remove();

    return res.status(200).json({
      status: "success",
      message: "Student removed successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

export const banRecruiter = async (req, res) => {
  try {
    const { id } = req.body;
    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).json({
        status: "error",
        message: "Recruiter not found",
        data: null,
      });
    }

    recruiter.isActive = false;
    await recruiter.save();

    return res.status(200).json({
      status: "success",
      message: "Recruiter banned successfully",
      data: recruiter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    const job = await Jobs.findById(id);

    await job.remove();

    return res.status(200).json({
      status: "success",
      message: "Job removed successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
