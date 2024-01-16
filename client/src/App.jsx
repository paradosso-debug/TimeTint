import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"; // Presumably, your LoginForm is rendered inside this component
import SignUp from "./pages/SignUp";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"; // Presumably, your Profile component is rendered inside this component
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
         
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;



