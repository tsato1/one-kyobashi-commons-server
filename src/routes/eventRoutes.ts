import express from "express";
import {
  getEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from "../controllers/eventControllers";

const router = express.Router();

router.get("/", getEventsController);
router.get("/:id", getEventByIdController);
router.post("/", createEventController);
router.patch("/:id", updateEventController);
router.delete("/:id", deleteEventController);

export default router;
