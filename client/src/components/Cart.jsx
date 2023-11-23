import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { cartItems } = useCart();

  function bufferToBase64(buf) {
    let binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }

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
              <div key={item._id}>
                <img
                  src={`data:${item.image.contentType};base64,${bufferToBase64(item.image.data)}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
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
          }
export default Cart;