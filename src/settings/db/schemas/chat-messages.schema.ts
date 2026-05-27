import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { chatSessions } from "./chat-sessions.schema";

export const chatMessages = pgTable("chat_messages", {
	id: uuid("id").defaultRandom().primaryKey(),

	sessionId: uuid("session_id")
		.references(() => chatSessions.id)
		.notNull(),

	role: text("role").notNull(),

	content: text("content").notNull(),

	toolCalls: jsonb("tool_calls"),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
