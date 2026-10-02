"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import CouponBox from "@/components/ui/Coupon/CouponBox";
import { useCart } from "@/app/context/CartContext";
import useAuth from "@/hooks/useAuth";

import "@/components/ui/Coupon/coupon.css";
import "./checkout.css";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cartItems,
    subtotal,
    deliveryCharge,
    discount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace("/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <>

        <main className="checkout-page">
          <h1>Checkout</h1>
          <p>Checking your account...</p>
        </main>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>

        <main className="checkout-page">
          <h1>Checkout</h1>

          <p>
            Your cart is empty. Add products before checking out.
          </p>

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

      <main className="checkout-page">
        <h1>Checkout</h1>

        <CouponBox
          activeCoupon={appliedCoupon}
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
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
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