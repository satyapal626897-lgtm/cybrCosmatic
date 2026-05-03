import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/Header.css";

const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-box">S</div>
        <h2>Satya Beauty</h2>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/admin/products">Products</Link> 
        <Link to="/brands">Brands</Link>
       
      </nav>

      <div className="header-right">
        <div className="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Search..." />
        </div>

        <Link to="/cart" className="cart-btn" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#333' }}>
          🛒 Cart {totalItems > 0 && <span style={{ background: '#e84393', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '12px' }}>{totalItems}</span>}
        </Link>

        <Link to="/login" className="login-btn">Log In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;