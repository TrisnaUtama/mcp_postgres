import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export const orders = pgTable("orders", {
	id: uuid("id").defaultRandom().primaryKey(),

	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),

	status: text("status").notNull(),

	totalAmount: decimal("total_amount", {
		precision: 12,
		scale: 2,
	}).notNull(),

	orderedAt: timestamp("ordered_at").defaultNow().notNull(),
});
