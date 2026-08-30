"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const banks = [
  {
    value: "sbi",
    name: "State Bank of India",
  },
  {
    value: "hdfc",
    name: "HDFC Bank",
  },
  {
    value: "icici",
    name: "ICICI Bank",
  },
  {
    value: "axis",
    name: "Axis Bank",
  },
  {
    value: "kotak",
    name: "Kotak Mahindra Bank",
  },
];

export default function NetBankingForm() {
  const router = useRouter();

  const [bank, setBank] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bank) {
      return;
    }

    router.push("/payment/success");
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-form-icon">🏦</div>

        <h1>Net Banking</h1>

        <p className="payment-description">
          Select your bank to continue with your payment.
        </p>

        <div className="payment-field">
          <label htmlFor="bank">
            Select Bank
          </label>

          <select
            id="bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            required
          >
            <option value="">
              Select your bank
            </option>

            {banks.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="payment-button"
          disabled={!bank}
        >
          Continue to Bank
        </button>

        <div className="payment-security">
          🔒 Your payment information is secure
        </div>
      </form>
    </div>
  );
}