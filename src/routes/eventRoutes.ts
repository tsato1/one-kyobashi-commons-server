import express from "express";
import {
  getEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from "../controllers/eventControllers";
import { authMiddleware } from "../authMiddleware";

const router = express.Router();

router.get("/", getEventsController);
router.get("/:id", getEventByIdController);
router.post("/", authMiddleware(["admin", "trustee", "crew"]), createEventController);
router.patch("/:id", authMiddleware(["admin", "trustee", "crew"]), updateEventController);
router.delete("/:id", authMiddleware(["admin", "trustee", "crew"]), deleteEventController);

export default router;
