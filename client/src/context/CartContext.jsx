import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  cartCount: 0,
});

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps your app and makes the cart context available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  // State to hold the count of items in the cart
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const isProductInCart = (product) => {
    return cartItems.some((item) => item._id === product._id);
  };

  // Function to modify the cartCount, increasing it by 1 each time it's called
  const addToCart = (product) => {
    if (!isProductInCart(product)) {
      setCartCount((prevCount) => prevCount + 1);
      setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  // The provider passes down the cartCount and the addToCart function to all children
  return (
    <CartContext.Provider value={{ cartCount, addToCart, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};
