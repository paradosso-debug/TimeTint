import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "../context/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider> {/* Wrap your routes with CartProvider */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;



