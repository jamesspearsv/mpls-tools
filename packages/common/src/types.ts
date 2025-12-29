import * as z from "zod";
import {
  InteractionRecordSchema,
  InteractionTypeSchema,
  RefSummarySchema,
} from "./schemas";

export type Result<T = string> =
  | { success: true; data: T }
  | { success: false; message: string };

export type InteractionType = z.infer<typeof InteractionTypeSchema>;
export type InteractionRecord = z.infer<typeof InteractionRecordSchema>;
export type RefSummary = z.infer<typeof RefSummarySchema>;
