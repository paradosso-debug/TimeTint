import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get("http://localhost:5001/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else if (error.response && error.response.status === 403) {
          setError("Forbidden. Invalid token.");
        } else {
          setError("Failed to fetch user data");
        }
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const cartResponse = await axios.get(
          "http://localhost:5001/api/cart/user-cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched cart items:", cartResponse.data); // Debugging
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items from server.");
      }
    };

    fetchUserData();
    fetchCartItems();
  }, []);

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/reset-password",
        { newPassword }
      );
      console.log("Password reset successful", response.data);
      setSuccessMessage("Password reset successful");
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error resetting password");
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="user-details">
        {userData && (
          <div className="user-info">
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Address: {userData.address}</p>
            <p>Phone: {userData.phone}</p>
          </div>
        )}
      </div>

      <div className="password-reset">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button onClick={handlePasswordReset}>Reset Password</button>
      </div>

      <div className="cart-details">
        <h2>Cart Items</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item?.product?._id}>
                {item?.product?.name ? item.product.name : "Unknown Product"} -
                Description: {item?.product?.description || "No description"},
                Price: ${item?.product?.price || "N/A"}, Quantity:{" "}
                {item.quantity}
                <img
                  src={item?.product?.imageUrl || ""}
                  alt={item?.product?.name || "Product Image"}
                  style={{ maxWidth: "100px" }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
