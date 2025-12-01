// Demonstration function to test build step
export function youGetWhatYouGive(arg: unknown) {
  return arg;
}

/**
 * TODO: Add validation schemes for LibStats
 * - [x] interactions
 * - [] interaction report
 */

import * as z from "zod";

export const InteractionTypesSchema = z.union([
  z.literal("Digital Resources"),
  z.literal("Tech Help"),
  z.literal("Know Item Request"),
  z.literal("Information Services"),
]);

export const InteractionSchema = z.object({
  type: InteractionTypesSchema,
  timestamp: z.number(),
});
