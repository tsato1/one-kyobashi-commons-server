import express from "express";
import {
  getCrew,
  createCrew,
  updateCrew,
} from "../controllers/crewControllers";

const router = express.Router();

router.get("/:cognitoId", getCrew);
router.put("/:cognitoId", updateCrew);
router.post("/", createCrew);

export default router;
