import * as z from "zod";
import { INTERACTION_TYPES } from "./constants";

export const InteractionTypesSchema = z.enum(INTERACTION_TYPES);

export const InteractionSchema = z.object({
  type: InteractionTypesSchema,
  timestamp: z.number(),
});
