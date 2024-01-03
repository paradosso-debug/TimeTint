// paymentRoutes.js
import express from "express";
import {
  generateToken,
  processPayment,
} from "../controllers/paymentController.js";
import PaymentDetail from "../models/paymentDetail.js";

const router = express.Router();

router.get("/getToken", generateToken);
router.post("/process", processPayment);

router.post("/save", async (req, res) => {
  try {
    const { name, address, phone, amount } = req.body;
    const paymentDetail = new PaymentDetail({ name, address, phone, amount });
    await paymentDetail.save();
    res.status(201).send({ message: "Payment details saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error saving payment details", error });
  }
});

export default router;
