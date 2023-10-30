import express from "express";
import * as dotenv from "dotenv";
import Review from "../models/reviews.js";

dotenv.config();

const router = express.Router();

//GET ALL Reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

export default router;
