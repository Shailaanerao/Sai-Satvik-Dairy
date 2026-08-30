"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import AddressCard from "@/components/ui/Address/AddressCard";
import "@/components/ui/Address/address.css";

const addresses = [
  {
    id: 1,
    type: "Home",
    name: "Shaila Anerao",
    phone: "9876543210",
    address: "Kalewadi, Pimpri",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411017",
  },
  {
    id: 2,
    type: "Work",
    name: "Shaila Anerao",
    phone: "9876543210",
    address: "Pimpri",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411018",
  },
];

export default function AddressPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(1);

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <h1>Delivery Address</h1>

        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selected === address.id}
            onSelect={() => setSelected(address.id)}
            onEdit={() =>
              router.push(`/address/edit?id=${address.id}`)
            }
          />
        ))}

        <button
          className="save-address-btn"
          onClick={() => router.push("/address/add")}
        >
          + Add New Address
        </button>

        <button
          className="save-address-btn"
          onClick={() => router.push("/delivery-slot")}
        >
          Continue
        </button>
      </main>
    </>
  );
}