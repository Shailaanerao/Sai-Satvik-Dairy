"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import AddressCard from "@/components/ui/Address/AddressCard";

import { get } from "@/lib/api";

import "@/components/ui/Address/address.css";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await get("/addresses");

      const addressList =
        response?.addresses ||
        response?.data?.addresses ||
        response?.data ||
        [];

      const safeAddresses = Array.isArray(addressList)
        ? addressList
        : [];

      setAddresses(safeAddresses);

      if (!safeAddresses.length) {
        setSelected(null);
        return;
      }

      const savedAddressId =
        sessionStorage.getItem(
          "checkoutAddressId"
        );

      const savedAddress = savedAddressId
        ? safeAddresses.find(
            (address) =>
              Number(address.id) ===
              Number(savedAddressId)
          )
        : null;

      if (savedAddress) {
        setSelected(Number(savedAddress.id));
        return;
      }

      const defaultAddress =
        safeAddresses.find(
          (address) => address.is_default
        );

      if (defaultAddress) {
        setSelected(Number(defaultAddress.id));
      } else {
        setSelected(Number(safeAddresses[0].id));
      }
    } catch (requestError) {
      console.error(
        "Load checkout addresses error:",
        requestError
      );

      setAddresses([]);
      setSelected(null);

      setError(
        requestError?.message ||
          "Failed to load your saved addresses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadAddresses();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadAddresses]);

  const handleContinue = () => {
    const selectedAddress =
      addresses.find(
        (address) =>
          Number(address.id) === Number(selected)
      );

    if (!selectedAddress) {
      return;
    }

    const checkoutAddress = {
      id: selectedAddress.id,
      type: selectedAddress.type,
      name: selectedAddress.name,
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    };

    sessionStorage.setItem(
      "checkoutAddress",
      JSON.stringify(checkoutAddress)
    );

    sessionStorage.setItem(
      "checkoutAddressId",
      String(selectedAddress.id)
    );

    router.push("/delivery-slot");
  };

  return (
    <main className="checkout-page">
      <h1>Delivery Address</h1>

      {loading && (
        <div style={{ padding: "20px 0" }}>
          Loading your saved addresses...
        </div>
      )}

      {!loading && error && (
        <div
          style={{
            padding: "14px 16px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#fff4f4",
            color: "#a33",
          }}
        >
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        addresses.length === 0 && (
          <div
            style={{
              padding: "20px 0",
              color: "#666",
            }}
          >
            No saved addresses found.
          </div>
        )}

      {!loading &&
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={
              Number(selected) ===
              Number(address.id)
            }
            onSelect={() =>
              setSelected(Number(address.id))
            }
            onEdit={() =>
              router.push(
                `/address/edit?id=${address.id}`
              )
            }
          />
        ))}

      <button
        type="button"
        className="save-address-btn"
        onClick={() =>
          router.push("/address/add")
        }
      >
        + Add New Address
      </button>

      <button
        type="button"
        className="save-address-btn"
        onClick={handleContinue}
        disabled={
          loading ||
          !selected ||
          addresses.length === 0
        }
      >
        Continue
      </button>
    </main>
  );
}