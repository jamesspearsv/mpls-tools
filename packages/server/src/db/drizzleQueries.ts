import { DrizzleQueryError, eq, isNull } from "drizzle-orm";
import { db } from "./drizzleConnection.js";
import { checkouts, referenceInteractions } from "./drizzleSchema.js";
import type {
  InteractionRecord,
  InteractionTypes,
  Result,
} from "@packages/common";
import { nanoid } from "nanoid";

export async function selectCheckouts(): Promise<
  Result<{ id: number; patronBarcode: string; itemBarcode: string }[]>
> {
  try {
    const rows = await db
      .select()
      .from(checkouts)
      .where(isNull(checkouts.syncStatus));
    return { success: true, data: rows };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };
    throw new Error("Server Error");
  }
}

export async function insertCheckouts(
  patronBarcode: string,
  itemBarcodes: string[],
): Promise<Result<{ patronBarcode: string; itemBarcodes: string[] }>> {
  try {
    await db.transaction(async (tx) => {
      for (const itemBarcode of itemBarcodes) {
        if (itemBarcode === "debug") throw new Error("Debuging Error");
        await tx.insert(checkouts).values({
          patronBarcode,
          itemBarcode,
          checkoutDate: new Date().toISOString().replace("T", " "),
        });
      }
    });

    return {
      success: true,
      data: { patronBarcode, itemBarcodes },
    };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };
    throw new Error("Server error");
  }
}

export async function updateCheckouts(checkoutIDs: number[]): Promise<Result> {
  try {
    await db.transaction(async (tx) => {
      for (const id of checkoutIDs) {
        await tx
          .update(checkouts)
          .set({ syncStatus: new Date().toISOString().replace("T", " ") })
          .where(eq(checkouts.id, id));
      }
    });

    return { success: true, data: "Updated all checkouts" };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };
    throw new Error("Server Error");
  }
}

export async function insertRefInteraction(
  interaction: InteractionTypes,
): Promise<Result<InteractionRecord>> {
  try {
    const [row] = await db
      .insert(referenceInteractions)
      .values({ type: interaction })
      .returning();

    return { success: true, data: row };
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      return { success: false, message: "Bad query" };
    }

    throw error;
  }
}
