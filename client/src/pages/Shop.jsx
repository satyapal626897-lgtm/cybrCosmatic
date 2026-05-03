import React from 'react'
import '../css/Home.css'

const Shop = () => {
  const products = [
    { id: 1, name: "Silk Radiance Foundation", price: "₹3,499", icon: "✨", category: "Face" },
    { id: 2, name: "Velvet Matte Lipstick", price: "₹1,299", icon: "💄", category: "Lips" },
    { id: 3, name: "Hydra-Glow Serum", price: "₹4,999", icon: "💧", category: "Skincare" },
    { id: 4, name: "Celestial Eye Palette", price: "₹2,799", icon: "👁️", category: "Eyes" },
    { id: 5, name: "Rose Water Mist", price: "₹1,899", icon: "🌹", category: "Skincare" },
    { id: 6, name: "Golden Hour Bronzer", price: "₹2,499", icon: "☀️", category: "Face" },

  ];

  return (
    <div className="home-container" style={{ padding: '40px 0' }}>
      <div className="section-header">
        <h2>Our Collection</h2>
        <p>Explore our range of premium beauty products.</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.icon}</div>
            <div className="product-info">
              <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '600' }}>{product.category}</span>
              <h3>{product.name}</h3>
              <span className="product-price">{product.price}</span>
            </div>
            <div className="add-to-cart">+</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop;