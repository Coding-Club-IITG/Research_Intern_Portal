import Student from "../models/student.js";
import Updates from "../../admin/models/updates.js";

const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNo,
      course,
      department,
      cpi,
      yearOfGrad,
    } = req.body;
    //frontend team just make sure that none of these values is undefined type
    //also make sure the name attribute of the input fields *EXACTLY* corresponds with these names
    if (
      [name, email, password, rollNo, course, department, cpi, yearOfGrad].some(
        (field) => {
          field !== null && field !== "";
        },
      )
    ) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ error: true, message: "All fields are necesary" });
    }
    const checkEmail = await Student.find({ email: email });
    if (checkEmail)
      return res
        .status(400)
        .json({
          error: true,
          message: "Student with same email already exists",
        });
=======
      return res.status(400).json({
        error: true,
        status: "error",
        message: "All fields are necessary",
        data: {},
      });
    }
    const checkEmail = await Student.find({ email: email });
    if (checkEmail)
      return res.status(400).json({
        error: true,
        status: "error",
        message: "Student with same email already exists",
        data: {},
      });
>>>>>>> Dhruv
    const newStudent = await Student.create({
      name,
      email,
      password,
      rollNo,
      course,
      department,
      cpi,
      yearOfGrad,
      createdAt: Date.now(),
    });
    if (!newStudent)
      return res
        .status(500)
<<<<<<< HEAD
        .json({ error: true, message: "Student could not be created" });
    return res
      .status(200)
      .json({ error: false, message: "Student Created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
=======
        .json({ error: true, status: "error", message: "Student could not be created", data: {} ,});
      return res
        .status(200) 
        .json({ error: false, status: "success", message: "Student Created successfully", data: {newStudent} ,});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error", data: {} });
>>>>>>> Dhruv
  }
};

const updateStudent = async (req, res) => {
  try {
    const { data } = req.body;
    const id = req.params.id;

    const student = await Student.findById(id);
    if (!student)
<<<<<<< HEAD
      return res
        .status(400)
        .json({ error: true, message: "No such Student found" });
=======
      return res.status(400).json({
        status: "error",
        message: "No such Student found",
        data: {},
      });
>>>>>>> Dhruv

    student.cpi = data.cpi;
    student.interest = data.interest;
    //in interest we expect an array of strings
    student.prevEducation = data.prevEducation;
    //in prevEducation we expect an array of objects that consists for the Uni/Clg , Degree , Grade, year Of graduation
    student.resume = data.resume;
    //in resume we expect a url of the google drive link
    student.bio = data.bio;
    student.social = data.social;
    //we expect an array of objects that conists of the platform name and url link.
    student.updatedAt = Date.now();

    await student.save({ validateBeforeSave: false });

    return res
      .status(200)
<<<<<<< HEAD
      .json({ error: false, message: "Account Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Some Internal Server error occured" });
=======
      .json({ error: false, status: "success", message: "Account Updated Successfully", data: student, });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, status: "error" , message: "Some Internal Server error occured" , data: {}, });
>>>>>>> Dhruv
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    //taking the password so that their is some authentication before deleting the account
    const student = await Student.findById(id);

    if (!student)
<<<<<<< HEAD
      return res
        .status(400)
        .json({ error: true, message: "Student does not exist" });

    if (!student.isPasswordCorrect(password))
      return res
        .status(401)
        .json({
          error: true,
          message: "password not correct, unauthorised user",
        });
=======
      return res.status(400).json({
        status: "error",
        message: "Student does not exist",
        data: {},
      });

    if (!student.isPasswordCorrect(password))
      return res.status(401).json({
        status: "error",
        message: "Password not correct, unauthorized user",
        data: {},
      });      
>>>>>>> Dhruv

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent)
<<<<<<< HEAD
      return res
        .status(500)
        .json({ error: true, message: " account not deleted" });

    return res
      .status(201)
      .json({ error: false, message: "deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Some Internal Server error occured" });
=======
      return res.status(500).json({
        status: "error",
        message: "Account not deleted",
        data: {},
      });      

      return res.status(201).json({
        status: "success",
        message: "Deleted successfully",
        data: {},
      });
      
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server error occurred",
      data: {},
    });
    
>>>>>>> Dhruv
  }
};

const getStudentByID = async (req, res) => {
  try {
    const id = req.param.id;
    const student = await Student.findById(id).select("-password");
    if (!student)
<<<<<<< HEAD
      return res
        .status(400)
        .json({ error: true, message: "Student does not exist" });

    return res
      .status(201)
      .json({ error: false, message: "student found", data: student });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Some Internal Server error occured" });
=======
      return res.status(400).json({
        status: "error",
        message: "Student does not exist",
        data: {},
      });      

      return res.status(201).json({
        status: "success",
        message: "Student found",
        data: student,
      });
      
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server error occurred",
      data: {},
    });
    
>>>>>>> Dhruv
  }
};

const getStudents = async (res, req) => {
  try {
    const student = await Student.find().select("-password").exec();
<<<<<<< HEAD
    return res
      .status(201)
      .json({ error: false, message: "student found", data: student || [] });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Some Internal Server error occured" });
=======
    return res.status(201).json({
      status: "success",
      message: "Student found",
      data: student || [],
    });
    
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server error occurred",
      data: {},
    });
    
>>>>>>> Dhruv
  }
};

