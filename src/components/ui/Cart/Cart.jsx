"use client";

import Link from "next/link";

import { useCart } from "@/app/context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import CartTrust from "./CartTrust";

import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalQuantity,
    subtotal,
    deliveryFee,
    discount,
    totalAmount,
    freeDeliveryThreshold,
  } = useCart();

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <span className="cart-eyebrow">YOUR SHOPPING CART</span>

          <h1>
            Freshness in Your <span>Basket</span>
          </h1>

          <p>
            Review your farm-fresh dairy products before placing your order.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="cart-count">
            {totalQuantity}{" "}
            {totalQuantity === 1 ? "Item" : "Items"}
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            <div className="cart-section-title">
              <h2>Your Items</h2>

              <span>
                {totalQuantity}{" "}
                {totalQuantity === 1 ? "product" : "products"}
              </span>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}

            <Link href="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>

          <CartSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={totalAmount}
            freeDeliveryThreshold={freeDeliveryThreshold}
          />
        </div>
      )}

      <CartTrust />
    </section>
  );
}