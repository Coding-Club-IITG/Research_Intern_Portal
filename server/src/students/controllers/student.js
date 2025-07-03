import Student from "../models/student.js";
import Jobs from "../../recruiter/models/jobs.js";
// import Updates from "../../admin/models/updates.js";
import logger from "../../utils/logger.js";

const createStudent = async (req, res) => {
  try {
    const { name, email, roll, course, department, CGPA, yearOfGrad } =
      req.body;
    //frontend team just make sure that none of these values is undefined type
    //also make sure the name attribute of the input fields *EXACTLY* corresponds with these names
    if (
      [name, email, roll, course, department, CGPA, yearOfGrad].some(
        (field) => {
          field !== null && field !== "";
        }
      )
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are necessary",
        data: null,
      });
    }
    const checkEmail = await Student.find({ email: email });
    if (checkEmail)
      return res.status(400).json({
        status: "error",
        message: "Student with same email already exists",
        data: null,
      });
    const newStudent = await Student.create({
      name,
      email,
      roll,
      course,
      department,
      CGPA,
      yearOfGrad,
      createdAt: Date.now(),
    });
    if (!newStudent)
      return res.status(500).json({
        status: "error",
        message: "Student could not be created",
        data: null,
      });
    logger.info(`student created successfully with id ${newStudent.id}`);
    return res.status(200).json({
      status: "success",
      message: "Student Created successfully",
      data: newStudent,
    });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: null });
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const updatedData = {
      ...data,
      updatedAt: Date.now(),
      DOB: new Date(data?.DOB),
      isUpdated: true, // move this into the update object
    };

    const student = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    console.log(student);

    if (!student) {
      logger.error(
        `Updating student failed: student with ID ${id} does not exist.`
      );
      return res.status(400).json({
        status: "error",
        message: "Student does not exist",
        data: null,
      });
    }

    logger.info(`Student updated successfully with ID ${id}`);
    return res.status(200).json({
      status: "success",
      message: "Account Updated Successfully",
      data: student,
    });
  } catch (error) {
    logger.error(`Internal Server Error while updating student: ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server Error occurred",
      data: null,
    });
  }
};

// const deleteStudent = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const password = req.body.password;
//     //taking the password so that their is some authentication before deleting the account
//     const student = await Student.findById(id);

//     if (!student)
//       return res.status(400).json({
//         status: "error",
//         message: "Student does not exist",
//         data: null,
//       });

//     if (!student.isPasswordCorrect(password))
//       return res.status(401).json({
//         status: "error",
//         message: "Password not correct, unauthorized user",
//         data: null,
//       });

//     const deletedStudent = await Student.findByIdAndDelete(id);

//     if (!deletedStudent)
//       return res.status(500).json({
//         status: "error",
//         message: "Account not deleted",
//         data: null,
//       });
//     logger.info(`Student deleted successfully with ID ${id}`);
//     return res.status(201).json({
//       status: "success",
//       message: "Deleted successfully",
//       data: null,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: "Some Internal Server error occurred",
//       data: null,
//     });
//   }
// };

const getStudentByID = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      logger.error(`Student not found with ID ${id}`);
      return res.status(400).json({
        status: "error",
        message: "Student does not exist",
        data: null,
      });
    }

    logger.info(`Student found with ID ${id}`);
    return res.status(201).json({
      status: "success",
      message: "Student found",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server error occurred",
      data: null,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    logger.info(`Retrieved ${students.length} students from the database`);

    return res.status(200).json({
      status: "success",
      message: "Students found",
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Some Internal Server error occurred",
      data: null,
    });
  }
};

const getStudentsByFilter = async (req, res) => {
  try {
    let { course, department, yearofGrad, rangeUpperCpi, rangeLowerCpi } =
      req.body;
    //making sure some numbers are sent from frontend for cpi, else puting the least and max poaaible value
    if (!rangeLowerCpi || !rangeUpperCpi) {
      rangeLowerCpi = 0.0;
      rangeUpperCpi = 10.0;
    }

    //using a array to store only such filters whoch are sent to the server. This removes any filter choice that might be null
    let conditions = [];
    if (course) conditions.push({ course: course });
    if (department) conditions.push({ department: department });
    if (yearOfGrad) conditions.push({ yearofGrad: yearofGrad });

    //db query to filter out the students
    const students = await Student.find({
      $and: [
        ...(conditions.length === 0 ? [] : [{ $or: conditions }]),
        { cpi: { $gte: rangeUpperCpi, $lte: rangeLowerCpi } },
      ],
    })
      // .select("-password")
      .exec();
    logger.info(`Filtered students retrieved`);
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
    const students = await Student.find().exec();

    let filteredStudents = [];
    students.forEach((student) => {
      const interests = student.interests;
      let interestCheck = [];
      //checking if this student is having any common interest with the sent required intreste
      interestCheck = reqInterests.filter((interest) => {
        interests.includes(interest);
      });
      //storing such a stident to the filtered stidents array
      if (interestCheck.length > 0) filteredStudents.push({ student });
    });
    return res.status(200).json({
      status: "success",
      message: "Search Successful",
      data: filteredStudents || [],
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error Occurred",
      data: null,
    });
  }
};

const getStudentsApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({
        status: "error",
        message: "Invalid Id",
        data: [],
      });

    const studentApplicationList = student.applications;
    return res.status(200).json({
      status: "success",
      message: "Success",
      data: studentApplicationList || [],
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: "error",
      message: "Some Internal Error Occurred",
      data: null,
    });
  }
};

const logoutStudent = async (req, res) => {
  try {
    const options = {
      httpOnly: false,
      secure: false,
    };
    res
      .status(200)
      .clearCookie("user", options)
      .clearCookie("jwt", options)
      .json({
        status: "success",
        message: "Student logged out",
      });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error Occurred",
      data: null,
    });
  }
};

export {
  getStudentByID,
  getStudents,
  createStudent,
  //deleteStudent,
  updateStudent,
  getStudentByInterests,
  getStudentsByFilter,
  getStudentsApplicationById,
  logoutStudent,
};
