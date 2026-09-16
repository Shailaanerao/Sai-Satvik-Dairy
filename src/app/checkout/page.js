"use client";

import { useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import CouponBox from "@/components/ui/Coupon/CouponBox";
import { useCart } from "@/app/context/CartContext";

import "@/components/ui/Coupon/coupon.css";
import "./checkout.css";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cartItems,
    subtotal,
    deliveryFee,
    discount,
    totalAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="checkout-page">
          <h1>Checkout</h1>

          <p>Your cart is empty. Add products before checking out.</p>

          <button
            type="button"
            className="save-address-btn"
            onClick={() => router.push("/products")}
          >
            Explore Products
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <h1>Checkout</h1>

        <CouponBox
          activeCoupon={couponCode}
          onApply={applyCoupon}
          onRemove={removeCoupon}
        />

        <div className="checkout-order-totals">
          <div>
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </strong>
          </div>

          {discount > 0 && (
            <div>
              <span>Discount</span>
              <strong>-₹{discount}</strong>
            </div>
          )}

          <div>
            <span>Total</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>

        <button
          type="button"
          className="save-address-btn"
          onClick={() => router.push("/address")}
        >
          Continue
        </button>
      </main>
    </>
  );
}