import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;