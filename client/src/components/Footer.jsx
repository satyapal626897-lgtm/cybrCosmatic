import React from "react";
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
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/brands">Brands</a>
          <a href="/about">About</a>
        </div>

        <div className="footer-section">
          <h3>Customer Care</h3>
          <a href="/">Contact Us</a>
          <a href="/">Shipping</a>
          <a href="/">Returns</a>
          <a href="/">FAQ</a>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Satya Beauty | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;