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
import connectDB from "./db/connect.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.use('/', authRoutes);
app.get('/upload',verifyJWT, uploadFile);
app.use("/api/v1/recruiters", recruiterRouter);

// test route
app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive" });
});

//last middleware if any error comes
app.use(errorHandler);
<<<<<<< HEAD

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
=======
app.listen(data.PORT, async () => {
  await connectToDb();
  console.log(`Server is running on ${data.PORT}`);
});
>>>>>>> master
