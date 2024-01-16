import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // This useEffect would be used to fetch user data and cart items when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from local storage or your state management solution
        const token = localStorage.getItem('token');

        // Make the authenticated request
        const userResponse = await axios.get('http://localhost:5001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchCartItems = async () => {
      try {
        // Replace with your actual API endpoint and include any needed headers
        const cartResponse = await axios.get('http://localhost:5001/api/user/cart');
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchUserData();
    fetchCartItems();
  }, []);

  const handlePasswordReset = async (newPassword) => {
    try {
      // Replace with your actual API endpoint and include any needed headers
      const response = await axios.post('http://localhost:5001/api/user/reset-password', { newPassword });
      console.log('Password reset successful', response.data);
      // Handle additional logic after password reset, like showing a message
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
          {/* Other user details */}
        </div>
      )}

      {/* Placeholder for password reset, implement a form to handle new password input */}
      <button onClick={() => handlePasswordReset('newPassword')}>Reset Password</button>

      <h2>Cart Items</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Profile;
