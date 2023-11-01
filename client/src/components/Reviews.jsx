import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.response);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change the review every 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      <div className="reviews-container">
        <div className="reviews-second-container">
        <h1>Testimonials</h1>
        <h2 className="testimonials">
          {" "}
          {reviews[currentReviewIndex]
            ? `"${reviews[currentReviewIndex].text}"`
            : ""}{" "}
        </h2>
        <p className="arthor">
          {reviews[currentReviewIndex]
            ? reviews[currentReviewIndex].author
            : ""}
        </p>
        </div>
      </div>
    </>
  );
};

export default Reviews;
