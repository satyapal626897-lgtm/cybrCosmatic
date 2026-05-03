import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/Admin.css";

const DashboardLayout = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link>
          <Link to="/admin/products" className={isActive("/admin/products")}>Manage Products</Link>
          <Link to="/" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>Back to Store</Link>
        </nav>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;