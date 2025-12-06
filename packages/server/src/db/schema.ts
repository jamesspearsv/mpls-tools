import { INTERACTION_TYPES } from "@packages/common";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const checkouts = sqliteTable("checkouts", {
  id: integer().primaryKey({ autoIncrement: true }),
  patronBarcode: text().notNull(),
  itemBarcode: text().notNull(),
  checkoutDate: text().notNull(), // TODO: Use unix timestamp
  syncStatus: text(), // TODO: Use unix timestamp
});

export const referenceInteractions = sqliteTable("reference_interactions", {
  id: text().primaryKey().notNull(),
  timestamp: integer({ mode: "timestamp_ms" }).notNull(),
  type: text({ enum: INTERACTION_TYPES }).notNull(),
});
