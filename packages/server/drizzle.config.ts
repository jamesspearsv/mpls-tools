import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./src/db/drizzleSchema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL || "file:dev.sqlite",
  },
});
