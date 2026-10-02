"use client";

import OrderTracking from "@/components/ui/OrderTracking/OrderTracking";

import {
    use,
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import { get, patch } from "@/lib/api";

import "../orders.css";
import "./order-details.css";

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
        return "—";
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
    return (
        ORDER_STATUSES[status] ||
        status ||
        "Unknown"
    );
}

function getPaymentStatusLabel(status) {
    return (
        PAYMENT_STATUSES[status] ||
        status ||
        "Unknown"
    );
}

export default function OrderDetailsPage({
    params,
}) {
    const { id } = use(params);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] =
        useState(true);
    const [error, setError] = useState("");

    const [cancelling, setCancelling] =
        useState(false);

    const [cancelError, setCancelError] =
        useState("");

    const [cancelSuccess, setCancelSuccess] =
        useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        let cancelled = false;

        const loadOrder = async () => {
            try {
                const response = await get(
                    `/orders/${id}`
                );

                const orderData =
                    response?.order ||
                    response?.data?.order ||
                    response?.data ||
                    null;

                if (!orderData) {
                    throw new Error(
                        "Order not found."
                    );
                }

                if (cancelled) {
                    return;
                }

                setOrder(orderData);
                setError("");
                setLoading(false);
            } catch (requestError) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Fetch order details error:",
                    requestError
                );

                setOrder(null);

                setError(
                    requestError?.message ||
                    "Failed to load order details."
                );

                setLoading(false);
            }
        };

        loadOrder();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleCancelOrder = async () => {
        if (!order || order.status !== "pending") {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this order?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setCancelling(true);
            setCancelError("");
            setCancelSuccess("");

            const response = await patch(
                `/orders/${order.id}/cancel`
            );

            const updatedOrder =
                response?.order ||
                response?.data?.order ||
                null;

            setOrder((currentOrder) => ({
                ...currentOrder,
                ...(updatedOrder || {}),
                status:
                    updatedOrder?.status ||
                    "cancelled",
            }));

            setCancelSuccess(
                "Your order has been cancelled successfully."
            );
        } catch (requestError) {
            console.error(
                "Cancel order error:",
                requestError
            );

            setCancelError(
                requestError?.message ||
                "Failed to cancel the order."
            );
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <main className="order-details-page">
                <div className="order-details-container">
                    <div className="order-details-loading">
                        <div className="order-details-spinner" />

                        <h2>
                            Loading order details...
                        </h2>

                        <p>
                            Please wait while we fetch your
                            order information.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !order) {
        return (
            <main className="order-details-page">
                <div className="order-details-container">
                    <section className="order-details-error">
                        <div className="order-details-error-icon">
                            !
                        </div>

                        <h1>
                            Unable to load order
                        </h1>

                        <p>
                            {error ||
                                "The requested order could not be found."}
                        </p>

                        <Link
                            href="/orders"
                            className="order-details-back-btn"
                        >
                            Back to My Orders
                        </Link>
                    </section>
                </div>
            </main>
        );
    }

    const address =
        order.shipping_address || {};

    const orderItems =
        Array.isArray(order.order_items)
            ? order.order_items
            : [];

    const paymentMethod =
        order.payment_method
            ? order.payment_method
                .replace(/_/g, " ")
                .replace(/\b\w/g, (letter) =>
                    letter.toUpperCase()
                )
            : "—";

    const canCancel =
        order.status === "pending";

    return (
        <main className="order-details-page">
            <div className="order-details-container">
                <Link
                    href="/orders"
                    className="order-details-back-link"
                >
                    ← Back to My Orders
                </Link>

                <header className="order-details-header">
                    <div>
                        <span className="order-details-eyebrow">
                            Sai Satvik Dairy
                        </span>

                        <h1>
                            Order #{order.id}
                        </h1>

                        <p>
                            Placed on{" "}
                            {formatDate(order.created_at)}
                        </p>
                    </div>

                    <div className="order-details-statuses">
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
                </header>

                {cancelSuccess && (
                    <div className="order-cancel-success">
                        <span>✓</span>

                        <p>{cancelSuccess}</p>
                    </div>
                )}

                {cancelError && (
                    <div className="order-cancel-error">
                        <span>!</span>

                        <p>{cancelError}</p>
                    </div>
                )}

                <div className="order-details-grid">
                    <div className="order-details-main">
                        <section className="details-card">
                            <div className="details-card-header">
                                <div>
                                    <span className="details-card-eyebrow">
                                        Your Purchase
                                    </span>

                                    <h2>
                                        Order Items
                                    </h2>
                                </div>

                                <span className="details-item-count">
                                    {orderItems.length}{" "}
                                    {orderItems.length === 1
                                        ? "item"
                                        : "items"}
                                </span>
                            </div>

                            <div className="details-items">
                                {orderItems.length === 0 ? (
                                    <div className="details-empty">
                                        No items found for this
                                        order.
                                    </div>
                                ) : (
                                    orderItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="details-item"
                                        >
                                            <div className="details-item-icon">
                                                🥛
                                            </div>

                                            <div className="details-item-info">
                                                <strong>
                                                    {item.product_name}
                                                </strong>

                                                <span>
                                                    Quantity:{" "}
                                                    {item.quantity}
                                                </span>

                                                <span>
                                                    Unit Price: ₹
                                                    {Number(
                                                        item.unit_price || 0
                                                    ).toFixed(2)}
                                                </span>
                                            </div>

                                            <strong className="details-item-total">
                                                ₹
                                                {Number(
                                                    item.total_price || 0
                                                ).toFixed(2)}
                                            </strong>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        <section className="details-card">
                            <div className="details-card-header">
                                <div>
                                    <span className="details-card-eyebrow">
                                        Delivery
                                    </span>

                                    <h2>
                                        Delivery Address
                                    </h2>
                                </div>
                            </div>

                            <div className="delivery-address">
                                <div className="delivery-address-icon">
                                    📍
                                </div>

                                <div>
                                    <strong>
                                        {address.name ||
                                            "Delivery Address"}
                                    </strong>

                                    {address.phone && (
                                        <span>
                                            {address.phone}
                                        </span>
                                    )}

                                    <p>
                                        {address.address || ""}
                                        {address.city
                                            ? `, ${address.city}`
                                            : ""}
                                        {address.state
                                            ? `, ${address.state}`
                                            : ""}
                                        {address.pincode
                                            ? ` - ${address.pincode}`
                                            : ""}
                                    </p>
                                </div>
                            </div>

                            {(address.deliveryDate ||
                                address.deliveryTime) && (
                                    <div className="delivery-slot">
                                        <div>
                                            <span>
                                                Delivery Date
                                            </span>

                                            <strong>
                                                {address.deliveryDate ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                Delivery Slot
                                            </span>

                                            <strong>
                                                {address.deliveryTime ||
                                                    "—"}
                                            </strong>
                                        </div>
                                    </div>
                                )}
                        </section>

                        <section className="details-card">
                            <div className="details-card-header">
                                <div>
                                    <span className="details-card-eyebrow">
                                        Payment
                                    </span>

                                    <h2>
                                        Payment Information
                                    </h2>
                                </div>
                            </div>

                            <div className="payment-info">
                                <div>
                                    <span>
                                        Payment Method
                                    </span>

                                    <strong>
                                        {paymentMethod}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Payment Status
                                    </span>

                                    <strong>
                                        {getPaymentStatusLabel(
                                            order.payment_status
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="order-details-sidebar">
                        <section className="details-card order-price-card">
                            <div className="details-card-header">
                                <div>
                                    <span className="details-card-eyebrow">
                                        Payment Summary
                                    </span>

                                    <h2>
                                        Order Total
                                    </h2>
                                </div>
                            </div>

                            <div className="price-breakdown">
                                <div>
                                    <span>
                                        Subtotal
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            order.subtotal || 0
                                        ).toFixed(2)}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Discount
                                    </span>

                                    <strong className="discount-value">
                                        - ₹
                                        {Number(
                                            order.discount || 0
                                        ).toFixed(2)}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Delivery Charge
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            order.delivery_charge ||
                                            0
                                        ).toFixed(2)}
                                    </strong>
                                </div>

                                <div className="price-total">
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
                            </div>
                        </section>

                        {canCancel && (
                            <section className="details-card order-cancel-card">
                                <span className="details-card-eyebrow">
                                    Order Actions
                                </span>

                                <h2>
                                    Cancel Order
                                </h2>

                                <p>
                                    You can cancel this order
                                    while it is still pending.
                                </p>

                                <button
                                    type="button"
                                    className="order-cancel-btn"
                                    onClick={handleCancelOrder}
                                    disabled={cancelling}
                                >
                                    {cancelling
                                        ? "Cancelling..."
                                        : "Cancel Order"}
                                </button>
                            </section>
                        )}

                        <section className="details-card order-help-card">
                            <div className="order-help-icon">
                                ?
                            </div>

                            <h3>
                                Need Help?
                            </h3>

                            <p>
                                If you have any questions about
                                this order, please contact Sai
                                Satvik Dairy support.
                            </p>

                            <Link href="/contact">
                                Contact Support
                            </Link>
                        </section>
                    </aside>
                </div>

                <OrderTracking
                    status={order.status}
                />
            </div>
        </main>
    );
}