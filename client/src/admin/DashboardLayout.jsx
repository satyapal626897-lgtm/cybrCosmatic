import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
    
      <div style={{ width: "220px", background: "#111", color: "#fff", padding: "20px" }}>
        <h2>Admin Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <Link to="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
          <Link to="/admin/products" style={{ color: "#fff" }}>Products</Link>
          <Link to="/admin/products/add" style={{ color: "#fff" }}>Add Product</Link>
          <Link to="/admin/orders" style={{ color: "#fff" }}>Orders</Link>
        </nav>
      </div>

     
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;