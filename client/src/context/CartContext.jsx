import React, { createContext, useContext, useState } from "react";

// Create a new Context for the cart
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps your app and makes the cart context available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = async (product) => {
    setCartItems((prevItems) => {
      const productIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );
      if (productIndex !== -1) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[productIndex] = {
          ...updatedCartItems[productIndex],
          quantity: updatedCartItems[productIndex].quantity + 1,
        };
        return updatedCartItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Persist the cart to the backend
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/cart/add", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error adding product to cart on server", error);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((currentItems) => {
      const productIndex = currentItems.findIndex(
        (item) => item._id === itemId
      );

      if (productIndex !== -1) {
        // Check if the product has more than one quantity
        if (currentItems[productIndex].quantity > 1) {
          // Reduce the quantity by one
          const updatedCartItems = [...currentItems];
          updatedCartItems[productIndex] = {
            ...updatedCartItems[productIndex],
            quantity: updatedCartItems[productIndex].quantity - 1,
          };
          return updatedCartItems;
        } else {
          // If quantity is 1, remove the item completely
          return currentItems.filter((item) => item._id !== itemId);
        }
      } else {
        // Product not found, return the original cart
        return currentItems;
      }
    });
  };

  const setCart = (items) => {
    setCartItems(items);
  };

  // The provider passes down the cartItems, addToCart, and removeFromCart functions to all children
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
