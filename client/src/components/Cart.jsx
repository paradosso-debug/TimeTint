import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import DropIn from 'braintree-web-drop-in-react';
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added for error handling

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  // Fetch payment gateway token
  const getToken = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const { data } = await axios.get('/api/getToken'); // Assuming proxy setup for the API
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch payment token"); // Set error for user feedback
    } finally {
      setLoading(false); // Reset loading state after fetch
    }
  };

  useEffect(() => {
    getToken();
  }, []); // Add dependencies if needed

  // Handle payments
  const handlePayment = async (event) => {
    event.preventDefault();
    if (!instance) {
      setError("Payment instance not loaded");
      return;
    }
    // Payment process implementation
    try {
      setLoading(true); // Indicate loading during payment process
      // Call instance.requestPaymentMethod() and send data to your server
      // Handle server response
    } catch (error) {
      console.error(error);
      setError("Payment failed"); // Set error for user feedback
    } finally {
      setLoading(false); // Reset loading state after payment attempt
    }
  };


  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-container-first">
          <div className="cart-info-left">
          <h1>Payment Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {clientToken && (
              <form onSubmit={handlePayment}>
                <DropIn
                  options={{ authorization: clientToken, paypal: { flow: 'vault' } }}
                  onInstance={instance => setInstance(instance)}
                />
                <button type="submit">Make Payment</button>
              </form>
             )}
            </div>
      </div>
   


        <div className="cart-container-second">
          <div className="cart-info-right">
            <h2>Order Details</h2>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className={
                    cartItems.length === 1
                      ? "single-item"
                      : cartItems.length === 2
                      ? "two-items"
                      : cartItems.length === 3
                      ? "three-items"
                      : cartItems.length === 4
                      ? "four-items"
                      : cartItems.length === 5
                      ? "five-or-more-items"
                      : cartItems.length === 6
                      ? "five-or-more-items"
                      : cartItems.length === 7
                      ? "five-or-more-items"
                      : cartItems.length === 8
                      ? "five-or-more-items"
                      : cartItems.length === 9
                      ? "five-or-more-items"
                      : "multiple-items"
                  }
                >
                  <img
                    className={`cart-image ${
                      cartItems.length === 1
                        ? "cart-image-single"
                        : cartItems.length === 2
                        ? "cart-image-two"
                        : "cart-image-multiple"
                    }`}
                    src={item.image}
                    alt={item.name}
                  />
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1
                        ? "info-item-single"
                        : cartItems.length === 2
                        ? "info-item-two"
                        : cartItems.length === 3
                        ? "info-item-three"
                        : cartItems.length === 4
                        ? "info-item-four"
                        : "info-multiple"
                    }`}
                  >
                    Name: {item.name}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1
                        ? "info-item-single"
                        : cartItems.length === 2
                        ? "info-item-two"
                        : cartItems.length === 3
                        ? "info-item-three"
                        : cartItems.length === 4
                        ? "info-item-four"
                        : "info-multiple"
                    }`}
                  >
                    {item.description}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1
                        ? "info-item-single"
                        : cartItems.length === 2
                        ? "info-item-two"
                        : cartItems.length === 3
                        ? "info-item-three"
                        : cartItems.length === 4
                        ? "info-item-four"
                        : "info-multiple"
                    }`}
                  >
                    {item.price}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1
                        ? "info-item-single"
                        : cartItems.length === 2
                        ? "info-item-two"
                        : cartItems.length === 3
                        ? "info-item-three"
                        : cartItems.length === 4
                        ? "info-item-four"
                        : "info-multiple"
                    }`}
                  >
                    Quantity: {item.quantity}
                  </p>
                  <button
                    className={`remove-item-btn ${
                      cartItems.length === 1
                        ? "remove-item-btn-single"
                        : cartItems.length === 2
                        ? "remove-item-btn-two"
                        : cartItems.length === 4
                        ? "remove-item-btn-multiple"
                        : cartItems.length === 5
                        ? "remove-item-btn-multiple"
                        : cartItems.length === 6
                        ? "remove-item-btn-multiple"
                        : cartItems.length === 7
                        ? "remove-item-btn-multiple"
                        : cartItems.length === 8
                        ? "remove-item-btn-multiple"
                        : cartItems.length === 9
                        ? "remove-item-btn-multiple"
                        : "remove-item-default"
                    }`}
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;


// fetch("/payment/getToken", {
//   method: "GET",
//   headers: {
//     'Cache-Control': 'no-cache'
//   }
// })
// .then(response => response.text())
// .then(token => setClientToken(token))
// .catch(err => console.log(err));

// const handleRemove = (itemId) => {
//   removeFromCart(itemId);
// };

// const handlePayment = (event) => {
//   event.preventDefault();
//   if (!instance) {
//     console.error('Payment instance not loaded');
//     return;
//   }
//   setProcessing(true);

//   // Calculate total cart value
//   const totalAmount = cartItems.reduce((total, item) => {
//     return total + (parseFloat(item.price) * item.quantity);
//   }, 0).toFixed(2);

//   instance.requestPaymentMethod().then(({ nonce }) => {
//     // Send nonce and total amount to your server for processing
//     fetch("/payment/process", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ paymentMethodNonce: nonce, amount: totalAmount }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         // Payment processed successfully
//         console.log("Payment Success:", data);
//         // TODO: Clear cart and show success message
//       } else {
//         // Payment failed
//         console.log("Payment Failed:", data);
//         // TODO: Show error message
//       }
//       setProcessing(false);
//     })
//     .catch(err => {
//       console.error("Payment Error:", err);
//       setProcessing(false);
//     });
//   })
//   .catch(err => {
//     console.error("Payment Method Error:", err);
//     setProcessing(false);
//   });
// };