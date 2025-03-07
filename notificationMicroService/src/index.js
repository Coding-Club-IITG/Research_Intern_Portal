import express from "express";
import bodyParser from "body-parser";
// import BaseError from "./errors/BaseErrors.js";
import data from "./config/server_config.js";
import errorHandler from "./utils/errorHandler.js";
import connectToDb from "./config/db_config.js";

import cors from "cors";
import logger from "./utils/logger.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(
  cors({
    origin: "*", // change this to the frontend url
    credentials: true,
  })
);

// Last middleware if any error comes
app.use(errorHandler);
app.listen(data.PORT, async () => {
  await connectToDb();
  logger.info(`Server is running on ${data.PORT}`);
});
