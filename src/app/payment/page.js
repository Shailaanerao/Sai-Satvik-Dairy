"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import PaymentMethodCard from "@/components/ui/Payment/PaymentMethodCard";
import "@/components/ui/Payment/payment.css";

const methods = [
  {
    id: "upi",
    icon: "📱",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
  },
  {
    id: "card",
    icon: "💳",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard and RuPay",
  },
  {
    id: "netbanking",
    icon: "🏦",
    title: "Net Banking",
    description: "Pay securely through your bank",
  },
  {
    id: "cod",
    icon: "💵",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
];

export default function PaymentPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("upi");

  const continuePayment = () => {
    router.push(`/payment/${selected}`);
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <h1>Payment Methods</h1>

        {methods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            {...method}
            selected={selected === method.id}
            onClick={() => setSelected(method.id)}
          />
        ))}

        <button
          className="save-address-btn"
          onClick={continuePayment}
        >
          Continue
        </button>
      </main>
    </>
  );
}