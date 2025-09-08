import { eq } from "drizzle-orm";
import { db } from "../db"
import { users, User, NewUser } from "../db/schema"

export const getUsers = async () =>
  await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users);

export const getUserByCognitoId = async (cognitoId: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.cognitoId, cognitoId));

export const createUser = async (newUser: NewUser) =>
  await db
    .insert(users)
    .values(newUser)
    .returning({
      id: users.id,
      name: users.name,
    });

export const updateUser = async (cognitoId: string, updatedUser: Partial<User>) =>
  await db
    .update(users)
    .set(updatedUser)
    .where(eq(users.cognitoId, cognitoId))
    .returning();
