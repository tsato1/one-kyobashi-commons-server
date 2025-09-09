import { Request, Response } from "express";
import { createUser, getUserByCognitoId, updateUser } from "../data-access/user";

export const getTrustee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const trustee = await getUserByCognitoId(cognitoId);

    if (trustee.length === 1) {
      res.json(trustee[0]);
    } else {
      res.status(404).json({ message: "Trustee not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving trustee: ${error.message}` });
  }
};

export const createTrustee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email } = req.body;

    const trustee = await createUser({
      cognitoId,
      name,
      email,
    });

    res.status(201).json(trustee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating trustee: ${error.message}` });
  }
};

export const updateTrustee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, image } = req.body;

    // todo: validate inputs
    // todo: update cognito

    const trustee = await updateUser(
      cognitoId,
      {
        name,
        email,
        image,
        updatedAt: new Date()
      }
    );

    res.json(trustee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating trustee: ${error.message}` });
  }
};
