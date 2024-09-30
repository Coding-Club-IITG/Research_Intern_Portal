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
import { rateLimit } from 'express-rate-limit'
import MongoStore from "rate-limit-mongo/lib/mongoStore.js";



const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

const rateLimitingMiddleware = rateLimit({
  windowMs : 60*1000,
  max:500,
  standardHeaders:"draft-7",
  legacyHeaders:false,
  message:'You have exceeded the request limit of 500 per minute.\nWait for a minute before making another request',
  statusCode:429,
  store: new MongoStore({
    uri:data.DB_URL,
    expireTimeMs:60*1000,
    errorHandler:console.error.bind(null, 'Maximum limit of request per minutes reached')
  })
})

app.use(rateLimitingMiddleware)

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
  console.log(`Server is running on ${data.PORT}`);
});


