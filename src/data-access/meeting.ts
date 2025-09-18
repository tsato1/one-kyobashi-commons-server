import { eq } from "drizzle-orm";
import { db } from "../db"
import { meetings, Meeting, NewMeeting } from "../db/schema"

export const getMeetings = async () =>
  await db
    .select({
      id: meetings.id,
      visibility: meetings.visibility,
      description: meetings.description,
      location: meetings.location,
      startDate: meetings.startDate,
      endDate: meetings.endDate,
      createdBy: meetings.createdBy,
    })
    .from(meetings);

export const getMeetingById = async (id: string) => {
  const rows = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, id))
    .limit(1);

  return rows[0] ?? null;
}

export const createMeeting = async (newMeeting: NewMeeting) =>
  await db
    .insert(meetings)
    .values(newMeeting)
    .returning({
      id: meetings.id,
    });

export const updateMeeting = async (id: string, updatedMeeting: Partial<Meeting>) =>
  await db
    .update(meetings)
    .set(updatedMeeting)
    .where(eq(meetings.id, id))
    .returning();

export const deleteMeeting = async (id: string) =>
  await db
    .delete(meetings)
    .where(eq(meetings.id, id))
    .returning();
