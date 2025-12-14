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
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((deliveryRes) => {
        setDeliveryOptions(deliveryRes.data);
        // console.log(deliveryRes.data);
      });

    axios.get("/api/payment-summary").then((paymentSummaryRes) => {
      setPaymentSummary(paymentSummaryRes.data);
    });
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
