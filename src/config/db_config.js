const mongoose = require("mongoose");
const { ATLAS_DB_URL, NODE_ENV } = require("./server_config");
async function connectToDb() {
  try {
    if (NODE_ENV == "development") {
      await mongoose.connect(ATLAS_DB_URL);
    } else {
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    console.log("unable to connect to db", error);
  }
}
module.exports = connectToDb;
