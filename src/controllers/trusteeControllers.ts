import { Request, Response } from "express";

export const getTrustee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const trustee = {}; // get from db

    if (trustee) {
      res.json(trustee);
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
    const { cognitoId, name, email, phoneNumber } = req.body;

    const trustee = {}; // create in db

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
    const { name, email, phoneNumber } = req.body;

    const trustee = {}; // update in db

    res.json(trustee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating trustee: ${error.message}` });
  }
};
