"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UPIForm() {
  const [upi, setUpi] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push("/payment/success");
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="payment-form-icon">📱</div>

      <h2>Pay with UPI</h2>

      <p>Enter your UPI ID to complete your payment.</p>

      <input
        type="text"
        placeholder="example@upi"
        value={upi}
        onChange={(e) => setUpi(e.target.value)}
        required
      />

      <button type="submit">
        Pay Now
      </button>
    </form>
  );
}