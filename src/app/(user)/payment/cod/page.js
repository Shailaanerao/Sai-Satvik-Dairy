"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";
import { createOrder } from "@/lib/createOrder";

export default function CODPage() {
  const router = useRouter();

  const {
    cartItems,
    totalAmount,
    appliedCoupon,
    clearCart,
  } = useCart();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const placeOrder = async () => {
    if (!cartItems.length) {
      router.push("/cart");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const savedAddress =
        sessionStorage.getItem(
          "checkoutAddress"
        );

      const savedSlot =
        sessionStorage.getItem(
          "checkoutDeliverySlot"
        );

      const address =
        savedAddress
          ? JSON.parse(savedAddress)
          : null;

      const deliverySlot =
        savedSlot
          ? JSON.parse(savedSlot)
          : null;

      if (!address?.id) {
        throw new Error(
          "Please select a delivery address."
        );
      }

      if (
        !deliverySlot?.date ||
        !deliverySlot?.time
      ) {
        throw new Error(
          "Please select a delivery slot."
        );
      }

      const order =
        await createOrder({
          cartItems,
          address,
          deliverySlot,
          paymentMethod: "cod",
          couponCode:
            appliedCoupon?.code ||
            null,
        });

      /*
       * Store only the returned server order.
       */

      sessionStorage.setItem(
        "checkoutOrder",
        JSON.stringify(order)
      );

      /*
       * Clear cart after successful order.
       */

      clearCart();

      /*
       * Clear temporary checkout data.
       */

      sessionStorage.removeItem(
        "checkoutAddress"
      );

      sessionStorage.removeItem(
        "checkoutAddressId"
      );

      sessionStorage.removeItem(
        "checkoutDeliverySlot"
      );

      /*
       * Open real order confirmation.
       */

      router.push(
        `/order-confirmation?id=${order.id}`
      );
    } catch (orderError) {
      console.error(
        "Place COD order error:",
        orderError
      );

      setError(
        orderError?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="payment-page">
      <div className="payment-form">
        <div className="payment-form-icon">
          💵
        </div>

        <h2>
          Cash on Delivery
        </h2>

        <p>
          Pay in cash when your
          Sai Satvik Dairy order
          arrives at your doorstep.
        </p>

        <div className="cod-info">
          <strong>
            Amount Payable
          </strong>

          <span>
            ₹{totalAmount}
          </span>
        </div>

        {appliedCoupon?.code && (
          <div className="cod-info">
            <strong>
              Coupon
            </strong>

            <span>
              {appliedCoupon.code}
            </span>
          </div>
        )}

        {error && (
          <p
            style={{
              marginTop: "12px",
              color: "#b00020",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </div>
    </main>
  );
}