import dotenv from "dotenv";
dotenv.config();

const frontendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://rip.codingclubiitg.in";

export { frontendUrl };
