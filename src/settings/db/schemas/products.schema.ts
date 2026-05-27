import {
	decimal,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

import { categories } from "./categories.schema";
export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey(),
	categoryId: uuid("category_id")
		.references(() => categories.id)
		.notNull(),

	name: text("name").notNull(),
	description: text("description"),
	price: decimal("price", {
		precision: 12,
		scale: 2,
	}).notNull(),
	stock: integer("stock").notNull(),
	embedding: text("embedding"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
