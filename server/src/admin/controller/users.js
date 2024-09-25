import Student from "../../students/models/student";
import Recruiter from "../../recruiters/models/recruiter";
import Jobs from "../../recruiter/models/jobs";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
<<<<<<< HEAD
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
=======
    res.status(200).json({
      status: "success",
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
>>>>>>> Dhruv
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
<<<<<<< HEAD
    res.status(200).json(recruiters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
=======
    res.status(200).json({
      status: "success",
      message: "Recruiters retrieved successfully",
      data: recruiters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
>>>>>>> Dhruv
  }
};

export const allStudentsAppliedForJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.find();
    let students = [];

    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j < allJobs[i].applicants.length; j++) {
        students.push(allJobs[i].applicants[j]);
      }
    }
<<<<<<< HEAD
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
=======
    res.status(200).json({
      status: "success",
      message: "Students who applied for jobs retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
>>>>>>> Dhruv
  }
};
