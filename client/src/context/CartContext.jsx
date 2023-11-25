import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(item => item._id === newItem._id);
      if (existingItem) {
        // If exists, increase the quantity
        return prevItems.map(item =>
          item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If not, add the new item with a quantity of 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Provide both cartItems and addToCart to the context
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
