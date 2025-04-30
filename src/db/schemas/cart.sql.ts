import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { users } from "./auth.sql";
import { products } from "./product.sql";

// Carts
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // nullable for guest carts if needed
  ...timestamps,
});

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
});
