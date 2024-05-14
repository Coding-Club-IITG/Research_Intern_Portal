const dotenv = require("dotenv");
dotenv.config();
const data = {
  PORT: process.env.PORT || 3000,
  ATLAS_DB_URL: process.env.ATLAS_DB_URL,
  NODE_ENV: process.env.NODE_ENV,
};
module.exports = data;
