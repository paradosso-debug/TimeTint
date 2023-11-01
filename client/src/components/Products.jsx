import React from "react";
import { motion } from "framer-motion";

const Products = () => {
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
            Elevate Every Moment.
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

      <div className="product-container-second">Products</div>
    </div>
  );
};

export default Products;
