// orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Define your schema fields here
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  // Add other fields as needed
});

export default mongoose.model("Order", orderSchema);
