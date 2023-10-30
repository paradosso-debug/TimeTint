import React from "react";
import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";
import Reviews from "./Reviews";

function Main() {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="saying-container"
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
          className="saying-title"
        >
          Orchestrating Timeless Elegance On Every Wrist.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="saying-content"
        >
          Our watches are masterpieces that empower you to make a statement,
          bringing an unparalleled level of grace and sophistication to every
          moment of your life.
        </motion.p>
        <Reviews/>
      </motion.div>
      <img className="main-home" src={watch} alt="clock-men-image" />
    </>
  );
}

export default Main;
