import mongoose from "mongoose";
import data from "./server_config.js";
async function connectToDb() {
  try {
    if (NODE_ENV == "development") {
      await mongoose.connect(data.DB_URL);
    } else {
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    console.log("unable to connect to db", error);
  }
}
export default connectToDb;
