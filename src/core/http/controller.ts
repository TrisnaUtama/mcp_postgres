import { logger } from "core/logger";
import { AppError } from "../error/app.error";
import { Response } from "./response";

export class BaseController {
	protected ok<T>(data: T, message = "OK") {
		return Response.success(data, message);
	}

	protected fail(error: unknown) {
		if (error instanceof AppError) {
			return {
				status: error.statusCode,
				body: Response.error(error.message, error.code, error.details),
			};
		}

		logger.error("SYSTEM ERROR:", error);

		return {
			status: 500,
			body: Response.error("Internal Server Error", "INTERNAL_ERROR"),
		};
	}
}
