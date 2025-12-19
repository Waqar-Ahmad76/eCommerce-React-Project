import dayjs from "dayjs";
import axios from "axios";
import React from "react";
import { formatPrice } from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

function OrderSummary({ deliveryOptions, cartItems, getCartItems }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cartItems.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

          async function deleteCartItem() {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await getCartItems();
          }
          // console.log(selectedDeliveryOption);
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  " dddd, MMMM D"
                )}{" "}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatPrice(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  getCartItems={getCartItems}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
