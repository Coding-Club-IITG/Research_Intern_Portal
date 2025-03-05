import mongoose from "mongoose";
import data from "./server_config.js";
import logger from "../utils/logger.js";
async function connectToDb() {
  try {
    if (process.env.NODE_ENV == "development") {
      await mongoose.connect(data.DB_URL);
      console.log("Connection established!");
      logger.info("connection established!");
    } else {
      logger.info("We are not ready with the other url");
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    logger.error(`unable to connect to db , ${error}`);
    console.log("unable to connect to db", error);
  }
}
export default connectToDb;
