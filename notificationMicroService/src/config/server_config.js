import dotenv from "dotenv";
dotenv.config();

const data = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default data;
