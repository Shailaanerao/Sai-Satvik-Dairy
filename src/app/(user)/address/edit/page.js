"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import AddressForm from "@/components/ui/Address/AddressForm";

import {
  get,
  put,
} from "@/lib/api";

import "@/components/ui/Address/address.css";

export default function EditAddressPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /*
   * =========================================
   * LOAD ADDRESS
   * =========================================
   */

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    const loadAddress = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await get(
          `/addresses/${id}`
        );

        const addressData =
          response?.address ||
          response?.data?.address ||
          response?.data ||
          null;

        if (!addressData) {
          throw new Error(
            "Address not found."
          );
        }

        if (cancelled) {
          return;
        }

        setAddress(addressData);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Load address error:",
          requestError
        );

        setError(
          requestError?.message ||
            "Failed to load address."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      loadAddress();
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [id]);

  /*
   * =========================================
   * HANDLE UPDATE
   * =========================================
   */

  const handleSubmit = async (
    updatedAddress
  ) => {
    try {
      setSaving(true);
      setError("");

      const payload = {
        type:
          updatedAddress?.type?.toLowerCase() ||
          "home",

        name:
          updatedAddress?.name || "",

        phone:
          updatedAddress?.phone || "",

        address:
          updatedAddress?.address || "",

        city:
          updatedAddress?.city || "",

        state:
          updatedAddress?.state || "",

        pincode:
          updatedAddress?.pincode || "",

        isDefault: Boolean(
          updatedAddress?.isDefault
        ),
      };

      await put(
        `/addresses/${id}`,
        payload
      );

      router.push("/address");
    } catch (requestError) {
      console.error(
        "Update address error:",
        requestError
      );

      setError(
        requestError?.message ||
          "Failed to update address."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================
   * MISSING ADDRESS ID
   * =========================================
   */

  if (!id) {
    return (
      <main className="checkout-page">
        <h1>Edit Address</h1>

        <div
          style={{
            padding: "14px 16px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#fff4f4",
            color: "#a33",
          }}
        >
          Address ID is missing.
        </div>

        <button
          type="button"
          className="save-address-btn"
          onClick={() =>
            router.push("/address")
          }
        >
          Back to Addresses
        </button>
      </main>
    );
  }

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (loading) {
    return (
      <main className="checkout-page">
        <h1>Edit Address</h1>

        <div
          style={{
            padding: "20px 0",
          }}
        >
          Loading address...
        </div>
      </main>
    );
  }

  /*
   * =========================================
   * ERROR
   * =========================================
   */

  if (error || !address) {
    return (
      <main className="checkout-page">
        <h1>Edit Address</h1>

        <div
          style={{
            padding: "14px 16px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#fff4f4",
            color: "#a33",
          }}
        >
          {error ||
            "Address could not be found."}
        </div>

        <button
          type="button"
          className="save-address-btn"
          onClick={() =>
            router.push("/address")
          }
        >
          Back to Addresses
        </button>
      </main>
    );
  }

  /*
   * =========================================
   * EDIT ADDRESS FORM
   * =========================================
   */

  return (
    <main className="checkout-page">
      <h1>Edit Address</h1>

      {saving && (
        <div
          style={{
            marginBottom: "15px",
            color: "#666",
          }}
        >
          Updating address...
        </div>
      )}

      <AddressForm
        initialData={{
          ...address,

          type:
            address.type
              ?.charAt(0)
              .toUpperCase() +
            address.type?.slice(1),

          isDefault: Boolean(
            address.is_default
          ),
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}