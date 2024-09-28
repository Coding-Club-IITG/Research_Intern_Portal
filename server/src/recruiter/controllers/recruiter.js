import BadRequest from "../../errors/BadRequest.js";
import Recruiter from "../models/recruiter.js";
import bcrypt from "bcrypt";
import NotFound from "../../errors/Notfound.js"

const createRecuiter = async (req, res) => {
  try {
    const { name, email } = req.body;
    // const hashpassword = await bcrypt.hash(password, 10);
    const recruiter = await Recruiter.create({ name, email });
<<<<<<< HEAD
    return res.status(201).json(recruiter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
=======
    return res.status(201).json({ status: "success", message: "Recruiter created successfully", data: recruiter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
>>>>>>> Dhruv
  }
};

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
<<<<<<< HEAD
    return res.status(200).json(recruiters);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
=======
    return res.status(200).json({ status: "success", message: "Recruiters retrieved successfully", data: recruiters });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
>>>>>>> Dhruv
  }
};

const getRecruiterById = async (req, res) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findById(id);
<<<<<<< HEAD
    return res.status(200).json(recruiter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      areaOfInterest,
      university,
      email,
      socialMedia,
      phoneNumber,
      isActive,
      rating,
      updateAt,
      qualifications,
    } = req.body;

    // const recruiter = await Recruiter.findById(id);
    const recruiter = await Recruiter.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recruiter) {
      throw new NotFound(`No recruiter with id ${id}`);
    }

    res.status(200).json({ recruiter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

=======
    if (!recruiter) {
      throw new NotFound(`No recruiter with id ${id}`);
    }
    return res.status(200).json({ status: "success", message: "Recruiter retrieved successfully", data: recruiter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      areaOfInterest,
      university,
      email,
      socialMedia,
      phoneNumber,
      isActive,
      rating,
      updateAt,
      qualifications,
    } = req.body;

    // const recruiter = await Recruiter.findById(id);
    const recruiter = await Recruiter.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recruiter) {
      throw new NotFound(`No recruiter with id ${id}`);
    }

    res.status(200).json({ status: "success", message: "Recruiter updated successfully", data: recruiter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
  }
};

>>>>>>> Dhruv
const deleteRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    await Recruiter.findByIdAndDelete(id);
<<<<<<< HEAD
    return res.status(200).json({ message: "Recruiter deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
=======
    return res.status(200).json({ status: "success", message: "Recruiter deleted successfully", data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
>>>>>>> Dhruv
  }
};

export {
  createRecuiter,
  getRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
};
