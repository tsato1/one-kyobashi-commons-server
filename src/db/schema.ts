import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const events = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull()
});

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  cognitoId: varchar("cognitoId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type User = InferSelectModel<typeof users>;
export type NewUser = Pick<
  InferInsertModel<typeof users>,
  "cognitoId" | "name" | "email"
>;
export type UpdateUser = InferInsertModel<typeof users>;
