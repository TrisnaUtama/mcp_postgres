import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export const chatSessions = pgTable("chat_sessions", {
	id: uuid("id").defaultRandom().primaryKey(),

	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),

	startedAt: timestamp("started_at").defaultNow().notNull(),
});
