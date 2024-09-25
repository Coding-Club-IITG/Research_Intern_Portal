import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;
//for format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info', // Set the minimum log level (info, error, warn, etc.)
  format: combine(
    timestamp(),
    colorize(),
    myFormat
  ),
  transports: [
    new transports.Console(), // Output to console
    // new transports.File({ filename: 'combined.log' }) // Output to a log file
  ],
});

export default logger;
