"use client";

import { useState } from "react";

const availableCoupons = ["SAI10", "FRESH20", "DAIRY100"];

export default function CouponBox({
  onApply,
  onRemove,
  activeCoupon = null,
}) {
  const [coupon, setCoupon] = useState(activeCoupon || "");
  const [message, setMessage] = useState("");

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setMessage("Please enter a coupon code.");
      return;
    }

    const result = onApply?.(code);

    if (!result?.success) {
      setMessage(result?.message || "Invalid coupon code.");
      return;
    }

    setCoupon(code);
    setMessage(result.message);
  };

  const removeCoupon = () => {
    onRemove?.();
    setCoupon("");
    setMessage("Coupon removed.");
  };

  return (
    <div className="coupon-box">
      <div className="coupon-title">
        <span>🏷️</span>

        <div>
          <h3>Apply Coupon</h3>
          <p>Save more on your dairy order</p>
        </div>
      </div>

      <div className="coupon-input-wrapper">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
        />

        <button type="button" onClick={applyCoupon}>
          Apply
        </button>
      </div>

      {activeCoupon && (
        <button
          type="button"
          className="coupon-remove-btn"
          onClick={removeCoupon}
        >
          Remove {activeCoupon}
        </button>
      )}

      {message && <p className="coupon-message">{message}</p>}

      <div className="available-coupons">
        <span>Available:</span>

        {availableCoupons.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setCoupon(code)}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}