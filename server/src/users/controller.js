import { User } from "./model.js";
import Recruiter from "../recruiter/models/recruiter.js";
import { roles } from "../utils/roles.js";
import Student from "../students/models/student.js";

import logger from "../utils/logger.js";
import Admin from "../admin/models/admin.js";
import axios from "axios";
// import Admin from "../admin/models/updates.js"

export const createUser = async (data) => {
  try {
    const { name, email, typeOfUser } = data;

    let user;

    if (typeOfUser === roles.STUDENT) {
      user = await Student.create({
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else if (typeOfUser === roles.RECRUITER) {
      user = await Recruiter.create({
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else if (typeOfUser === roles.ADMIN) {
      user = await Admin.create({
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const appUser = await User.create({
      name,
      email,
      typeOfUser,
      connection_id: user._id,
    });
    logger.info(`an app user of type ${typeOfUser} is created succesfully`);
    return appUser;
  } catch (error) {
    throw error;
  }
};

export const getUserFromToken = async function (accessToken) {
  try {
    const config = {
      method: "get",
      url: "https://graph.microsoft.com/v1.0/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios(config);

    const userData = {
      name: response.data.displayName,
      email: response.data.mail,
      rollNumber: response.data.surname,
      department: response.data.jobTitle,
    };

    return userData;
  } catch (error) {
    logger.error(`Error fetching user information: ${error}`);
    // console.error("Error fetching user information:", error);
    return null;
  }
};

/**
 * @param {String} userId
 * @returns {Array} savedJobs ids
 */
export const getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and populate the saved jobs
    const user = await User.findById(userId).populate("savedJobs");

    if (!user) {
      logger.error(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated saved jobs
    logger.info(
      `Saved jobs fetched successfully for user ${userId} and returned a total of ${user.savedJobs.length} saved jobs`
    );
    return res.status(200).json({ savedJobs: user.savedJobs });
  } catch (error) {
    logger.error(`Error fetching saved jobs: ${error}`);
    // console.error("Error fetching saved jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
