import express from "express";
import * as dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

const router = express.Router();

//GET ALL Products
router.get("/", async (req, res) => {
  const product = await Product.find();
  res.json(product);
});

export default router;
