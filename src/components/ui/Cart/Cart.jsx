"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Cart.css";

const initialCartItems = [
  {
    id: 1,
    name: "A2 Desi Cow Milk",
    category: "Fresh Dairy",
    size: "1 L",
    price: 65,
    quantity: 2,
    image: "/milk.jpg",
  },
  {
    id: 2,
    name: "Pure Gir Cow Ghee",
    category: "Traditional Dairy",
    size: "500 g",
    price: 650,
    quantity: 1,
    image: "/ghee.jpg",
  },
  {
    id: 3,
    name: "Fresh Paneer",
    category: "Fresh Dairy",
    size: "250 g",
    price: 120,
    quantity: 1,
    image: "/paneer.jpg",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Free delivery above ₹500
  const deliveryFee =
    subtotal === 0 || subtotal >= 500 ? 0 : 40;

  // ₹100 discount above ₹1000
  const discount = subtotal >= 1000 ? 100 : 0;

  const total = subtotal + deliveryFee - discount;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className="cart-page">

      {/* ================= HEADER ================= */}

      <div className="cart-header">

        <div>
          <span className="cart-eyebrow">
            YOUR SHOPPING CART
          </span>

          <h1>
            Freshness in Your <span>Basket</span>
          </h1>

          <p>
            Review your farm-fresh dairy products
            before placing your order.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="cart-count">
            {totalQuantity} Items
          </div>
        )}

      </div>


      {/* ================= EMPTY CART ================= */}

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added any
            dairy products yet.
          </p>

          <Link
            href="/products"
            className="continue-shopping-btn"
          >
            Explore Products →
          </Link>

        </div>

      ) : (

        /* ================= CART CONTENT ================= */

        <div className="cart-container">

          {/* LEFT SIDE */}

          <div className="cart-items-section">

            <div className="cart-section-title">

              <h2>Your Items</h2>

              <span>
                {totalQuantity} products
              </span>

            </div>


            {/* CART ITEMS */}

            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Product Image */}

                <div className="cart-product-image">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="110px"
                  />

                </div>


                {/* Product Details */}

                <div className="cart-product-details">

                  <span className="cart-product-category">
                    {item.category}
                  </span>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Pack Size: {item.size}
                  </p>

                  <strong>
                    ₹{item.price}
                  </strong>

                </div>


                {/* Quantity */}

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                {/* Item Total */}

                <div className="item-total">

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}


            {/* Continue Shopping */}

            <Link
              href="/products"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <aside className="cart-summary">

            <div className="summary-header">

              <h2>
                Order Summary
              </h2>

              <span>₹</span>

            </div>


            {/* Subtotal */}

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>


            {/* Delivery */}

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong
                className={
                  deliveryFee === 0
                    ? "free-delivery"
                    : ""
                }
              >
                {deliveryFee === 0
                  ? "FREE"
                  : `₹${deliveryFee}`}
              </strong>

            </div>


            {/* Discount */}

            {discount > 0 && (

              <div className="summary-row discount-row">

                <span>
                  Discount
                </span>

                <strong>
                  -₹{discount}
                </strong>

              </div>

            )}


            {/* Free Delivery Message */}

            <div className="free-delivery-message">

              {subtotal >= 500 ? (
                "✓ You qualify for free delivery"
              ) : (
                `Add ₹${500 - subtotal} more for free delivery`
              )}

            </div>


            <div className="summary-divider"></div>


            {/* Total */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            {/* Checkout Button */}

            <Link
              href="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
              <span>→</span>
            </Link>


            <div className="secure-checkout">
              🔒 Secure & Safe Checkout
            </div>

          </aside>

        </div>

      )}


      {/* ================= TRUST SECTION ================= */}

      <div className="cart-trust">

        <div>
          <span>🥛</span>

          <div>
            <strong>Farm Fresh</strong>
            <p>Fresh dairy products</p>
          </div>
        </div>

        <div>
          <span>🚚</span>

          <div>
            <strong>Fast Delivery</strong>
            <p>Freshness at your door</p>
          </div>
        </div>

        <div>
          <span>🌿</span>

          <div>
            <strong>Quality Assured</strong>
            <p>Pure & carefully tested</p>
          </div>
        </div>

        <div>
          <span>🔒</span>

          <div>
            <strong>Secure Payment</strong>
            <p>Safe & secure checkout</p>
          </div>
        </div>

      </div>

    </section>
  );
}