// routes/cartRoutes.js
import express from "express";
import Cart from "../models/cartModel"; // Adjust the path as necessary
import authenticateToken from "../middleware/authenticateToken"; // Adjust the path as necessary

const router = express.Router();

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

export default router;
