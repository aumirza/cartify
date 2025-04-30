import { timestamp } from "drizzle-orm/pg-core";

// columns.helpers.ts
export const timestamps = {
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // deletedAt: timestamp("deleted_at"), // for soft deletion
};
