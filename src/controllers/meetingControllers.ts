import { Request, Response } from "express";
import { getMeetings, getMeetingById, createMeeting, updateMeeting, deleteMeeting } from "../data-access/meeting";
import { NewMeeting } from "../db/schema";
import { createMeetingSchema, updateMeetingSchema } from "../schemas/meetingSchema";

export const getMeetingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const out = await getMeetings()

    res.json(out);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving meetings: ${error.message}` });
  }
};

export const getMeetingByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // todo: validate input

    const out = await getMeetingById(id)
    if (!out) {
      res.status(404).json({ message: "Meeting not found" });
      return;
    }

    res.json(out);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving meeting: ${error.message}` });
  }
};

export const createMeetingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // todo: the following is temp. get this back later
    // const result = createMeetingSchema.safeParse(req.body);
    // if (!result.success) {
    //   res.status(400).json({ errors: result.error.issues.map(i => i.message) });
    //   return;
    // }

    const meetingToCreate = {
      // ...result.data,
      visibility: "Private",
      description: req.body.description || null,
      location: "Angler",
      createdBy: req.body.createdBy,
    } as NewMeeting;

    const createdMeeting = await createMeeting(meetingToCreate);
    if (!createdMeeting) {
      res.status(404).json({ error: "Failed to create a new meeting." });
      return;
    }

    res.json("Meeting successfully created.")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating Meeting: ${error.message}` });
  }
}

export const updateMeetingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = updateMeetingSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten() });
      return;
    }

    const updatedMeeting = await updateMeeting(id, result.data);
    if (!updatedMeeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }

    res.json("Meeting successfully updated.")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating meeting: ${error.message}` });
  }
}

// todo:
// export const deleteMeetingController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     await deleteMeeting(id);

//     res.json("Meeting uccessfully deleted.")
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `Error deleting meeting: ${error.message}` });
//   }
// }
