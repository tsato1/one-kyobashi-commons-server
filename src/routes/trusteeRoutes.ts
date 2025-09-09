import express from "express";
import {
  getTrustee,
  createTrustee,
  updateTrustee,
} from "../controllers/trusteeControllers";

const router = express.Router();

router.get("/:cognitoId", getTrustee);
router.patch("/:cognitoId", updateTrustee);
router.post("/", createTrustee);

export default router;
