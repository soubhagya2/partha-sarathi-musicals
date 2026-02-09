/**
 * Logger utility using Winston
 * Centralized logging for the application
 */

import winston from "winston";
import path from "path";

const logDir = "logs";
const timestamp = new Date().toISOString().split("T")[0];

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.metadata(),
  ),
  transports: [
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? ` ${JSON.stringify(meta)}`
            : "";
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        }),
      ),
    }),

    // Error logs file
    new winston.transports.File({
      filename: path.join(logDir, `error-${timestamp}.log`),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // Combined logs file
    new winston.transports.File({
      filename: path.join(logDir, `combined-${timestamp}.log`),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

export { logger };