const getStudentsByFilter = async (req, res) => {
  try {
    let { course, department, yearofGrad, rangeUpperCpi, rangeLowerCpi } =
      req.body;
    //making sure some numbers are sent from frontend for cpi, else puting the least and max poaaible value
    if (!rangeLowerCpi || !rangeUpperCpi) {
      rangeLowerCpi = 0;
      rangeUpperCpi = 100;
    }
<<<<<<< HEAD

    //using a array to store only such filters whoch are sent to the server. This removes any filter choice that might be null
    let conditions = [];
    if (course) conditions.push({ course: course });
    if (department) conditions.push({ department: department });
    if (yearofGrad) conditions.push({ yearofGrad: yearofGrad });

    //db query to filter out the students
    const students = await Student.find({
      $and: [
        ...(conditions.length === 0 ? [] : [{ $or: conditions }]),
        { cpi: { $gte: rangeUpperCpi, $lte: rangeLowerCpi } },
      ],
    })
      .select("-password")
      .exec();

    return res
      .status(200)
      .json({ error: false, message: "Search success", data: students || [] });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error Occured" });
  }
};

const getStudentByInterests = async (req, res) => {
  try {
    const { reqInterests } = req.body;
    const students = await Student.find().select("-password").exec();

=======

    //using a array to store only such filters whoch are sent to the server. This removes any filter choice that might be null
    let conditions = [];
    if (course) conditions.push({ course: course });
    if (department) conditions.push({ department: department });
    if (yearofGrad) conditions.push({ yearofGrad: yearofGrad });

    //db query to filter out the students
    const students = await Student.find({
      $and: [
        ...(conditions.length === 0 ? [] : [{ $or: conditions }]),
        { cpi: { $gte: rangeUpperCpi, $lte: rangeLowerCpi } },
      ],
    })
      .select("-password")
      .exec();

      return res.status(200).json({
        status: "success",
        message: "Search success",
        data: students || [],
      });
      
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error Occurred",
      data: null,
    });
    
  }
};

const getStudentByInterests = async (req, res) => {
  try {
    const { reqInterests } = req.body;
    const students = await Student.find().select("-password").exec();

>>>>>>> Dhruv
    let filteredStudents = [];
    students.forEach((student) => {
      const interests = student.interest;
      let interestCheck = [];
      //checking if this student is having any common interest with the sent required intreste
      interestCheck = reqInterests.filter((interest) => {
        interests.includes(interest);
      });
      //storing such a stident to the filtered stidents array
      if (interestCheck.length > 0) filteredStudents.push({ student });
    });
<<<<<<< HEAD
    return res
      .status(200)
      .json({
        error: false,
        message: "Search Succesfful",
        data: filteredStudents || [],
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error Occured" });
=======
    return res.status(200).json({
      error: false,
      status: "success",
      message: "Search Successful",
      data: filteredStudents || [],
    });
      
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error Occurred",
      data: null,
    });
    
>>>>>>> Dhruv
  }
};

const getStudentsApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id).populate("applications").exec();
    if (!student)
<<<<<<< HEAD
      return res
        .status(400)
        .json({ error: true, message: "Invalid Id", applicationsList: [] });
    const studentApplicationList = student.applications;
    return res
      .status(200)
      .json({
        error: false,
        message: "Success",
        applicationsList: studentApplicationList || [],
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Some Internal Error Occured" });
=======
      return res.status(400).json({
        error: false,
        status: "error",
        message: "Invalid Id",
        applicationsList: [] ,
      });
      
    const studentApplicationList = student.applications;
    return res.status(200).json({
      error: false,
      status: "success",
      message: "Success",
      applicationsList: studentApplicationList || [] ,
    });
    
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Error Occurred",
      data: {},
    });
    
>>>>>>> Dhruv
  }
};

const addStudentsApplications = async (req, res) => {
  try {
    const { id, internId } = req.params.id;
    //assumed for now that the id for the document of intern post is sent is params

    //checking if the id's sent are true or not
    const [student, intern] = await Promise.all([
      Student.findById(id),
      Updates.findById(internId),
    ]);
<<<<<<< HEAD
    if (!student)
      return res
        .status(401)
        .json({ error: true, message: "Invalid Student Id" });
    if (!intern)
      return res
        .status(401)
        .json({ error: true, message: "Invalid Intern Id" });

    //checking if the student had already applied ti this intern
    const applicationsList = student.applications;
    if (applicationsList.includes(internId))
      return res.status(400).json({ error: true, message: "Already applied" });

    student.applications.push(intern._id);
    await student.save({ validateBeforeSave: false });
    return res.status(200).json({ error: false, message: "Intern Applied" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error Occured" });
=======
    if (!student) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Student Id",
        data: {},
      });
    }
    
    if (!intern) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Intern Id",
        data: {},
      });
    }

    //checking if the student had already applied ti this intern
    const applicationsList = student.applications;
    if (applicationsList.includes(internId)) {
      return res.status(400).json({
        error: true,
        status: "error",
        message: "Already applied",
        data: {},
      });
    }

    student.applications.push(intern._id);
    await student.save({ validateBeforeSave: false });
    return res.status(200).json({
      error: false,
      status: "success",
      message: "Intern Applied",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error Occurred",
      data: {},
    });
    
>>>>>>> Dhruv
  }
};

export {
  getStudentByID,
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentByInterests,
  getStudentsByFilter,
  getStudentsApplicationById,
  addStudentsApplications,
};
