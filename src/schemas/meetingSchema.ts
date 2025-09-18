import { z } from "zod";

export const createMeetingSchema = z.object({
  visibility: z.enum(["Public", "Private"]).optional().default("Public"),
  startDate: z.date(),
  endDate: z.date().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
  allowedRoles: z.array(z.enum(["Crew", "Trustee"])).optional().default([]),
  createdBy: z.string().min(1, { message: "createdBy is required" }),
});

export const updateMeetingSchema = createMeetingSchema.partial();
