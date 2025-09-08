import { Request, Response } from "express";
import { createUser, getUserByCognitoId, updateUser } from "../data-access/user";

export const getCrew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const crew = await getUserByCognitoId(cognitoId);

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
    const { cognitoId, name, email } = req.body;

    const crew = await createUser({
      cognitoId,
      name,
      email,
    });

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
    const { name, email, image } = req.body;

    const crew = await updateUser(
      cognitoId,
      {
        name,
        email,
        image,
        updatedAt: new Date()
      }
    );

    res.json(crew);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating crew: ${error.message}` });
  }
};
