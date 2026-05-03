import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Satya Beauty</h2>
          <p>
            Discover premium skincare, makeup, and beauty products crafted to
            enhance your natural glow.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/brands">Brands</Link>
        </div>


        <div className="footer-section">
          <h3>Customer Care</h3>
          <Link to="/">Contact Us</Link>
          <Link to="/">Shipping</Link>
          <Link to="/">Returns</Link>
          <Link to="/">FAQ</Link>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 Satya Beauty | All Rights Reserved</div>
    </footer>
  );
};

export default Footer;