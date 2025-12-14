import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import OrdersPage from "./pages/OrdersPage";

import "./App.css";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      const cartRes = await axios.get("/api/cart-items?expand=product");
      setCartItems(cartRes.data);
    };
    getCartItems();
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
