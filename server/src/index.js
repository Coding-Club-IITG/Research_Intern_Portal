import express from "express";
import bodyParser from "body-parser";
import BaseError from "./errors/BaseErrors.js";
import data from "./config/server_config.js";
import errorHandler from "./utils/errorHandler.js";
import connectToDb from "./config/db_config.js";
import authRoutes from "./auth/routes/auth.js";
import { uploadFile } from "./students/upload/onedrive.upload.js";
import verifyJWT from "./middlewares/token-verify.js";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swagger_config.js";
import cors from "cors";
import logger from "./utils/logger.js";
// import bugRoutes from "./admin/routes/bug.js";
import adminControlRouter from "./admin/routes/controls.js";
import adminBranchNameChangeRouter from "./admin/routes/course-branches.js";
import { adminGuard, recruiterGuard } from "./middlewares/role-guard.js";
import adminUpdateRoutes from "./admin/routes/updates.js";
import studentRoutes from "./students/routes/student.js";
import jobRoutes from "./recruiter/routes/jobs.js";
import recruiterRoutes from "./recruiter/routes/recruiter.js";

const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: "*", // change this to the frontend url
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.use("/", authRoutes);
//app.get("/upload", verifyJWT, uploadFile);

// admin routes
app.use("/api/v1/admin/controls", verifyJWT, adminControlRouter);
app.use("/api/v1/admin/updates", verifyJWT, adminUpdateRoutes);
app.use("/api/v1/admin/branches", adminBranchNameChangeRouter);

// student routes
app.use("/api/v1/students", verifyJWT, studentRoutes);

// app.use("/api/v1/recruiters", verifyJWT, recruiterGuard, recruiterRoutes);
app.use("/api/v1/recruiters", recruiterRoutes);
app.use("/api/v1/job", jobRoutes);

// app.use("/api/v1/admin/bugs", bugRoutes);

// test route
app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive" });
});

// Last middleware if any error comes
app.use(errorHandler);
app.listen(data.PORT, async () => {
  await connectToDb();
  logger.info(`Server is running on ${data.PORT}`);
});
