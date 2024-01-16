import express from "express";
import * as dotenv from "dotenv";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router(); // Define the router

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Here, you would generate and return a token if using JWT
    // For now, just return a success message
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router; // Correctly export the router
