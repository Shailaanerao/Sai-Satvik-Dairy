"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

function getInitialSlot() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedSlot =
    sessionStorage.getItem(
      "checkoutDeliverySlot"
    );

  return savedSlot
    ? Number(
        JSON.parse(savedSlot).id
      )
    : null;
}

export default function DeliverySlotPage() {
  const router = useRouter();

  const [selectedSlot, setSelectedSlot] =
    useState(getInitialSlot);

  const handleContinue = () => {
    const selectedSlotData =
      slots.find(
        (slot) =>
          slot.id === selectedSlot
      );

    if (!selectedSlotData) {
      return;
    }

    sessionStorage.setItem(
      "checkoutDeliverySlot",
      JSON.stringify(
        selectedSlotData
      )
    );

    router.push("/order-summary");
  };

  return (
    <>

      <main className="checkout-page">
        <DeliverySlot
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />

        <button
          type="button"
          className="save-address-btn"
          disabled={!selectedSlot}
          onClick={handleContinue}
        >
          Continue
        </button>
      </main>
    </>
  );
}