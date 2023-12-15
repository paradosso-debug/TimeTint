import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const getToken = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/payment/getToken"
        );
        setClientToken(response.data);
      } catch (err) {
        console.error("Error fetching token:", err);
        setError("Failed to fetch payment token");
      } finally {
        setLoading(false);
      }
    };

    getToken();

    // Calculate total amount of products
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!instance) {
      setError("Payment instance not loaded");
      return;
    }

    try {
      setLoading(true);
      const payload = await instance.requestPaymentMethod();
      console.log("Payment method payload:", payload); // Added for debugging
      // Here, send payload.nonce to your server
      // ...
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Form submission for customer details (separate from payment)
  const handleCustomerDetailsSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle the customer details, such as sending them to a server
    console.log("Customer Name:", name);
    console.log("Customer Address:", address);
    console.log("Customer Number:", number);
  };

  console.log("Client Token:", clientToken); // This should print the actual token string
  console.log("Error:", error); // This should be empty if there's no error
  console.log("Loading:", loading); // This should be false if it's not loading

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-container-first">
          <div className="cart-info-left">
            <h1>Payment Details</h1>
            <form onSubmit={handleCustomerDetailsSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="number"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <div className="total-amount">
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
              </div>
              <button type="submit">Submit Details</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {clientToken && (
              <form onSubmit={handlePayment}>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
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
                    ${item.price}
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
