"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import "./Cart.css";

// Individual Cart Item Component with Image Error Handling
function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  const [imgSrc, setImgSrc] = useState(item.image || "/logo.jpeg");

  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-product-image">
        <Image
          src={imgSrc}
          alt={item.name || "Product"}
          fill
          sizes="110px"
          onError={() => setImgSrc("/logo.jpeg")}
        />
      </div>

      {/* Product Details */}
      <div className="cart-product-details">
        {item.category && (
          <span className="cart-product-category">{item.category}</span>
        )}
        <h3>{item.name}</h3>
        <p>Pack Size: {item.size || "1 unit"}</p>
        <strong>₹{item.price}</strong>
      </div>

      {/* Quantity Control */}
      <div className="quantity-control">
        <button
          type="button"
          onClick={() => onDecrease(item.id)}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Item Subtotal & Remove */}
      <div className="item-total">
        <strong>₹{item.price * item.quantity}</strong>

        <button
          type="button"
          className="remove-item"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

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
  } = useCart();

  return (
    <section className="cart-page">
      {/* ================= HEADER ================= */}
      <div className="cart-header">
        <div>
          <span className="cart-eyebrow">YOUR SHOPPING CART</span>
          <h1>
            Freshness in Your <span>Basket</span>
          </h1>
          <p>Review your farm-fresh dairy products before placing your order.</p>
        </div>

        {cartItems.length > 0 && (
          <div className="cart-count">
            {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
          </div>
        )}
      </div>

      {/* ================= EMPTY CART VIEW ================= */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven&apos;t added any farm-fresh dairy products yet.</p>
          <Link href="/products" className="continue-shopping-btn">
            Explore Products →
          </Link>
        </div>
      ) : (
        /* ================= CART CONTENT ================= */
        <div className="cart-container">
          {/* LEFT: ITEMS LIST */}
          <div className="cart-items-section">
            <div className="cart-section-title">
              <h2>Your Items</h2>
              <span>
                {totalQuantity} {totalQuantity === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Render items dynamically from context */}
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}

            {/* Continue Shopping Action */}
            <Link href="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="cart-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <span>₹</span>
            </div>

            {/* Subtotal */}
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            {/* Delivery */}
            <div className="summary-row">
              <span>Delivery</span>
              <strong className={deliveryFee === 0 ? "free-delivery" : ""}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </strong>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span>Special Discount</span>
                <strong>-₹{discount}</strong>
              </div>
            )}

            {/* Free Delivery Banner */}
            <div className="free-delivery-message">
              {subtotal >= 500 ? (
                "✓ You qualify for free sunrise delivery"
              ) : (
                `Add ₹${500 - subtotal} more for free delivery`
              )}
            </div>

            <div className="summary-divider"></div>

            {/* Total */}
            <div className="summary-total">
              <span>Total</span>
              <strong>₹{totalAmount}</strong>
            </div>

            {/* Checkout Button */}
            <Link href="/payment" className="checkout-btn">
              Proceed to Checkout
              <span>→</span>
            </Link>

            <div className="secure-checkout">
              🔒 100% Safe & Encrypted Checkout
            </div>
          </aside>
        </div>
      )}

      {/* ================= TRUST BADGES ================= */}
      <div className="cart-trust">
        <div>
          <span>🥛</span>
          <div>
            <strong>Farm Fresh</strong>
            <p>Fresh daily dairy</p>
          </div>
        </div>

        <div>
          <span>🚚</span>
          <div>
            <strong>Fast Delivery</strong>
            <p>At your doorstep before 7 AM</p>
          </div>
        </div>

        <div>
          <span>🌿</span>
          <div>
            <strong>Quality Assured</strong>
            <p>Pure & organically tested</p>
          </div>
        </div>

        <div>
          <span>🔒</span>
          <div>
            <strong>Secure Payment</strong>
            <p>Safe & instant checkout</p>
          </div>
        </div>
      </div>
    </section>
  );
}