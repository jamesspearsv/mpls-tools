import { INTERACTION_TYPES } from "@packages/common";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const checkouts = sqliteTable("checkouts", {
  id: integer().primaryKey({ autoIncrement: true }),
  patronBarcode: text().notNull(),
  itemBarcode: text().notNull(),
  checkoutDate: text().notNull(), // TODO: Use unix timestamp
  syncStatus: text(), // TODO: Use unix timestamp
});

export const referenceInteractions = sqliteTable("reference_interactions", {
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  timestamp: integer({ mode: "timestamp" })
    .default(sql`(unixepoch('now'))`)
    .notNull(),
  type: text({ enum: INTERACTION_TYPES }).notNull(),
});
