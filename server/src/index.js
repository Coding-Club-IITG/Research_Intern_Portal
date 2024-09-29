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
import jobRouter from "./recruiter/routes/Jobs.js";
import logger from "./utils/logger.js";



const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.use("/", authRoutes);
app.get("/upload", verifyJWT, uploadFile);
app.use("/api/v1/recruiters", recruiterRouter);
app.use('/job',jobRouter)

// app.use("/api/v1/admin",)
// test route
app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive" });
});

//last middleware if any error comes
app.use(errorHandler);
app.listen(data.PORT, async () => {
  await connectToDb();
  logger.info(`Server is running on ${data.PORT}`);
  // console.log(`Server is running on ${data.PORT}`);
});


