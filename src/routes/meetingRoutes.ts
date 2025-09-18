import express from "express";
import multer from "multer";
import { authMiddleware } from "../authMiddleware";
import {
  getMeetingsController,
  getMeetingByIdController,
  createMeetingController,
  updateMeetingController,
} from "../controllers/meetingControllers";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getMeetingsController);
router.get("/:id", getMeetingByIdController);
router.post("/", authMiddleware(["trustee"]), upload.none(), createMeetingController);
router.patch("/:id", authMiddleware(["trustee"]), updateMeetingController);

export default router;
