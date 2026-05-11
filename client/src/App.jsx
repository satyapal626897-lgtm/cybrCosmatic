import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import Home from "./pages/Home";
import Login from "./auth/Login";
import AdminLogin from "./auth/AdminLogin";
import Signup from "./auth/Signup";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Brands from "./pages/Brands";
import Checkout from "./pages/checkout";



import DashboardLayout from "./admin/DashboardLayout";
import Dashboard from "./admin/Dashboard";
import Product from "./admin/Products";
import ChatBox from "./components/ChatBox";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="brands" element={<Brands />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
      <ChatBox />
    </BrowserRouter>
  );
};

export default App;