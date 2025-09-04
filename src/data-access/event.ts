import { eq } from "drizzle-orm";
import { db } from "../db"
import { events, Event, NewEvent } from "../db/schema"

export const getEvents = async () =>
  await db
    .select({
      id: events.id,
      name: events.name,
    })
    .from(events);

export const getEventById = async (id: string) =>
  await db
    .select()
    .from(events)
    .where(eq(events.id, id));

export const createEvent = async (newEvent: NewEvent) =>
  await db
    .insert(events)
    .values(newEvent)
    .returning({
      id: events.id,
      name: events.name,
    });

export const updateEvent = async (id: string, updatedEvent: Partial<Event>) =>
  await db
    .update(events)
    .set(updatedEvent)
    .where(eq(events.id, id))
    .returning();

export const deleteEvent = async (id: string) =>
  await db
    .delete(events)
    .where(eq(events.id, id))
    .returning();
