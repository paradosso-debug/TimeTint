// paymentRoutes.js
import express from "express";
import * as dotenv from "dotenv";
import {
  generateToken,
  processPayment,
} from "../controllers/paymentController.js";
dotenv.config();
const router = express.Router();

router.get("/api/getToken", generateToken);
router.post("/process", processPayment);

export default router;
