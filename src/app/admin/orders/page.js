"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import { supabase } from "@/lib/supabase";

import "./orders.css";

const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded",
];

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  out_for_delivery: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function formatStatus(status) {
  return STATUS_LABELS[status] || "-";
}

function formatPaymentStatus(status) {
  if (!status) {
    return "-";
  }

  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function getCustomerName(customer) {
  const name = [
    customer?.firstName,
    customer?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return name || "Customer";
}

function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "status-pending";

    case "confirmed":
      return "status-confirmed";

    case "processing":
      return "status-processing";

    case "out_for_delivery":
      return "status-shipped";

    case "delivered":
      return "status-delivered";

    case "cancelled":
      return "status-cancelled";

    default:
      return "status-pending";
  }
}

function getNextAction(status) {
  switch (status) {
    case "pending":
      return {
        status: "confirmed",
        label: "Confirm Order",
      };

    case "confirmed":
      return {
        status: "out_for_delivery",
        label: "Mark Shipped",
      };

    case "processing":
      return {
        status: "out_for_delivery",
        label: "Mark Shipped",
      };

    case "out_for_delivery":
      return {
        status: "delivered",
        label: "Mark Delivered",
      };

    default:
      return null;
  }
}

function isFinalStatus(status) {
  return (
    status === "delivered" ||
    status === "cancelled"
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [paymentFilter, setPaymentFilter] =
    useState("all");

  const fetchOrders = useCallback(
    async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken =
        session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Authentication required."
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to fetch orders."
        );
      }

      const orderList =
        Array.isArray(result?.orders)
          ? result.orders
          : [];

      setOrders(orderList);

      return orderList;
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    const initialLoadTimer = setTimeout(
      async () => {
        try {
          setLoading(true);
          setError("");

          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session?.access_token) {
            throw new Error(
              "Authentication required."
            );
          }

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
              cache: "no-store",
            }
          );

          const result =
            await response.json();

          if (!response.ok) {
            throw new Error(
              result?.message ||
                "Failed to fetch orders."
            );
          }

          if (cancelled) {
            return;
          }

          const orderList =
            Array.isArray(
              result?.orders
            )
              ? result.orders
              : [];

          setOrders(orderList);
        } catch (loadError) {
          if (cancelled) {
            return;
          }

          console.error(
            "Failed to fetch admin orders:",
            loadError
          );

          setError(
            loadError?.message ||
              "Failed to load orders."
          );
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      },
      0
    );

    return () => {
      cancelled = true;
      clearTimeout(initialLoadTimer);
    };
  }, []);

  const updateOrderStatus = async (
    orderId,
    nextStatus
  ) => {
    setError("");
    setSuccess("");

    try {
      setUpdatingId(orderId);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken =
        session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Authentication required."
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update order status."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: nextStatus,
              }
            : order
        )
      );

      setSuccess(
        `Order #${orderId} is now ${formatStatus(
          nextStatus
        )}.`
      );
    } catch (updateError) {
      console.error(
        "Update order status error:",
        updateError
      );

      setError(
        updateError?.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusAdvance = async (
    order
  ) => {
    const nextAction = getNextAction(
      order.status
    );

    if (!nextAction) {
      return;
    }

    await updateOrderStatus(
      order.id,
      nextAction.status
    );
  };

  const handleCancelOrder = async (
    order
  ) => {
    const confirmed =
      window.confirm(
        `Cancel order #${order.id}?`
      );

    if (!confirmed) {
      return;
    }

    await updateOrderStatus(
      order.id,
      "cancelled"
    );
  };

  const updatePaymentStatus = async (
    orderId,
    paymentStatus
  ) => {
    setError("");
    setSuccess("");

    try {
      setUpdatingId(orderId);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken =
        session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Authentication required."
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/payment-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            paymentStatus,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update payment status."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                payment_status:
                  paymentStatus,
              }
            : order
        )
      );

      setSuccess(
        `Payment status for order #${orderId} is now ${formatPaymentStatus(
          paymentStatus
        )}.`
      );
    } catch (updateError) {
      console.error(
        "Update payment status error:",
        updateError
      );

      setError(
        updateError?.message ||
          "Failed to update payment status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesStatus =
          statusFilter === "all" ||
          order.status === statusFilter;

        const matchesPayment =
          paymentFilter === "all" ||
          order.payment_status ===
            paymentFilter;

        return (
          matchesStatus &&
          matchesPayment
        );
      }),
    [
      orders,
      statusFilter,
      paymentFilter,
    ]
  );

  const statistics = useMemo(() => {
    const pending = orders.filter(
      (order) =>
        order.status === "pending"
    ).length;

    const confirmed = orders.filter(
      (order) =>
        order.status === "confirmed"
    ).length;

    const shipped = orders.filter(
      (order) =>
        order.status ===
        "out_for_delivery"
    ).length;

    const delivered = orders.filter(
      (order) =>
        order.status === "delivered"
    ).length;

    const cancelled = orders.filter(
      (order) =>
        order.status === "cancelled"
    ).length;

    return {
      pending,
      confirmed,
      shipped,
      delivered,
      cancelled,
    };
  }, [orders]);

  const handleRefresh = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await fetchOrders();

      setSuccess(
        "Orders refreshed successfully."
      );
    } catch (refreshError) {
      console.error(
        "Refresh orders error:",
        refreshError
      );

      setError(
        refreshError?.message ||
          "Failed to refresh orders."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-orders-page">
      <AdminPageHeader
        title="Orders"
        description="Manage customer orders with a simple one-click delivery workflow."
        action={
          <button
            type="button"
            className="orders-refresh-button"
            onClick={handleRefresh}
            disabled={loading}
          >
            ↻{" "}
            {loading
              ? "Loading..."
              : "Refresh"}
          </button>
        }
      />

      {error && (
        <div className="orders-alert orders-alert-error">
          <strong>Error</strong>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="orders-alert orders-alert-success">
          <strong>Updated</strong>
          <span>{success}</span>
        </div>
      )}

      <div className="orders-summary-grid">
        <button
          type="button"
          className={
            statusFilter === "pending"
              ? "orders-summary-card active"
              : "orders-summary-card"
          }
          onClick={() =>
            setStatusFilter(
              statusFilter === "pending"
                ? "all"
                : "pending"
            )
          }
        >
          <span className="summary-number">
            {statistics.pending}
          </span>

          <span className="summary-label">
            Pending
          </span>
        </button>

        <button
          type="button"
          className={
            statusFilter === "confirmed"
              ? "orders-summary-card active"
              : "orders-summary-card"
          }
          onClick={() =>
            setStatusFilter(
              statusFilter === "confirmed"
                ? "all"
                : "confirmed"
            )
          }
        >
          <span className="summary-number">
            {statistics.confirmed}
          </span>

          <span className="summary-label">
            Confirmed
          </span>
        </button>

        <button
          type="button"
          className={
            statusFilter ===
            "out_for_delivery"
              ? "orders-summary-card active"
              : "orders-summary-card"
          }
          onClick={() =>
            setStatusFilter(
              statusFilter ===
                "out_for_delivery"
                ? "all"
                : "out_for_delivery"
            )
          }
        >
          <span className="summary-number">
            {statistics.shipped}
          </span>

          <span className="summary-label">
            Shipped
          </span>
        </button>

        <button
          type="button"
          className={
            statusFilter === "delivered"
              ? "orders-summary-card active"
              : "orders-summary-card"
          }
          onClick={() =>
            setStatusFilter(
              statusFilter === "delivered"
                ? "all"
                : "delivered"
            )
          }
        >
          <span className="summary-number">
            {statistics.delivered}
          </span>

          <span className="summary-label">
            Delivered
          </span>
        </button>

        <button
          type="button"
          className={
            statusFilter === "cancelled"
              ? "orders-summary-card cancelled-summary active"
              : "orders-summary-card cancelled-summary"
          }
          onClick={() =>
            setStatusFilter(
              statusFilter === "cancelled"
                ? "all"
                : "cancelled"
            )
          }
        >
          <span className="summary-number">
            {statistics.cancelled}
          </span>

          <span className="summary-label">
            Cancelled
          </span>
        </button>
      </div>

      <div className="orders-filter-bar">
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          aria-label="Filter orders by status"
        >
          <option value="all">
            All Order Statuses
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="processing">
            Processing
          </option>

          <option value="out_for_delivery">
            Shipped
          </option>

          <option value="delivered">
            Delivered
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

        <select
          value={paymentFilter}
          onChange={(event) =>
            setPaymentFilter(
              event.target.value
            )
          }
          aria-label="Filter orders by payment status"
        >
          <option value="all">
            All Payment Statuses
          </option>

          {PAYMENT_STATUSES.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {formatPaymentStatus(
                  status
                )}
              </option>
            )
          )}
        </select>

        <span className="orders-filter-count">
          Showing{" "}
          <strong>
            {filteredOrders.length}
          </strong>{" "}
          of{" "}
          <strong>{orders.length}</strong>{" "}
          orders
        </span>
      </div>

      <div className="orders-table-card">
        <div className="orders-table-header">
          <div>
            <span className="orders-kicker">
              SAI SATVIK DAIRY
            </span>

            <h2>
              Customer Orders
            </h2>

            <p>
              Move each order through delivery
              with one click.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="orders-empty-state">
            <div className="orders-spinner" />

            <p>
              Loading orders...
            </p>
          </div>
        ) : filteredOrders.length ===
          0 ? (
          <div className="orders-empty-state">
            <div className="orders-empty-icon">
              ✓
            </div>

            <strong>
              No orders found
            </strong>

            <p>
              There are no orders matching
              the selected filters.
            </p>
          </div>
        ) : (
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>
                    Order
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Items
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Order Status
                  </th>

                  <th>
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map(
                  (order) => {
                    const nextAction =
                      getNextAction(
                        order.status
                      );

                    const updating =
                      updatingId ===
                      order.id;

                    return (
                      <tr
                        key={order.id}
                      >
                        <td>
                          <div className="order-id-cell">
                            <strong>
                              #{order.id}
                            </strong>

                            <span>
                              {order.payment_method
                                ? formatPaymentStatus(
                                    order.payment_method
                                  )
                                : "Payment"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="customer-cell">
                            <div className="customer-avatar">
                              {getCustomerName(
                                order.customer
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {getCustomerName(
                                  order.customer
                                )}
                              </strong>

                              {order.customer
                                ?.mobile && (
                                <span>
                                  {
                                    order
                                      .customer
                                      .mobile
                                  }
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="order-items-cell">
                            {Array.isArray(
                              order.order_items
                            ) &&
                            order.order_items
                              .length > 0 ? (
                              <>
                                {order.order_items
                                  .slice(0, 2)
                                  .map(
                                    (item) => (
                                      <span
                                        key={
                                          item.id
                                        }
                                        className="order-item-preview"
                                        title={`${item.product_name} × ${item.quantity}`}
                                      >
                                        {
                                          item.product_name
                                        }{" "}
                                        ×{" "}
                                        {
                                          item.quantity
                                        }
                                      </span>
                                    )
                                  )}

                                {order
                                  .order_items
                                  .length >
                                  2 && (
                                  <span
                                    className="order-items-more"
                                    title={order.order_items
                                      .slice(
                                        2
                                      )
                                      .map(
                                        (
                                          item
                                        ) =>
                                          `${item.product_name} × ${item.quantity}`
                                      )
                                      .join(
                                        ", "
                                      )}
                                  >
                                    +
                                    {order
                                      .order_items
                                      .length -
                                      2}{" "}
                                    more
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="order-items-empty">
                                No items
                              </span>
                            )}
                          </div>
                        </td>

                        <td>
                          <strong className="order-amount">
                            {formatCurrency(
                              order.total_amount
                            )}
                          </strong>
                        </td>

                        <td>
                          <div className="payment-cell">
                            <span className="payment-method">
                              {formatPaymentStatus(
                                order.payment_method
                              )}
                            </span>

                            <select
                              value={
                                order.payment_status ||
                                "pending"
                              }
                              disabled={
                                updating
                              }
                              onChange={(
                                event
                              ) =>
                                updatePaymentStatus(
                                  order.id,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              {PAYMENT_STATUSES.map(
                                (
                                  status
                                ) => (
                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                  >
                                    {formatPaymentStatus(
                                      status
                                    )}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </td>

                        <td>
                          <div className="status-action-cell">
                            <div className="status-line">
                              <span
                                className={`order-status-badge ${getStatusClass(
                                  order.status
                                )}`}
                              >
                                <span className="status-dot" />

                                {formatStatus(
                                  order.status
                                )}
                              </span>

                              {!isFinalStatus(
                                order.status
                              ) &&
                                nextAction && (
                                  <button
                                    type="button"
                                    className="status-next-button"
                                    disabled={
                                      updating
                                    }
                                    onClick={() =>
                                      handleStatusAdvance(
                                        order
                                      )
                                    }
                                  >
                                    {updating
                                      ? "Updating..."
                                      : nextAction.label}
                                  </button>
                                )}
                            </div>

                            {!isFinalStatus(
                              order.status
                            ) && (
                              <button
                                type="button"
                                className="cancel-order-button"
                                disabled={
                                  updating
                                }
                                onClick={() =>
                                  handleCancelOrder(
                                    order
                                  )
                                }
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </td>

                        <td>
                          <span className="order-date">
                            {formatDate(
                              order.created_at
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}