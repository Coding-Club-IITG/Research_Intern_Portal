import mongoose from "mongoose";
import data from "./server_config.js";
import logger from "../utils/logger.js";
async function connectToDb() {
  try {
    if(data.NODE_ENV === "development"){
      await mongoose.connect(data.DEV_DB_URL);
      console.log("Connection established! to dev db");
    }else{
      await mongoose.connect(data.DB_URL);
      console.log("Connection established! to prod db");

    }
    logger.info("connection established!");
  } catch (error) {
    logger.error(`unable to connect to db , ${error}`);
    console.log("unable to connect to db", error);
  }
}
export default connectToDb;
