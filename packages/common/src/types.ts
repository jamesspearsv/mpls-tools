import * as z from "zod";
import { InteractionRecordSchema, InteractionTypesSchema } from "./schemas";

export type Result<T = string> =
  | { success: true; data: T }
  | { success: false; message: string };

export type InteractionTypes = z.infer<typeof InteractionTypesSchema>;
export type InteractionRecord = z.infer<typeof InteractionRecordSchema>;
