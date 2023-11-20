import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  
});

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);


// Provider component that wraps your app and makes the cart context available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  // State to hold the count of items in the cart
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

 

  // Function to modify the cartCount, increasing it by 1 each time it's called
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product is already in the cart
      const productExists = prevItems.find((item) => item._id === product._id);
  
      if (productExists) {
        // If it exists, update the quantity or return as is
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it doesn't exist, add the new product to the cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  
    setCartCount((prevCount) => prevCount + 1);
  };
  
  // The provider passes down the cartCount and the addToCart function to all children
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
