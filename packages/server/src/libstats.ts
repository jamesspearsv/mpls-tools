import {
  InteractionRequstSchema,
  ISODateSchema,
  type RefSummary,
} from "@packages/common";
import { Hono } from "hono";
import {
  insertRefInteraction,
  selectInteractions,
} from "./db/drizzleQueries.js";
import { parseDateStringToTime } from "./lib.js";

export const libstats = new Hono();

/**
 * Accepts an interaction type to insert into the database
 * @returns {InteractionRecord} Newly inserted interaction record on success
 * @returns Stateful status code and error message in case of failure
 */
libstats
  .post("/interactions", async (c) => {
    /* POST `/libstats/interactions`
     * Accepts a request with a valid interaction type
     * Returns a newly inserted row  of the requested interaciton */
    const req = await c.req.json();

    // Parse json request
    const safeReq = InteractionRequstSchema.safeParse(req);

    if (safeReq.success) {
      const result = await insertRefInteraction(safeReq.data.type);

      // Return inserted row if successful
      if (result.success) return c.json(result.data);
    }

    // Handle expected errors
    if (!safeReq.success)
      return c.json({ message: "Bad reqeust" }, 400); // handle bad requests
    else return c.json({ message: "Server error" }, 500); // handle drizzle errors
  })
  .get(async (c) => {
    /* GET `/libstats/interactions`
     * Accepts a valid start and end date in ISO format
     * Returns a RefSummary of the date range queried */
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

    const start_time = parseDateStringToTime(`${start}T00:00:00`);
    const end_time = parseDateStringToTime(`${end}T23:59:59`);

    const result = await selectInteractions({
      start: start_time,
      end: end_time,
    });

    if (!result.success) return c.json({ message: "Server error" }, 500);

    // Parse and format query response
    const ref_summary = {
      "Digital Resources": 0,
      "Information Services": 0,
      "Known Item Request": 0,
      "Tech Help": 0,
    } satisfies RefSummary;
    result.data.map((row) => (ref_summary[row.type] = row.count));

    return c.json(ref_summary);
  });
