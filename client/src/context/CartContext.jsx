import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps your app and makes the cart context available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  // State to hold the count of items in the cart
  const [cartCount, setCartCount] = useState(0);

  // Function to modify the cartCount, increasing it by 1 each time it's called
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  // The provider passes down the cartCount and the addToCart function to all children
  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
