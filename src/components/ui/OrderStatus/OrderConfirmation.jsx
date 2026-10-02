"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { get } from "@/lib/api";

function formatCurrency(value) {
  const amount = Number(value || 0);

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDeliveryDate(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrderConfirmation({
  orderId,
}) {
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchOrder() {
      if (!orderId) {
        if (mounted) {
          setError("Order ID is missing.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await get(
          `/orders/${orderId}`
        );

        const fetchedOrder =
          response?.order ||
          response?.data?.order ||
          null;

        if (!fetchedOrder) {
          throw new Error(
            "Order details could not be found."
          );
        }

        if (mounted) {
          setOrder(fetchedOrder);
        }
      } catch (requestError) {
        console.error(
          "Fetch order confirmation error:",
          requestError
        );

        if (mounted) {
          setError(
            requestError?.message ||
              "Failed to load order details."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchOrder();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <main className="status-page">
        <div className="status-card confirmation-card">
          <div className="status-icon success">
            ✓
          </div>

          <h1>Loading Your Order...</h1>

          <p>
            Please wait while we load your order
            details.
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="status-page">
        <div className="status-card confirmation-card">
          <div className="status-icon">
            !
          </div>

          <h1>Order Details Unavailable</h1>

          <p>
            {error ||
              "We could not find this order."}
          </p>

          <div className="confirmation-actions">
            <button
              type="button"
              onClick={() => router.push("/orders")}
            >
              Go to My Orders
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                router.push("/products")
              }
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  const shippingAddress =
    order.shipping_address || {};

  const deliveryDate =
    shippingAddress.deliveryDate ||
    shippingAddress.delivery_date ||
    "";

  const deliverySlot =
    shippingAddress.deliveryTime ||
    shippingAddress.delivery_time ||
    "Not available";

  return (
    <main className="status-page">
      <div className="status-card confirmation-card">
        <div className="status-icon success">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for choosing Sai Satvik Dairy.
          Your fresh dairy products are on their way.
        </p>

        <div className="order-confirmation-details">
          <div>
            <span>Order ID</span>

            <strong>
              #{order.id}
            </strong>
          </div>

          <div>
            <span>Delivery Date</span>

            <strong>
              {formatDeliveryDate(
                deliveryDate
              )}
            </strong>
          </div>

          <div>
            <span>Delivery Slot</span>

            <strong>
              {deliverySlot}
            </strong>
          </div>

          <div>
            <span>Total Amount</span>

            <strong>
              {formatCurrency(
                order.total_amount
              )}
            </strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            onClick={() =>
              router.push(
                `/orders/${order.id}`
              )
            }
          >
            Track Order
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              router.push("/products")
            }
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}