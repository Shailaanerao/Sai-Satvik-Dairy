"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";

export default function CODPage() {
  const router = useRouter();
  const { cartItems, totalAmount } = useCart();

  const placeOrder = () => {
    if (!cartItems.length) {
      router.push("/cart");
      return;
    }

    router.push("/order-confirmation");
  };

  return (
    <main className="payment-page">
      <div className="payment-form">
        <div className="payment-form-icon">💵</div>

        <h2>Cash on Delivery</h2>

        <p>
          Pay in cash when your Sai Satvik Dairy order arrives at your
          doorstep.
        </p>

        <div className="cod-info">
          <strong>Amount Payable</strong>
          <span>₹{totalAmount}</span>
        </div>

        <button type="button" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </main>
  );
}