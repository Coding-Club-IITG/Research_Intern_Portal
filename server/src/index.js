import express from "express";
import bodyParser from "body-parser";
import BaseError from "./errors/BaseErrors.js";
import data from "./config/server_config.js";
import errorHandler from "./utils/errorHandler.js";
import connectToDb from "./config/db_config.js";
import authRoutes from "./auth/routes/auth.js";
import { uploadFile } from "./students/upload/onedrive.upload.js";
import recruiterRouter from "./recruiter/routes/recruiter.js";
import verifyJWT from "./middlewares/token-verify.js";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swagger_config.js";
import cors from "cors";
import jobRouter from "./recruiter/routes/jobs.js";
import logger from "./utils/logger.js";
import bugRoutes from "./admin/routes/bug.js";
import adminControlRoutes from "./admin/routes/controls.js";
import { adminGuard } from "./middlewares/role-guard.js";
import adminUpdateRoutes from "./admin/routes/updates.js";
import adminJobRoutes from "./admin/routes/jobs.js"; 

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
app.use("/api/v1/admin/controls", verifyJWT, adminGuard, adminControlRoutes);
app.use("/api/v1/admin/updates", verifyJWT, adminGuard, adminUpdateRoutes);
app.use("/api/v1/admin/jobs", verifyJWT, adminGuard, adminJobRoutes);



app.use("/api/v1/recruiters", recruiterRouter);
app.use("/job", jobRouter);
app.use("/api/v1/admin", bugRoutes);

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
