"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AddressForm from "@/components/ui/Address/AddressForm";

import { post } from "@/lib/api";

import "@/components/ui/Address/address.css";

export default function AddAddressPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (address) => {
    try {
      setSaving(true);
      setError("");

      const payload = {
        type:
          address?.type?.toLowerCase() ||
          "home",
        name: address?.name || "",
        phone: address?.phone || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || "",
        isDefault: Boolean(
          address?.isDefault
        ),
      };

      await post("/addresses", payload);

      router.push("/address");
    } catch (requestError) {
      console.error(
        "Add address error:",
        requestError
      );

      setError(
        requestError?.message ||
          "Failed to save address."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="checkout-page">
      <h1>Add New Address</h1>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "14px 16px",
            borderRadius: "8px",
            background: "#fff4f4",
            color: "#a33",
          }}
        >
          {error}
        </div>
      )}

      {saving && (
        <div
          style={{
            marginBottom: "15px",
            color: "#666",
          }}
        >
          Saving address...
        </div>
      )}

      <AddressForm
        onSubmit={handleSubmit}
      />
    </main>
  );
}