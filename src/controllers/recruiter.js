import BadRequest from '../errors/BadRequest.js';
import Recruiter from '../models/recruiter.js';
import bcrypt from 'bcrypt';

const createRecuiter = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a recruiter with the same name or email already exists
        const existingRecruiter = await Recruiter.findOne({
            $or: [{ name }, { email }]
        });

        if (existingRecruiter) {
            return res.status(400).json({ message: "Recruiter with this name or email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const recruiter = await Recruiter.create({
            name,
            email,
            password: hashedPassword
        });
        
        return res.status(201).json(recruiter);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



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
        const { name, areaOfInterest, university, email, socialMedia, phoneNumber, isActive,password, rating, qualifications } = req.body;

        const recruiter1 = await Recruiter.findById(id);
        if(!recruiter1){
            throw new NotFoundError(`No recruiter with id ${id}`)
        }

        // Check if the new name or email is already taken by another recruiter
        if (name || email) {
            const existingRecruiter = await Recruiter.findOne({
                $or: [{ name }, { email }],
                _id: { $ne: id } // Exclude the current recruiter being updated
            });

            if (existingRecruiter) {
                return res.status(400).json({ message: 'Name or email already in use by another recruiter' });
            }
        }

        // Additional checks for empty fields
        if (!university) {
            return res.status(400).json({ message: "University is required." });
        }

        if (!areaOfInterest || areaOfInterest.length === 0) {
            return res.status(400).json({ message: "Area of interest must not be empty." });
        }

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        if (!qualifications || qualifications.length === 0) {
            return res.status(400).json({ message: "Qualifications must not be empty." });
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


