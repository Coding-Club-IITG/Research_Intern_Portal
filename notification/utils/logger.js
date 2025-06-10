import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, prettyPrint, json, label } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    json(),
    colorize(),
    label({ label: "server log" })
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});

export default logger;
