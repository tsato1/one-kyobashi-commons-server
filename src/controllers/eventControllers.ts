import { Request, Response } from "express";
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../data-access/event";
import { EventStatus, NewEvent } from "../db/schema";
import { createEventSchema, updateEventSchema } from "../schemas/eventSchema";

export const getEventsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const out = await getEvents()

    res.json(out);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving events: ${error.message}` });
  }
};

export const getEventByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // todo: validate input

    const out = await getEventById(id)
    if (!out) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json(out);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving event: ${error.message}` });
  }
};

export const createEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = createEventSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.issues.map(i => i.message) });
      return;
    }

    const eventToCreate = {
      ...result.data,
      status: "Draft" as EventStatus,
    } as NewEvent;

    const createdEvent = await createEvent(eventToCreate);
    if (!createdEvent) {
      res.status(404).json({ error: "Failed to create a new event." });
      return;
    }

    res.json("Event successfully created.")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating event: ${error.message}` });
  }
}

export const updateEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = updateEventSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten() });
      return;
    }

    const updatedEvent = await updateEvent(id, result.data);
    if (!updatedEvent) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json("Event successfully updated.")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating event: ${error.message}` });
  }
}

export const deleteEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteEvent(id);

    res.json("Event uccessfully deleted.")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting event: ${error.message}` });
  }
}
