"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import AddressForm from "@/components/ui/Address/AddressForm";
import "@/components/ui/Address/address.css";

const address = {
  id: 1,
  type: "Home",
  name: "Shaila Anerao",
  phone: "9876543210",
  address: "Kalewadi, Pimpri",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411017",
};

export default function EditAddressPage() {
  const router = useRouter();

  const handleSubmit = (updatedAddress) => {
    console.log("Updated:", updatedAddress);
    router.push("/address");
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <AddressForm
          initialData={address}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}