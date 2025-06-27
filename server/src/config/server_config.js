import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_URL);

const data = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL,
  DEV_DB_URL: process.env.DEV_DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default data;
