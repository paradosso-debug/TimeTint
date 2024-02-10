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
        // Assuming the user data is returned in the `data` field of the response
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const cartResponse = await axios.get("http://localhost:5001/api/mycart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items");
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
            <p>Phone: {userData.phone}</p> {/* Add this line */}
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
              <li key={item.id}>
                {item.name} - Description: {item.description}, Price: $
                {item.price}, Quantity: {item.quantity}
                <img src={item.imageUrl} alt={item.name} />
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
