import { useState, useEffect } from "react";

import axios from "axios";

import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

import "./CheckoutPage.css";

export default function CheckoutPage({ cartItems }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getDeliveryOptions = async () => {
      const deliveryRes = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(deliveryRes.data);
    };

    const getPaymentSummary = async () => {
      const paymentSummaryRes = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentSummaryRes.data);
    };

    getDeliveryOptions();
    getPaymentSummary();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cartItems={cartItems}
            deliveryOptions={deliveryOptions}
          />
          {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
        </div>
      </div>
    </>
  );
}
