import express from "express";
import multer from "multer";
import { authMiddleware } from "../authMiddleware";
import {
  getEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from "../controllers/eventControllers";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getEventsController);
router.get("/:id", getEventByIdController);
router.post("/", authMiddleware(["crew"]), upload.none(), createEventController);
router.patch("/:id", authMiddleware(["crew"]), updateEventController);
router.delete("/:id", authMiddleware(["crew"]), deleteEventController);

export default router;
