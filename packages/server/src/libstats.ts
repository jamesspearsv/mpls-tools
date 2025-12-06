import { Hono } from "hono";

export const libstats = new Hono();

libstats.post("/interactions", (c) => {
  return c.text("Work in progress");
});
