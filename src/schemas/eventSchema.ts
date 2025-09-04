import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateEventSchema = createEventSchema.partial();
