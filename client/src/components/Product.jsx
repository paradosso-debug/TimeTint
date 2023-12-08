import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from '../context/CartContext.jsx'; 



const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const { addToCart } = useCart(); // Destructure the addToCart function from the context for use

  
  const handleAddToCart = () => {
    const product = products[currentProductIndex];
    addToCart(product);
  };

 



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error.message);
        console.log(error); // This will log the entire error object
      }
    };

    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentProductIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleNext = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };


 

  return (
    <div className="products-wrapper">
      <div className="product-container-first">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="product-left-container"
        >
          <motion.h1
            initial={{ color: "#E5E4E2" }}
            animate={{ color: ["#E5E4E2", "#7F7C82", "#000000"] }}
            transition={{
              delay: 2,
              duration: 3,
              times: [0, 0.6, 1],
              ease: "easeInOut",
            }}
          >
            Elevate Every Moment
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="product-left-h2"
          >
            Experience the luxurious blend of sophistication and precision with
            TimeTint's high-end collection.
          </motion.h2>
        </motion.div>
      </div>

      <div className="product-container-second">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="slider-item"
        >
          <div className="image-with-navigation">
            {products.length > 0 ? (
              <img
                src={products[currentProductIndex].image}
                alt="product-image"
                className="slider-image"
              />
            ) : (
              <div>Loading...</div>
            )}
            <div className="slider-navigation">
              <button className="slider-button" onClick={handlePrev}>&lt;</button>
              <button className="slider-button" onClick={handleNext}>&gt;</button>
            </div>
          </div>
          <div className="slider-description">
            {products.length > 0 && (
              <>
                <h3 className="product-name">{products[currentProductIndex].name}</h3>
                <p>{products[currentProductIndex].description}</p>
                <p className="slider-price">
                  {products[currentProductIndex].price}
                </p>
                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>

              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
