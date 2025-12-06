import { InteractionRequstSchema } from "@packages/common";
import { Hono } from "hono";
import { insertRefInteraction } from "./db/queries.js";

export const libstats = new Hono();

libstats.post("/interactions", async (c) => {
  const req = await c.req.json();

  // parse json request

  const safeReq = InteractionRequstSchema.safeParse(req);

  if (safeReq.success) {
    await insertRefInteraction(safeReq.data.type);
    // todo: Add request response
  }

  return c.text("Work in progress");
});
