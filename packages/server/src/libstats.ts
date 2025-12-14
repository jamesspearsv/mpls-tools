import { InteractionRequstSchema, ISODateSchema } from "@packages/common";
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
    // Get localtimezone offset
    // new Date().getTimezoneOffset / 60 * -1

    // Parsing range state and end date
    // 1. Convert start date from local time to equivalent UTC time
    // 2. Convert end date from local time to equivalent UTC time

    const start = c.req.query("start");
    const end = c.req.query("end");

    const safeStart = ISODateSchema.safeParse(start);
    const safeEnd = ISODateSchema.safeParse(end);

    if (!safeStart.success || !safeEnd.success) {
      return c.json(
        { message: "Bad request. Must submit a valid date range" },
        400,
      );
    }

    // todo: finish parsing date range

    const result = await selectInteractions();
    return c.json({ response: result });
  });
