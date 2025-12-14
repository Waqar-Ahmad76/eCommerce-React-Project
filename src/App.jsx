import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

import "./App.css";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((cartRes) => {
      setCartItems(cartRes.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route path="/orders" element={<OrdersPage cartItems={cartItems} />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
