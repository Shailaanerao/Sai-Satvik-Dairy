"use client";

import { useRouter } from "next/navigation";

export default function PaymentStatus({
  success = true,
}) {
  const router = useRouter();

  return (
    <main className="status-page">
      <div className="status-card">
        <div
          className={`status-icon ${
            success ? "success" : "failed"
          }`}
        >
          {success ? "✓" : "✕"}
        </div>

        <h1>
          {success
            ? "Payment Successful!"
            : "Payment Failed"}
        </h1>

        <p>
          {success
            ? "Your payment has been received successfully."
            : "We couldn't process your payment. Please try again."}
        </p>

        {success ? (
          <>
            <div className="status-details">
              <div>
                <span>Order ID</span>
                <strong>#SS202600145</strong>
              </div>

              <div>
                <span>Amount Paid</span>
                <strong>₹780</strong>
              </div>
            </div>

            <button
              onClick={() =>
                router.push("/order-confirmation")
              }
            >
              View Order
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/payment")}
          >
            Try Again
          </button>
        )}
      </div>
    </main>
  );
}