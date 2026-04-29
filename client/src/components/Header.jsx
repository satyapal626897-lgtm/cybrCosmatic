import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
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

        <Link to="/login" className="login-btn">Log In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;