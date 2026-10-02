"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import OrderSummary from "@/components/ui/OrderSummary/OrderSummary";
import { useCart } from "@/app/context/CartContext";

import "@/components/ui/OrderSummary/OrderSummary.css";

function getSavedAddress() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedAddress =
    sessionStorage.getItem(
      "checkoutAddress"
    );

  if (!savedAddress) {
    return null;
  }

  try {
    return JSON.parse(savedAddress);
  } catch {
    return null;
  }
}

function getSavedDeliverySlot() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedSlot =
    sessionStorage.getItem(
      "checkoutDeliverySlot"
    );

  if (!savedSlot) {
    return null;
  }

  try {
    return JSON.parse(savedSlot);
  } catch {
    return null;
  }
}

export default function OrderSummaryPage() {
  const router = useRouter();

  const {
    cartItems,
    subtotal,
    discount,
    deliveryCharge,
  } = useCart();

  const [address] =
    useState(getSavedAddress);

  const [deliverySlot] =
    useState(getSavedDeliverySlot);

  if (cartItems.length === 0) {
    return (
      <>

        <main className="checkout-page">
          <h1>Order Summary</h1>

          <p>Your cart is empty.</p>

          <button
            type="button"
            className="save-address-btn"
            onClick={() =>
              router.push("/products")
            }
          >
            Explore Products
          </button>
        </main>
      </>
    );
  }

  if (!address || !deliverySlot) {
    return (
      <>

        <main className="checkout-page">
          <h1>Order Summary</h1>

          <p>
            Please select your delivery
            address and delivery slot.
          </p>

          <button
            type="button"
            className="save-address-btn"
            onClick={() =>
              router.push("/address")
            }
          >
            Select Address
          </button>
        </main>
      </>
    );
  }

  return (
    <>

      <main className="checkout-page">
        <h1>Order Summary</h1>

        <section>
          <h2>Delivery Address</h2>

          <p>
            <strong>
              {address.name}
            </strong>
          </p>

          <p>{address.phone}</p>

          <p>
            {address.address},{" "}
            {address.city},{" "}
            {address.state} -{" "}
            {address.pincode}
          </p>
        </section>

        <section>
          <h2>Delivery Slot</h2>

          <p>
            <strong>
              {deliverySlot.date}
            </strong>
          </p>

          <p>
            {deliverySlot.time}
          </p>
        </section>

        <OrderSummary
          items={cartItems}
          subtotal={subtotal}
          discount={discount}
          delivery={deliveryCharge}
        />

        <button
          type="button"
          className="save-address-btn"
          onClick={() =>
            router.push("/payment")
          }
        >
          Continue to Payment
        </button>
      </main>
    </>
  );
}