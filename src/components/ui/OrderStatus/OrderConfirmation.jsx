"use client";

import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const router = useRouter();

  return (
    <main className="status-page">
      <div className="status-card confirmation-card">
        <div className="status-icon success">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for choosing Sai Satvik Dairy.
          Your fresh dairy products are on their way.
        </p>

        <div className="order-confirmation-details">
          <div>
            <span>Order ID</span>
            <strong>#SS202600145</strong>
          </div>

          <div>
            <span>Delivery Date</span>
            <strong>Tomorrow</strong>
          </div>

          <div>
            <span>Delivery Slot</span>
            <strong>7:00 AM - 10:00 AM</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>₹780</strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            onClick={() => router.push("/orders")}
          >
            Track Order
          </button>

          <button
            className="secondary-btn"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}