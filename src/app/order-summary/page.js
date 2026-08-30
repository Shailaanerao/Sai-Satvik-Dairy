"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import OrderSummary from "@/components/ui/OrderSummary/OrderSummary";
import "@/components/ui/OrderSummary/OrderSummary.css";

const items = [
  {
    id: 1,
    name: "Fresh Farm Milk",
    price: 65,
    quantity: 2,
  },
  {
    id: 2,
    name: "Pure Desi Ghee",
    price: 650,
    quantity: 1,
  },
];

export default function OrderSummaryPage() {
  const router = useRouter();

  const subtotal = 780;

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          discount={0}
          delivery={0}
        />

        <button
          className="save-address-btn"
          onClick={() => router.push("/payment")}
        >
          Continue to Payment
        </button>
      </main>
    </>
  );
}