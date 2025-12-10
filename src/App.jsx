import { useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

import "./App.css";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
