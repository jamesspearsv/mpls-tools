import * as z from "zod";
import { INTERACTION_TYPES } from "./constants";

export const InteractionTypeSchema = z.enum(INTERACTION_TYPES);

export const InteractionRecordSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  type: InteractionTypeSchema,
});

export const InteractionRequstSchema = z.object({
  type: InteractionTypeSchema,
});

export const ISODateSchema = z.iso.date();

export const RefSummarySchema = z.record(InteractionTypeSchema, z.int());
