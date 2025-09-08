import { Request, Response } from "express";

export const getCrew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const crew = {}; // get from db

    if (crew) {
      res.json(crew);
    } else {
      res.status(404).json({ message: "Crew not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving crew: ${error.message}` });
  }
};

export const createCrew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const crew = {}; // create in db

    res.status(201).json(crew);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating crew: ${error.message}` });
  }
};

export const updateCrew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;

    const crew = {}; // update in db

    res.json(crew);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating crew: ${error.message}` });
  }
};
