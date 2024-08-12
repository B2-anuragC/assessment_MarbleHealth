const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a Winston logger instance
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// If we're in production, we also want to log errors to an error file
if (process.env.NODE_ENV === "production") {
  logger.add(new transports.File({ filename: "logs/production.log" }));
}

module.exports = logger;
