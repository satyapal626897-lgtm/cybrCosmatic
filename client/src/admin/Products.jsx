import React, { useState } from "react";
import axios from "axios";
import "../css/Admin.css";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    images: []
  });

 
  const mockProducts = [
    { id: 1, name: "Silk Radiance Foundation", price: "₹3,49", category: "Face", stock: 12, status: "In Stock" },
    { id: 2, name: "Velvet Matte Lipstick", price: "₹1,29", category: "Lips", stock: 5, status: "Low Stock" },
    { id: 3, name: "Hydra-Glow Serum", price: "₹4,99", category: "Skincare", stock: 24, status: "In Stock" },
  ];


  const handleChange = (e) => {
    setProduct({...product,[e.target.name]: e.target.value});
  };

  const handleImages = (e) => {
    setProduct({...product, images: Array.from(e.target.files)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    product.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("http://localhost:8000/api/product/add", formData);
      alert("Product Added Successfully!");

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h1>Manage Products</h1>
        <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Add New Product</button>
      </div>

      <div className="admin-form-card">
        <h3>Add New Product</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Enter product details and upload an image to list it in the store.</p>
        
        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div className="admin-input-group">
            <label>Product Name</label>
            <input name="name" placeholder="e.g. Matte Lipstick" onChange={handleChange} required />
          </div>

          <div className="admin-input-group">
            <label>Price (₹)</label>
            <input name="price" type="number" placeholder="1299" onChange={handleChange} required />
          </div>


          <div className="admin-input-group">
            <label>Category</label>
            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Face">Face</option>
              <option value="Lips">Lips</option>
              <option value="Eyes">Eyes</option>
              <option value="Skincare">Skincare</option>
            </select>
          </div>

          <div className="admin-input-group">
            <label>Stock Quantity</label>
            <input name="stock" type="number" placeholder="100" onChange={handleChange} required />
          </div>

          <div className="admin-input-group" style={{ gridColumn: '1 / -1' }}>
            <label>Product Images (Select 4)</label>
            <input type="file" multiple onChange={handleImages} required style={{ border: '1px dashed #ccc', padding: '20px', background: '#fcfcfc' }} />
          </div>

          <button type="submit" className="admin-submit-btn">Publish Product</button>
        </form>
      </div>

      <div className="admin-card">
        <h3>Inventory List</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock} units</td>
                <td>
                  <span className={`status-badge ${p.status === 'In Stock' ? 'status-in-stock' : 'status-low'}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">✏️</button>
                  <button className="action-btn action-delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
