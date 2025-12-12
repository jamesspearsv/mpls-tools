import { InteractionRequstSchema } from "@packages/common";
import { Hono } from "hono";
import {
  insertRefInteraction,
  selectInteractions,
} from "./db/drizzleQueries.js";

export const libstats = new Hono();

/**
 * Accepts an interaction type to insert into the database
 * @returns {InteractionRecord} Newly inserted interaction record on success
 * @returns Stateful status code and error message in case of failure
 */
libstats
  .post("/interactions", async (c) => {
    const req = await c.req.json();

    // Parse json request
    const safeReq = InteractionRequstSchema.safeParse(req);

    if (safeReq.success) {
      const result = await insertRefInteraction(safeReq.data.type);

      // Return inserted row if successful
      if (result.success) return c.json(result);
    }

    // Handle expected errors
    if (!safeReq.success)
      return c.json({ message: "Bad reqeust" }, 400); // handle bad requests
    else return c.json({ message: "Server error" }, 500); // handle drizzle errors
  })
  .get(async (c) => {
    const result = await selectInteractions({ start: 0, end: 0 });
    c.json({ response: result });
  });
