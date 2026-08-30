"use client";

import { useState } from "react";

const coupons = {
  SAI10: 10,
  FRESH20: 20,
  DAIRY100: 100,
};

export default function CouponBox({ subtotal, onApply }) {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setMessage("Please enter a coupon code.");
      return;
    }

    if (!coupons[code]) {
      setMessage("Invalid coupon code.");
      return;
    }

    let discount;

    if (code === "DAIRY100") {
      discount = Math.min(100, subtotal);
    } else {
      discount = Math.round((subtotal * coupons[code]) / 100);
    }

    onApply({
      code,
      discount,
    });

    setMessage(`Coupon ${code} applied successfully!`);
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
          onChange={(e) => setCoupon(e.target.value)}
        />

        <button onClick={applyCoupon}>Apply</button>
      </div>

      {message && <p className="coupon-message">{message}</p>}

      <div className="available-coupons">
        <span>Available:</span>
        <button onClick={() => setCoupon("SAI10")}>SAI10</button>
        <button onClick={() => setCoupon("FRESH20")}>FRESH20</button>
        <button onClick={() => setCoupon("DAIRY100")}>DAIRY100</button>
      </div>
    </div>
  );
}