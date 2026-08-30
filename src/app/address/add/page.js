"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import AddressForm from "@/components/ui/Address/AddressForm";
import "@/components/ui/Address/address.css";

export default function AddAddressPage() {
  const router = useRouter();

  const handleSubmit = (address) => {
    console.log("New address:", address);
    router.push("/address");
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <AddressForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}