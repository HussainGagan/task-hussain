import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  return (
    <div className="main">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
