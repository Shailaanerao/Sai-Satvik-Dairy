"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import DeliverySlot from "@/components/ui/DeliverySlot/DeliverySlot";
import "@/components/ui/DeliverySlot/DeliverySlot.css";

const slots = [
  {
    id: 1,
    date: "Today",
    time: "7:00 AM - 10:00 AM",
  },
  {
    id: 2,
    date: "Today",
    time: "5:00 PM - 8:00 PM",
  },
  {
    id: 3,
    date: "Tomorrow",
    time: "7:00 AM - 10:00 AM",
  },
  {
    id: 4,
    date: "Tomorrow",
    time: "5:00 PM - 8:00 PM",
  },
];

export default function DeliverySlotPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <DeliverySlot
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />

        <button
          className="save-address-btn"
          disabled={!selectedSlot}
          onClick={() => router.push("/order-summary")}
        >
          Continue
        </button>
      </main>
    </>
  );
}