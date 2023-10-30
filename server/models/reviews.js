import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
