import { eq } from "drizzle-orm";
import { db } from "../db"
import { trustees, Trustee, NewTrustee } from "../db/schema"

export const getTrustees = async () =>
  await db
    .select({
      id: trustees.id,
      name: trustees.name,
    })
    .from(trustees);

export const getTrusteeByCognitoId = async (cognitoId: string) =>
  await db
    .select()
    .from(trustees)
    .where(eq(trustees.cognitoId, cognitoId));

export const create = async (newTrustee: NewTrustee) =>
  await db
    .insert(trustees)
    .values(newTrustee)
    .returning({
      id: trustees.id,
      name: trustees.name,
    });

export const update = async (cognitoId: string, updatedTrustee: Partial<Trustee>) =>
  await db
    .update(trustees)
    .set(updatedTrustee)
    .where(eq(trustees.cognitoId, cognitoId))
    .returning();
