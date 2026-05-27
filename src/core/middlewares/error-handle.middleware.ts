import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { AppError } from "../error/app.error";

export const errorHandler = (err: Error, c: Context) => {
	if (err instanceof AppError) {
		return c.json(
			{
				success: false,
				message: err.message,
				code: err.code,
				details: err.details,
			},
			err.statusCode as ContentfulStatusCode,
		);
	}

	console.error("UNHANDLED ERROR:", err);

	return c.json(
		{
			success: false,
			message: "Internal Server Error",
			code: "INTERNAL_ERROR",
		},
		500,
	);
};
