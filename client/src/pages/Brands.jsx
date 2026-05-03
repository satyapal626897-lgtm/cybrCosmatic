import React from 'react'

const Brands = () => {
  const brands = [
    { name: "L'Oréal", logo: "🌟" },
    { name: "Maybelline", logo: "✨" },
    { name: "MAC", logo: "💄" },
    { name: "Estée Lauder", logo: "🌸" },
    { name: "Clinique", logo: "💧" },
    { name: "NARS", logo: "🎨" }
  ];

  return (
    <div className="home-container" style={{ padding: '60px 5%' }}>
      <div className="section-header">
        <h2>Our Brands</h2>
        <p>We partner with the world's most prestigious beauty labels.</p>
      </div>
      
      <div className="products-grid">
        {brands.map((brand, index) => (
          <div key={index} className="product-card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{brand.logo}</div>
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brands;
