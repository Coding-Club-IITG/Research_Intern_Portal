import Recruiter from '../models/recruiter.js';
import bcrypt from 'bcrypt';


const createRecuiter = async (req,res) => {
    try{
        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const recruiter = await Recruiter.create({ name, email, password: hashpassword });
        return res.status(201).json(recruiter);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}


const getRecruiters = async (req,res) => {
    try{
        const recruiters = await Recruiter.find();
        return res.status(200).json(recruiters);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

const getRecruiterById = async (req,res) => {
    try{
        const { id } = req.params;
        const recruiter = await Recruiter.findById(id);
        return res.status(200).json(recruiter);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}



const updateRecruiter = async (req,res) => {
    try{
        const { id } = req.params;
        const { data } = req.body;

        const recruiter = await Recruiter.findById(id);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteRecruiter = async (req,res) => {
    try{
        const { id } = req.params;
        await Recruiter.findByIdAndDelete(id);
        return res.status(200).json({message: "Recruiter deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}



export {
    createRecuiter,
    getRecruiters,
    getRecruiterById,
    updateRecruiter,
    deleteRecruiter
}


