import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext({ cartItems: [], addToCart: () => {} });

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps your app and makes the cart context available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  // Function to add an item to the cart
  const addToCart = (product) => {
   
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // The provider passes down the cartItems and the addToCart function to all children
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
