"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { get } from "@/lib/api";

import "./orders.css";

const ORDER_STATUSES = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const PAYMENT_STATUSES = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
};

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getOrderStatusLabel(status) {
  return ORDER_STATUSES[status] || status || "Unknown";
}

function getPaymentStatusLabel(status) {
  return (
    PAYMENT_STATUSES[status] ||
    status ||
    "Unknown"
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await get("/orders");

      const orderList =
        response?.orders ||
        response?.data?.orders ||
        response?.data ||
        [];

      setOrders(
        Array.isArray(orderList)
          ? orderList
          : []
      );
    } catch (requestError) {
      console.error(
        "Fetch customer orders error:",
        requestError
      );

      setOrders([]);

      setError(
        requestError?.message ||
          "Failed to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-loading">
            <div className="orders-spinner" />
            <h2>Loading your orders...</h2>
            <p>Please wait while we fetch your orders.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        <header className="orders-header">
          <div className="orders-title-section">
            <span className="orders-eyebrow">
              Sai Satvik Dairy
            </span>

            <h1>My Orders</h1>

            <p>
              View your orders, payment status,
              and delivery information.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="orders-refresh-btn"
          >
            <span className="refresh-icon">↻</span>
            Refresh
          </button>
        </header>

        {error && (
          <div className="orders-error">
            <div className="orders-error-icon">
              !
            </div>

            <div>
              <strong>
                Unable to load orders
              </strong>

              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={fetchOrders}
            >
              Try Again
            </button>
          </div>
        )}

        {!error && orders.length === 0 && (
          <section className="orders-empty">
            <div className="orders-empty-icon">
              🛒
            </div>

            <h2>No orders yet</h2>

            <p>
              You haven&apos;t placed any orders
              yet. Start shopping to see your
              orders here.
            </p>

            <Link
              href="/products"
              className="orders-shop-btn"
            >
              Browse Products
            </Link>
          </section>
        )}

        {orders.length > 0 && (
          <>
            <div className="orders-summary-bar">
              <span>
                <strong>{orders.length}</strong>{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </span>

              <span>
                Your recent orders
              </span>
            </div>

            <div className="orders-list">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="order-card"
                >
                  <div className="order-card-top">
                    <div className="order-id-section">
                      <span className="order-label">
                        Order ID
                      </span>

                      <h2>
                        #{order.id}
                      </h2>

                      <p>
                        {formatDate(
                          order.created_at
                        )}
                      </p>
                    </div>

                    <div className="order-status-section">
                      <span
                        className={`order-status order-status-${order.status}`}
                      >
                        <span className="status-dot" />
                        {getOrderStatusLabel(
                          order.status
                        )}
                      </span>

                      <span
                        className={`payment-status payment-status-${order.payment_status}`}
                      >
                        Payment:{" "}
                        {getPaymentStatusLabel(
                          order.payment_status
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="order-divider" />

                  <div className="order-items">
                    <div className="order-items-header">
                      <span>Items</span>
                      <span>Amount</span>
                    </div>

                    {order.order_items?.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="order-item"
                        >
                          <div className="order-item-info">
                            <div className="order-item-icon">
                              🥛
                            </div>

                            <div>
                              <strong>
                                {item.product_name}
                              </strong>

                              <span>
                                Qty:{" "}
                                {item.quantity}
                              </span>
                            </div>
                          </div>

                          <span className="order-item-price">
                            ₹
                            {Number(
                              item.total_price || 0
                            ).toFixed(2)}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="order-divider" />

                  <div className="order-card-bottom">
                    <div className="order-total">
                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.total_amount || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="view-order-btn"
                    >
                      View Order
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}