import { Scalar } from "@scalar/hono-api-reference";
import { db } from "@settings/db/db.config";
import { Hono } from "hono";
import { logger } from "./core/logger";
import { settings } from "./settings/configs";

const app = new Hono();

//
// ROUTES
//
app.get("/", (c) => {
	return c.json({
		app: settings.app,
		postgres: {
			host: settings.postgres.host,
			database: settings.postgres.name,
			port: settings.postgres.port,
		},
	});
});

app.get(
	"/docs",
	Scalar(() => ({
		url: "/doc",
	})),
);

const port = settings.app.port;

logger.info("=======================================");
logger.info("🚀 Server Starting...");
logger.info(`🌐 http://localhost:${port}`);
logger.info(`📄 Docs http://localhost:${port}/docs`);
logger.info(`🛢️ DB ${settings.postgres.host}:${settings.postgres.port}`);
logger.info(`⚙️ Runtime ${settings.app.runtime}`);
logger.info("=======================================");

const shutdown = async (signal: string) => {
	logger.warn(`Received ${signal}. Shutting down gracefully...`);

	try {
		await db.close();
		// await redis.quit()

		logger.info("Cleanup completed");
		process.exit(0);
	} catch (err) {
		logger.error("Error during shutdown:", err);
		process.exit(1);
	}
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGQUIT", () => shutdown("SIGQUIT"));
