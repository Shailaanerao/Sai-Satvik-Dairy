"use client";

import { useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import OrderSummary from "@/components/ui/OrderSummary/OrderSummary";
import { useCart } from "@/app/context/CartContext";

import "@/components/ui/OrderSummary/OrderSummary.css";

export default function OrderSummaryPage() {
  const router = useRouter();

  const {
    cartItems,
    subtotal,
    discount,
    deliveryFee,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="checkout-page">
          <h1>Order Summary</h1>

          <p>Your cart is empty.</p>

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
        <OrderSummary
          items={cartItems}
          subtotal={subtotal}
          discount={discount}
          delivery={deliveryFee}
        />

        <button
          type="button"
          className="save-address-btn"
          onClick={() => router.push("/payment")}
        >
          Continue to Payment
        </button>
      </main>
    </>
  );
}