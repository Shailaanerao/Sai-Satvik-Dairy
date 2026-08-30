"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import CouponBox from "@/components/ui/Coupon/CouponBox";
import "@/components/ui/Coupon/coupon.css";
import "@/app/checkout/checkout.css";

export default function CheckoutPage() {
  const router = useRouter();
  const [discount, setDiscount] = useState(0);

  const subtotal = 780;

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <h1>Checkout</h1>

        <CouponBox
          subtotal={subtotal}
          onApply={(coupon) => {
            setDiscount(coupon.discount);
          }}
        />

        <button
          onClick={() => router.push("/address")}
        >
          Continue
        </button>
      </main>
    </>
  );
}