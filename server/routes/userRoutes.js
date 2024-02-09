import express from "express";
import jwt from "jsonwebtoken"; // Import JWT for token verification
import User from "../models/userModel.js";
import * as dotenv from "dotenv";

dotenv.config(); // Ensure that environment variables are loaded

const router = express.Router();

// Middleware to authenticate and verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from Bearer

  if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is not valid, return 403 Forbidden
    req.user = user; // Attach the user payload to the request
    next(); // Proceed to the next middleware or route handler
  });
};

// Route for user registration
router.post("/", async (req, res) => {
  try {
    const { username, password, address, phone, email, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, // Note: Ensure you hash the password before saving
      address,
      phone,
      email,
      name,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching user profile information
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Assuming the JWT's payload includes the username
    // Adjust based on how your JWT payload is structured
    const user = await User.findOne({ username: req.user.username }).select(
      "-password"
    ); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send user information back to the client
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example endpoint in userRoutes.js
router.get("/cart", authenticateToken, async (req, res) => {
  // Assuming you have a way to identify the user, e.g., from the JWT token
  try {
    const userId = req.user.id; // Or however you extract the user ID from the token
    const userCartItems = await CartModel.find({ userId: userId });
    res.json(userCartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send("Failed to fetch cart items");
  }
});

export default router;
