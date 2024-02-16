// Importing necessary modules and middleware
import express from "express";
import Cart from "../models/cartModel"; // Adjust the path as necessary
import authenticateToken from "../middleware/authenticateToken"; // Adjust the path as necessary

const router = express.Router();

// Your existing route for fetching cart items
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this matches the payload structure of your JWT
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const responseItems = cart.items.map((item) => ({
      id: item.product._id,
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
    }));
    res.json(responseItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message });
  }
});

// New endpoint specifically for the user profile page
router.get("/user-cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming your authentication middleware correctly extracts the user ID
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "No cart found for this user" });
    }
    // This response is tailored for the profile page, could include additional fields if necessary
    const responseItems = cart.items.map((item) => ({
      id: item.product._id,
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl, // Assuming products have an 'imageUrl' field
    }));
    res.json(responseItems);
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res
      .status(500)
      .json({
        message: "Error fetching cart for profile",
        error: error.message,
      });
  }
});

// Export the router
export default router;
