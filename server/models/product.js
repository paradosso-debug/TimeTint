import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    // Changed price to Number for better handling of pricing data
    price: { type: Number, required: true },
    // Instead of storing the image in the database, store a reference to where the image is hosted
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
