import express from "express";
import bodyParser from "body-parser";
import BaseError from "./errors/BaseErrors.js";
import data from "./config/server_config.js";
import errorHandler from "./utils/errorHandler.js";
import connectToDb from "./config/db_config.js";
import authRoutes from "./routes/auth.js";
import { uploadFile } from "./upload/onedrive.upload.js";
import recruiterRouter from "./routes/recruiter.js";
import verifyJWT from "./middlewares/token-verify.js";
import cookieParser from "cookie-parser";
import jobRouter from "./routes/jobs.js";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://krish12252005:UwIun5sfWpiQs9jr@krish-cluster.vn4ka9f.mongodb.net/student-database")



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.use('/', authRoutes);
app.get('/upload',verifyJWT, uploadFile);
app.use("/recruiters", recruiterRouter);
app.use('/job',jobRouter)

// test route
app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive" });
});

//last middleware if any error comes
app.use(errorHandler);
app.listen(data.PORT, async () => {
  console.log(`Server is running on ${data.PORT}`);
});
