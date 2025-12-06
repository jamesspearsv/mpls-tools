import * as z from "zod";
import { INTERACTION_TYPES } from "./constants";

export const InteractionTypesSchema = z.enum(INTERACTION_TYPES);

export const InteractionRecordSchema = z.object({
  id: z.string(),
  type: InteractionTypesSchema,
  timestamp: z.number(),
});

export const InteractionRequstSchema = z.object({
  type: InteractionTypesSchema,
});
