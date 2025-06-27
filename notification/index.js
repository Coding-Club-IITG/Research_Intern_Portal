import express from "express";
import bodyParser from "body-parser";
import data from "./config/server_config.js";
import errorHandler from "./utils/errorHandler.js";
import connectToDb from "./config/db_config.js";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swagger_config.js";
import cors from "cors";
import logger from "./utils/logger.js";
import notificationRoutes from "./notification/route.js";
import emailRoutes from "./email/aws_route.js";

const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://rip.codingclubiitg.in",
      "http://localhost:8000",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive because of vm" });
});

app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/email", emailRoutes);

app.use(errorHandler);
app.listen(data.PORT, async () => {
  await connectToDb();
  logger.info(`Server is running on ${data.PORT}`);
});
