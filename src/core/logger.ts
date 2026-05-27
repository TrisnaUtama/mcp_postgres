import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const format = printf(({ level, message, timestamp, stack }) => {
	return `[${timestamp}] [${level}] ${stack || message}`;
});

export const logger = winston.createLogger({
	level: "info",
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		errors({ stack: true }),
		format,
	),
	transports: [
		new winston.transports.Console({
			format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), format),
		}),
	],
});
