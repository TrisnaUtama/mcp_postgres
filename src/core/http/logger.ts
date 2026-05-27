import type { Context, Next } from "hono";
import { logger } from "../logger";

export const httpLogger = async (c: Context, next: Next) => {
	const start = performance.now();

	const requestId = crypto.randomUUID();
	c.set("requestId", requestId);
	const method = c.req.method;
	const path = new URL(c.req.url).pathname;
	await next();
	logger.info(
		`[${requestId}] ⬅️ ${method} ${path} ${c.res.status} - ${(performance.now() - start).toFixed(2)}ms`,
	);
};
