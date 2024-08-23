import Student from "../../students/models/student";
import Recruiter from "../../recruiters/models/recruiter";
import Jobs from "../../recruiter/models/jobs";

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await Recruiter.find();
        res.status(200).json(recruiters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const allStudentsAppliedForJobs = async(req,res)=>{
    try{
        const allJobs = await Jobs.find();
        let students = [];
    
        for(let i=0; i<allJobs.length; i++){
            for(let j = 0; j<allJobs[i].applicants.length; j++){
                students.push(allJobs[i].applicants[j]);
            }
        }
        res.status(200).json(students);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


