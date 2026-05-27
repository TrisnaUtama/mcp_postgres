import { buildOpenAPI } from "@core/openapi";
import { userRoutes } from "@modules/users/routes/user.route";
import { Scalar } from "@scalar/hono-api-reference";
import { db } from "@settings/db/db.config";
import { serve } from "bun";
import { httpLogger } from "core/http/logger";
import { errorHandler } from "core/middlewares/error-handle.middleware";
import { Hono } from "hono";
import { logger } from "./core/logger";
import { settings } from "./settings/configs";

const app = new Hono();

// =========================
// GLOBAL MIDDLEWARE (IMPORTANT)
// =========================
app.use("*", httpLogger);
app.onError(errorHandler);

// =========================
// ROUTES
// =========================
app.route("/users", userRoutes);

app.get("/", (c) => {
	return c.json({
		app: settings.app,
		status: "ok",
	});
});

// =========================
// OPENAPI
// =========================
app.get("/openapi.json", (c) => {
	return c.json(buildOpenAPI());
});

app.get(
	"/docs",
	Scalar(() => ({
		url: "/openapi.json",
		theme: "default",
	})),
);

// =========================
// SERVER START
// =========================
const port = settings.app.port;

serve({
	port,
	fetch: app.fetch,
});

// =========================
// LOGGING ONCE
// =========================
logger.info("=======================================");
logger.info("🚀 Server Started");
logger.info(`🌐 http://localhost:${port}`);
logger.info(`📄 Docs http://localhost:${port}/docs`);
logger.info("=======================================");

// =========================
// GRACEFUL SHUTDOWN
// =========================
const shutdown = async (signal: string) => {
	logger.warn(`Received ${signal} - shutting down`);

	try {
		await db.close();
		logger.info("DB closed cleanly");
		process.exit(0);
	} catch (err) {
		logger.error("Shutdown error:", err);
		process.exit(1);
	}
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
