// paymentRoutes.js
import express from "express";
import {
  generateToken,
  processPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/getToken", generateToken);
router.post("/process", processPayment);

export default router;
