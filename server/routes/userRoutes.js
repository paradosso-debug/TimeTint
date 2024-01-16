import express from "express";
import * as dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const router = express.Router(); // Define the router

router.post("/", async (req, res) => {
  // Change route path to '/'
  try {
    const { username, password, address, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password, address, phone });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; // Correctly export the router
