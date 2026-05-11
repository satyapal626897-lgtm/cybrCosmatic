import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is feeling a little empty 🛍️</h2>
          <p style={{ color: '#888', marginBottom: '30px' }}>Fill it with our premium beauty products!</p>
          <Link to="/" className="continue-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-wrapper">
            {cart.map(item => (
              <div key={item._id} className="cart-item-card">
                <img src={item.images[0]} alt={item.name} className="cart-item-img" />

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item._id, -1)} className="qty-btn">−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="qty-btn">+</button>
                </div>

                <div className="cart-item-total">
                  <p className="item-total-price">₹{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#00b894', fontWeight: 'bold' }}>Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}>Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;