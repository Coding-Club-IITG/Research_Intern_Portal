import { User } from "./model.js";
import Recruiter from "../recruiter/models/jobs.js";
import { roles } from "../utils/roles.js";
import { Student } from "../students/models/student.js";

import logger from "../utils/logger.js";
import Admin from "../admin/models/updates.js"
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
    logger.info(`an app user of type ${typeOfUser} is created succesfully`)
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
      branch: response.data.jobTitle,
    };

    return userData;
  } catch (error) {
    logger.error(`Error fetching user information: ${error}`);
    // console.error("Error fetching user information:", error);
    return null;
  }
};
