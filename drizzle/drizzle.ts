import { logger } from "@core/logger";
import { db } from "@settings/db/db.config";
import type { ExtractTablesWithRelations, Logger } from "drizzle-orm";
import type { BunSQLQueryResultHKT } from "drizzle-orm/bun-sql";
import { drizzle } from "drizzle-orm/bun-sql";
import type { PgTransaction } from "drizzle-orm/pg-core";

const formatTime = () => new Date().toISOString();
export const drizzleLogger: Logger = {
	logQuery(query, params) {
		const start = performance.now();
		logger.info("================================");
		logger.info(`🕒 TIME: ${formatTime()}`);
		logger.info("🟡 SQL:");
		logger.info(query);

		if (params && params.length > 0) {
			logger.info("🟡 PARAMS:");
			logger.info(JSON.stringify(params, null, 2));
		} else {
			logger.info("🟡 PARAMS: (none)");
		}
		const duration = performance.now() - start;
		logger.info(`⚡ LOGGING OVERHEAD: ${duration.toFixed(2)}ms`);
		logger.info("================================");
	},
};

export const orm = drizzle(db, {
	logger: drizzleLogger,
});
type Schema = Record<string, never>;
export type DrizzleTransaction = PgTransaction<
	BunSQLQueryResultHKT,
	Schema,
	ExtractTablesWithRelations<Schema>
>;
export type DrizzleExecutor = typeof orm | DrizzleTransaction;
