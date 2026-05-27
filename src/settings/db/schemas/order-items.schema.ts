import { decimal, integer, pgTable, uuid } from "drizzle-orm/pg-core";

import { orders } from "./orders.schema";
import { products } from "./products.schema";

export const orderItems = pgTable("order_items", {
	id: uuid("id").defaultRandom().primaryKey(),

	orderId: uuid("order_id")
		.references(() => orders.id)
		.notNull(),

	productId: uuid("product_id")
		.references(() => products.id)
		.notNull(),

	quantity: integer("quantity").notNull(),

	unitPrice: decimal("unit_price", {
		precision: 12,
		scale: 2,
	}).notNull(),
});
