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

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Research Intern Library",
      version: "1.0.0",
      description: "CC Research intern project",
    },
    servers: [
      {
        url: `http://localhost:${data.PORT}`,
      },
    ],
  },
  apis: [
    "admin/routes/*.js",
    "auth/routes/*.js",
    "recruiter/routes/*.js",
  ],
};

const specs = swaggerJsDoc(options);

const app = express();
console.log(JSON.stringify(specs, null, 2));

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));

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
app.listen(data.PORT, async () => {
  await connectToDb();
  console.log(`Server is running on ${data.PORT}`);
});
