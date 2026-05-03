import React from 'react'
import '../css/Home.css'
import heroImg from '../assets/hero.png'
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
const Home = () => { 

  const { cart, addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMsg(`😊${product.name} added to your cart!`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const products = [
    {
      _id: "1",
      name: "Silk Radiance Foundation",
      price: 349,
      category: "Face",
      images: [
        "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "2",
      name: "Velvet Matte Lipstick",
      price: 129,
      category: "Lips",
      images: [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1615397323758-1e411b0e02d8?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "3",
      name: "Hydra-Glow Serum",
      price: 499,
      category: "Skincare",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1615397323758-1e411b0e02d8?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "4",
      name: "Keratin Hair Repair Mask",
      price: 189,
      category: "Hair",
      images: [
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "5",
      name: "Vitamin C Brightening Toner",
      price: 899,
      category: "Skincare",
      images: [
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1601049541289-9b1b7ce81fcb?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "6",
      name: "Rose Quartz Face Roller",
      price: 149,
      category: "Tools",
      images: [
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1608248593842-8021c640989f?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1512496015851-a1fbaf692a9f?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "7",
      name: "Nourishing Body Butter",
      price: 119,
      category: "Body",
      images: [
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1614859324967-bdf471b48b9f?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1555820585-c5ae4afc2fef?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "8",
      name: "Argan Hair Oil Deep Nourish",
      price: 219,
      category: "Hair",
      images: [
        "https://images.unsplash.com/photo-1608528577891-b3b03657b01b?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&auto=format&fit=crop"  // Right
      ]
    },
    {
      _id: "9",
      name: "Midnight Orchid Perfume",
      price: 549,
      category: "Fragrance",
      images: [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop", // Front
        "https://images.unsplash.com/photo-1595425970377-c9703d7408f4?w=500&auto=format&fit=crop", // Back
        "https://images.unsplash.com/photo-1594532930263-5095dff320ab?w=500&auto=format&fit=crop", // Left
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop"  // Right
      ]
    }
  ];


  return (
    <div className="home-container" style={{ position: 'relative' }}>
      
      
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#2d3436', color: '#fff', padding: '12px 24px',
          borderRadius: '30px', zIndex: 9999, boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
          transition: 'all 0.3s ease', animation: 'fadeInDown 0.4s ease-out'
        }}>
          {toastMsg}
        </div>
      )}
     
      <section className="hero">
        <div className="hero-circle"></div>
        <div className="hero-content animate-fade-in">
          <span className="hero-tagline">Premium Collection 2026</span>
          <h1>Reveal Your <br />Natural Glow</h1>
          <p>
            Discover the pinnacle of luxury skincare and professional cosmetics. 
          </p>
          <div className="hero-btns">
            <button className="btn-primary">Shop Now</button>
          </div>
        </div>
        <div className="hero-image-container animate-fade-in">
          <img src={heroImg} alt="Luxury Cosmetics" className="hero-image" />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          {cart.length > 0 && <p className="cart-count">Cart Items: {cart.length}</p>}
        </div>

        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-images-slider">
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <div key={index} className="slider-image-item">
                      <img 
                        src={typeof img === 'string' ? img : img.url} 
                        alt={`${product.name} ${index + 1}`} 
                      />
                    </div>
                  ))
                ) : (
                  <div className="slider-image-item">
                    <img src="https://via.placeholder.com/300" alt="Placeholder" />
                  </div>
                )}
              </div>
              
              <div className="slider-dots">
                {product.images && product.images.map((_, index) => (
                  <span key={index} className="dot"></span>
                ))}
              </div>

              <div className="product-info">
                <span className="category-tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
              </div>

              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart 🛒</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home
