"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NetBankingForm() {
  const [bank, setBank] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push("/payment/success");
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="payment-form-icon">🏦</div>

      <h2>Net Banking</h2>

      <p>Select your bank to continue.</p>

      <select
        value={bank}
        onChange={(e) => setBank(e.target.value)}
        required
      >
        <option value="">Select your bank</option>
        <option value="sbi">State Bank of India</option>
        <option value="hdfc">HDFC Bank</option>
        <option value="icici">ICICI Bank</option>
        <option value="axis">Axis Bank</option>
        <option value="kotak">Kotak Mahindra Bank</option>
      </select>

      <button type="submit">
        Continue to Bank
      </button>
    </form>
  );
}