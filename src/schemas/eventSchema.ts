import { z } from "zod";

const VenuSchema = z.object({
  name: z.string(),
  address: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string().optional(),
  }).optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  capacity: z.number().min(1).optional(),
  contact: z.object({
    name: z.string().min(1).max(100),
    phone: z.string().min(7).max(20).optional(),
    email: z.email().optional(),
  }).optional(),
  url: z.url().optional(),
  formatted: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export const createEventSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  venue: VenuSchema.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  // todo:
  // price: z.number().min(0).optional(),
  // currency: z.enum(["USD", "JPY"]).optional(),
  tags: z.array(z.string().max(50)).optional(),
  // defaultLocale: z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Invalid default locale format"),
  // page: z.record(
  //   z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Invalid locale format (e.g., en-US, fr)"),
  //   content: z.string().optional(), // Markdown-formatted description
  // ),
  createdBy: z
    .string("Creator's user ID is required")
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Invalid format"
    ),
});

export const updateEventSchema = createEventSchema.partial();

/** todo: meetings table
 * visibility: z.enum(["Public", "Private"]).optional().default("Public"),
 * allowedRoles: z.array(z.enum(["Crew", "Trustee"])).optional().default([]),
 */
