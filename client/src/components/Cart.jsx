import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-container-first">
          <div className="cart-info-left">
            <div className="payment-details">
              <h1>Payment Details</h1>
              <h2 className="card-details">Card Details</h2>
              <form className="payment-form">
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                  />
                </div>
                <div className="input-group double-input">
                  <div className="input-half">
                    <label htmlFor="expirationDate">Expiration Date</label>
                    <input
                      type="text"
                      id="expirationDate"
                      name="expirationDate"
                      required
                    />
                  </div>
                  <div className="input-half">
                    <label htmlFor="cvc">CVC</label>
                    <input type="text" id="cvc" name="cvc" required />
                  </div>
                </div>
                <h2 className="shipping-details">Shipping Details</h2>
                <div className="input-group double-input">
                  <div className="input-half">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="input-half">
                    <label htmlFor="mobilenumber">Mobile Number</label>
                    <input
                      type="text"
                      id="mobilenumber"
                      name="mobilenumber"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" required />
                </div>

                <div className="input-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" required />
                </div>
                <div className="input-group double-input">
                  <div className="input-half">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" required />
                  </div>
                  <div className="input-half">
                    <label htmlFor="zip">ZIP</label>
                    <input type="text" id="zip" name="zip" required />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" name="country" required />
                </div>
              </form>
            </div>
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
                        : "cart-image-multiple"
                    }`}
                    src={item.image}
                    alt={item.name}
                  />
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1 ? "info-single" : "info-multiple"
                    }`}
                  >
                    Name: {item.name}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1 ? "info-single" : "info-multiple"
                    }`}
                  >
                    {item.description}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1 ? "info-single" : "info-multiple"
                    }`}
                  >
                    {item.price}
                  </p>
                  <p
                    className={`cart-items-info ${
                      cartItems.length === 1 ? "info-single" : "info-multiple"
                    }`}
                  >
                    Quantity: {item.quantity}
                  </p>
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
