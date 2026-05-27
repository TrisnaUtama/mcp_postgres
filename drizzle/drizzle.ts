import { db } from "@settings/db/db.config";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { BunSQLQueryResultHKT } from "drizzle-orm/bun-sql";
import { drizzle } from "drizzle-orm/bun-sql";
import type { PgTransaction } from "drizzle-orm/pg-core";

export const orm = drizzle(db);
type Schema = Record<string, never>;
export type DrizzleTransaction = PgTransaction<
	BunSQLQueryResultHKT,
	Schema,
	ExtractTablesWithRelations<Schema>
>;
export type DrizzleExecutor = typeof orm | DrizzleTransaction;
