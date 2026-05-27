import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
	statusCode: ContentfulStatusCode;
	code: string;
	details?: unknown;

	constructor(
		message: string,
		statusCode: ContentfulStatusCode = 500,
		code = "INTERNAL_ERROR",
		details?: unknown,
	) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
	}
}
