"use client";

import { useRouter } from "next/navigation";

export default function CODPage() {
  const router = useRouter();

  const placeOrder = () => {
    router.push("/order-confirmation");
  };

  return (
    <main className="payment-page">
      <div className="payment-form">
        <div className="payment-form-icon">💵</div>

        <h2>Cash on Delivery</h2>

        <p>
          Pay in cash when your Sai Satvik Dairy order
          arrives at your doorstep.
        </p>

        <div className="cod-info">
          <strong>Amount Payable</strong>
          <span>₹780</span>
        </div>

        <button onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </main>
  );
}