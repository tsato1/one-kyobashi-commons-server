import { eq } from "drizzle-orm";
import { db } from "../db"
import { crews, Crew, NewCrew } from "../db/schema"

export const getcrews = async () =>
  await db
    .select({
      id: crews.id,
      name: crews.name,
    })
    .from(crews);

export const getCrewByCognitoId = async (cognitoId: string) =>
  await db
    .select()
    .from(crews)
    .where(eq(crews.cognitoId, cognitoId));

export const create = async (newCrew: NewCrew) =>
  await db
    .insert(crews)
    .values(newCrew)
    .returning({
      id: crews.id,
      name: crews.name,
    });

export const update = async (cognitoId: string, updatedCrew: Partial<Crew>) =>
  await db
    .update(crews)
    .set(updatedCrew)
    .where(eq(crews.cognitoId, cognitoId))
    .returning();
