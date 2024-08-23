import BadRequest from '../../errors/BadRequest.js';
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
        const { name, areaOfInterest, university, email, socialMedia, phoneNumber, isActive, rating, updateAt, qualifications } = req.body;

        // const recruiter = await Recruiter.findById(id);

        if(areaOfInterest == "" || university=="" || !phoneNumber || !qualifications){
            throw new BadRequest("some fields are empty!!","an empty field is provided");
        }

        const recruiter = await Recruiter.findByIdAndUpdate(
            { _id: id},
            req.body,
            { new: true, runValidators: true }
          )

          if (!recruiter) {
            throw new NotFoundError(`No recruiter with id ${id}`)
          }

          res.status(200).json({ recruiter })

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


