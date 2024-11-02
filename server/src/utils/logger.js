import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, prettyPrint, json, label } = format;

//for format
// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level}]: ${message}`;
// });

const logger = createLogger({
  level: 'info', // Set the minimum log level (info, error, warn, etc.)
  format: combine( timestamp(), json(), colorize(), label({ label: 'server log' }),), 
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
