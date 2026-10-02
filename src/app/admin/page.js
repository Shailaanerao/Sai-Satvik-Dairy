"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import { supabase } from "@/lib/supabase";

import "./dashboard.css";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL;

const LOW_STOCK_LIMIT = 5;

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}

function formatStatus(status) {
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

function getStatusClass(status) {
    switch (status) {
        case "delivered":
            return "status-success";

        case "cancelled":
            return "status-danger";

        case "out_for_delivery":
            return "status-info";

        case "processing":
            return "status-processing";

        case "confirmed":
            return "status-confirmed";

        case "pending":
        default:
            return "status-pending";
    }
}

function getCustomerName(customer) {
    const fullName = [
        customer?.firstName,
        customer?.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    return fullName || "Customer";
}

function getDateKey(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    const year = date.getFullYear();
    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getDateLabel(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function getShortDateLabel(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
        }
    );
}

function DashboardIcon({
    type,
}) {
    if (type === "products") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
                <path
                    d="m4.5 7.5 7.5 4 7.5-4M12 11.5V21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (type === "orders") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 8h8M8 12h8M8 16h5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === "revenue") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M12 3v18M16 7.5c0-1.7-1.8-3-4-3S8 5.8 8 7.5s1.7 2.7 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === "category") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h5A1.5 1.5 0 0 1 12 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 10.5v-5ZM12 13.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5v-5ZM12 4h6a2 2 0 0 1 2 2v4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (type === "users") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    cx="9"
                    cy="8"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                />
                <path
                    d="M3.5 19a5.5 5.5 0 0 1 11 0M15 5a3 3 0 1 1 0 6M16 13.5a5.5 5.5 0 0 1 4.5 5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === "stock") {
        return (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M12 3.5 20 7v10l-8 3.5L4 17V7l8-3.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 9.5 12 11l4-1.5M12 11v7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    return null;
}

export default function AdminDashboardPage() {
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] =
        useState([]);
    const [orders, setOrders] = useState([]);

    const [adminProfile, setAdminProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] =
        useState(null);

    const loadDashboard = useCallback(
        async (isRefresh = false) => {
            try {
                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                setError("");

                const {
                    data: { session },
                } = await supabase.auth.getSession();

                const accessToken =
                    session?.access_token;

                const authUser = session?.user;

                if (authUser) {
                    const metadata =
                        authUser.user_metadata || {};

                    setAdminProfile({
                        id: authUser.id,
                        firstName:
                            metadata.first_name ||
                            metadata.firstName ||
                            "",
                        lastName:
                            metadata.last_name ||
                            metadata.lastName ||
                            "",
                        name:
                            metadata.full_name ||
                            metadata.fullName ||
                            metadata.name ||
                            "",
                        email:
                            authUser.email ||
                            "",
                        phone:
                            metadata.phone ||
                            metadata.mobile ||
                            "",
                        role: "Administrator",
                    });
                }

                if (!accessToken) {
                    router.replace(
                        "/login?redirect=/admin"
                    );
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                const [
                    productsResponse,
                    categoriesResponse,
                    ordersResponse,
                ] = await Promise.all([
                    fetch(
                        `${API_BASE_URL}/admin/products`,
                        {
                            headers,
                            cache: "no-store",
                        }
                    ),
                    fetch(
                        `${API_BASE_URL}/categories`,
                        {
                            headers,
                            cache: "no-store",
                        }
                    ),
                    fetch(
                        `${API_BASE_URL}/admin/orders`,
                        {
                            headers,
                            cache: "no-store",
                        }
                    ),
                ]);

                const [
                    productsData,
                    categoriesData,
                    ordersData,
                ] = await Promise.all([
                    productsResponse.json(),
                    categoriesResponse.json(),
                    ordersResponse.json(),
                ]);

                if (
                    productsResponse.status === 401 ||
                    productsResponse.status === 403 ||
                    categoriesResponse.status === 401 ||
                    categoriesResponse.status === 403 ||
                    ordersResponse.status === 401 ||
                    ordersResponse.status === 403
                ) {
                    router.replace("/home");
                    return;
                }

                if (!productsResponse.ok) {
                    throw new Error(
                        productsData?.message ||
                        "Failed to load products."
                    );
                }

                if (!categoriesResponse.ok) {
                    throw new Error(
                        categoriesData?.message ||
                        "Failed to load categories."
                    );
                }

                if (!ordersResponse.ok) {
                    throw new Error(
                        ordersData?.message ||
                        "Failed to load orders."
                    );
                }

                setProducts(
                    Array.isArray(
                        productsData?.products
                    )
                        ? productsData.products
                        : []
                );

                setCategories(
                    Array.isArray(
                        categoriesData?.categories
                    )
                        ? categoriesData.categories
                        : []
                );

                setOrders(
                    Array.isArray(
                        ordersData?.orders
                    )
                        ? ordersData.orders
                        : []
                );

                setLastUpdated(new Date());
            } catch (dashboardError) {
                console.error(
                    "Admin dashboard error:",
                    dashboardError
                );

                setError(
                    dashboardError?.message ||
                    "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [router]
    );

    useEffect(() => {
        const initialLoadTimer =
            setTimeout(() => {
                loadDashboard();
            }, 0);

        const refreshTimer =
            setInterval(() => {
                loadDashboard(true);
            }, 30000);

        return () => {
            clearTimeout(initialLoadTimer);
            clearInterval(refreshTimer);
        };
    }, [loadDashboard]);

    const metrics = useMemo(() => {
        const activeProducts =
            products.filter(
                (product) =>
                    Boolean(product.is_active)
            );

        const pendingOrders =
            orders.filter(
                (order) =>
                    order.status === "pending"
            );

        const todayKey = getDateKey(
            new Date()
        );

        const todayOrders =
            orders.filter(
                (order) =>
                    getDateKey(
                        order.created_at
                    ) === todayKey
            );

        const validRevenueOrders =
            orders.filter(
                (order) =>
                    order.status !== "cancelled"
            );

        const paidOrders =
            validRevenueOrders.filter(
                (order) =>
                    order.payment_status ===
                    "paid"
            );

        const paidRevenue =
            paidOrders.reduce(
                (sum, order) =>
                    sum +
                    Number(
                        order.total_amount || 0
                    ),
                0
            );

        const totalOrderValue =
            validRevenueOrders.reduce(
                (sum, order) =>
                    sum +
                    Number(
                        order.total_amount || 0
                    ),
                0
            );

        const averageOrderValue =
            validRevenueOrders.length > 0
                ? totalOrderValue /
                validRevenueOrders.length
                : 0;

        const lowStockProducts =
            activeProducts.filter(
                (product) =>
                    Number(
                        product.stock_quantity ??
                        0
                    ) <= LOW_STOCK_LIMIT
            );

        const outForDelivery =
            orders.filter(
                (order) =>
                    order.status ===
                    "out_for_delivery"
            );

        const activeCategories =
            categories.filter(
                (category) =>
                    category.is_active !==
                    false
            );

        return {
            activeProducts,
            pendingOrders,
            todayOrders,
            paidRevenue,
            totalOrderValue,
            averageOrderValue,
            lowStockProducts,
            outForDelivery,
            activeCategories,
            paidOrders,
        };
    }, [
        categories,
        orders,
        products,
    ]);

    const recentOrders = useMemo(() => {
        return orders.slice(0, 6);
    }, [orders]);

    const salesLastSevenDays =
        useMemo(() => {
            const days = [];

            for (
                let index = 6;
                index >= 0;
                index -= 1
            ) {
                const date = new Date();

                date.setHours(
                    0,
                    0,
                    0,
                    0
                );

                date.setDate(
                    date.getDate() -
                    index
                );

                const key =
                    getDateKey(date);

                const value = orders
                    .filter(
                        (order) =>
                            order.status !==
                            "cancelled" &&
                            getDateKey(
                                order.created_at
                            ) === key
                    )
                    .reduce(
                        (
                            sum,
                            order
                        ) =>
                            sum +
                            Number(
                                order.total_amount ||
                                0
                            ),
                        0
                    );

                days.push({
                    key,
                    label:
                        getShortDateLabel(
                            date
                        ),
                    value,
                });
            }

            return days;
        }, [orders]);

    const maxSalesValue = useMemo(() => {
        return Math.max(
            ...salesLastSevenDays.map(
                (day) => day.value
            ),
            1
        );
    }, [salesLastSevenDays]);

    const topProducts = useMemo(() => {
        const productMap =
            new Map();

        orders.forEach((order) => {
            if (
                order.status ===
                "cancelled"
            ) {
                return;
            }

            const items = Array.isArray(
                order.order_items
            )
                ? order.order_items
                : [];

            items.forEach((item) => {
                const name =
                    item.product_name ||
                    "Unknown Product";

                const existing =
                    productMap.get(name) || {
                        name,
                        quantity: 0,
                        revenue: 0,
                    };

                existing.quantity +=
                    Number(
                        item.quantity ||
                        0
                    );

                existing.revenue +=
                    Number(
                        item.total_price ||
                        0
                    );

                productMap.set(
                    name,
                    existing
                );
            });
        });

        return [
            ...productMap.values(),
        ]
            .sort(
                (
                    first,
                    second
                ) =>
                    second.quantity -
                    first.quantity
            )
            .slice(0, 5);
    }, [orders]);

    if (loading) {
        return (
            <section className="admin-dashboard">
                <AdminPageHeader
                    title="Dashboard"
                    description="Your Sai Satvik store at a glance."
                />

                <div className="dashboard-loading">
                    <div className="dashboard-spinner" />
                    <p>
                        Loading dashboard...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-dashboard">
            <AdminPageHeader
                title="Dashboard"
                description="Monitor your Sai Satvik store, orders, products and sales activity."
                action={
                    <button
                        type="button"
                        className="dashboard-refresh-button"
                        onClick={() =>
                            loadDashboard(
                                true
                            )
                        }
                        disabled={
                            refreshing
                        }
                    >
                        <span
                            className={
                                refreshing
                                    ? "refresh-icon spinning"
                                    : "refresh-icon"
                            }
                        >
                            ↻
                        </span>

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}
                    </button>
                }
            />

            {error && (
                <div className="dashboard-alert">
                    <strong>
                        Dashboard update failed.
                    </strong>

                    <span>
                        {error}
                    </span>
                </div>
            )}

            <div className="dashboard-welcome">
                <div>
                    <span className="dashboard-kicker">
                        SAI SATVIK DAIRY
                    </span>

                    <h2>
                        Good day, Admin
                    </h2>

                    <p>
                        Here is the latest activity from
                        your store.
                    </p>
                </div>

                <div className="dashboard-live">
                    <span className="live-dot" />

                    <span>
                        Live dashboard
                    </span>

                    {lastUpdated && (
                        <small>
                            Updated{" "}
                            {lastUpdated.toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </small>
                    )}
                </div>
            </div>

            <div className="admin-profile-section">
                <div className="admin-profile-avatar">
                    {(() => {
                        const displayName =
                            [
                                adminProfile?.firstName,
                                adminProfile?.lastName,
                            ]
                                .filter(
                                    Boolean
                                )
                                .join(
                                    " "
                                ) ||
                            adminProfile?.name ||
                            "Admin";

                        const nameParts =
                            displayName
                                .trim()
                                .split(
                                    /\s+/
                                );

                        return (
                            `${nameParts[0]?.[0] || ""}${nameParts[1]?.[0] || ""
                            }`
                        )
                            .toUpperCase()
                            .slice(
                                0,
                                2
                            );
                    })()}
                </div>

                <div className="admin-profile-details">
                    <span className="admin-profile-label">
                        ADMIN PROFILE
                    </span>

                    <h3>
                        {[
                            adminProfile?.firstName,
                            adminProfile?.lastName,
                        ]
                            .filter(
                                Boolean
                            )
                            .join(
                                " "
                            ) ||
                            adminProfile?.name ||
                            "Administrator"}
                    </h3>

                    <div className="admin-profile-meta">
                        <span>
                            {adminProfile?.email ||
                                "Email not available"}
                        </span>

                        {adminProfile?.phone && (
                            <>
                                <span>
                                    •
                                </span>

                                <span>
                                    {
                                        adminProfile.phone
                                    }
                                </span>
                            </>
                        )}
                    </div>

                    <span className="admin-profile-role">
                        {adminProfile?.role ||
                            "Administrator"}
                    </span>
                </div>

                <Link
                    href="/admin/profile"
                    className="admin-profile-button"
                >
                    View Profile
                    <span>→</span>
                </Link>
            </div>

            <div className="dashboard-stat-grid">
                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            <DashboardIcon
                                type="products"
                            />
                        </div>

                        <Link
                            href="/admin/products"
                            className="stat-link"
                        >
                            View
                        </Link>
                    </div>

                    <span className="stat-label">
                        Total Products
                    </span>

                    <strong className="stat-value">
                        {products.length}
                    </strong>

                    <span className="stat-note">
                        {
                            metrics
                                .activeProducts
                                .length
                        }{" "}
                        active products
                    </span>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            <DashboardIcon
                                type="category"
                            />
                        </div>

                        <Link
                            href="/admin/categories"
                            className="stat-link"
                        >
                            Manage
                        </Link>
                    </div>

                    <span className="stat-label">
                        Categories
                    </span>

                    <strong className="stat-value">
                        {categories.length}
                    </strong>

                    <span className="stat-note">
                        {
                            metrics
                                .activeCategories
                                .length
                        }{" "}
                        active categories
                    </span>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            <DashboardIcon
                                type="orders"
                            />
                        </div>

                        <Link
                            href="/admin/orders"
                            className="stat-link"
                        >
                            Open
                        </Link>
                    </div>

                    <span className="stat-label">
                        Total Orders
                    </span>

                    <strong className="stat-value">
                        {orders.length}
                    </strong>

                    <span className="stat-note">
                        {
                            metrics
                                .pendingOrders
                                .length
                        }{" "}
                        pending orders
                    </span>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            <DashboardIcon
                                type="revenue"
                            />
                        </div>

                        <span className="stat-tag">
                            Paid
                        </span>
                    </div>

                    <span className="stat-label">
                        Paid Revenue
                    </span>

                    <strong className="stat-value revenue-value">
                        {formatCurrency(
                            metrics.paidRevenue
                        )}
                    </strong>

                    <span className="stat-note">
                        From{" "}
                        {
                            metrics.paidOrders
                                .length
                        }{" "}
                        paid orders
                    </span>
                </div>
            </div>

            <div className="dashboard-secondary-grid">
                <div className="dashboard-mini-card">
                    <div className="mini-icon">
                        <DashboardIcon
                            type="orders"
                        />
                    </div>

                    <div>
                        <span>
                            Today&apos;s Orders
                        </span>

                        <strong>
                            {
                                metrics
                                    .todayOrders
                                    .length
                            }
                        </strong>
                    </div>
                </div>

                <div className="dashboard-mini-card">
                    <div className="mini-icon">
                        <DashboardIcon
                            type="orders"
                        />
                    </div>

                    <div>
                        <span>
                            Out for Delivery
                        </span>

                        <strong>
                            {
                                metrics
                                    .outForDelivery
                                    .length
                            }
                        </strong>
                    </div>
                </div>

                <div className="dashboard-mini-card">
                    <div className="mini-icon warning">
                        <DashboardIcon
                            type="stock"
                        />
                    </div>

                    <div>
                        <span>
                            Low Stock
                        </span>

                        <strong>
                            {
                                metrics
                                    .lowStockProducts
                                    .length
                            }
                        </strong>
                    </div>
                </div>

                <div className="dashboard-mini-card">
                    <div className="mini-icon">
                        <DashboardIcon
                            type="revenue"
                        />
                    </div>

                    <div>
                        <span>
                            Average Order
                        </span>

                        <strong>
                            {formatCurrency(
                                metrics.averageOrderValue
                            )}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="dashboard-main-grid">
                <div className="dashboard-panel sales-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <span className="panel-kicker">
                                SALES ACTIVITY
                            </span>

                            <h3>
                                Last 7 Days
                            </h3>
                        </div>

                        <strong className="panel-total">
                            {formatCurrency(
                                salesLastSevenDays.reduce(
                                    (
                                        sum,
                                        day
                                    ) =>
                                        sum +
                                        day.value,
                                    0
                                )
                            )}
                        </strong>
                    </div>

                    <div className="sales-chart">
                        {salesLastSevenDays.map(
                            (day) => {
                                const height =
                                    day.value ===
                                        0
                                        ? 5
                                        : Math.max(
                                            12,
                                            (day.value /
                                                maxSalesValue) *
                                            100
                                        );

                                return (
                                    <div
                                        className="sales-day"
                                        key={
                                            day.key
                                        }
                                    >
                                        <div className="sales-bar-area">
                                            <div
                                                className="sales-bar"
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                                title={`${day.label}: ${formatCurrency(day.value)}`}
                                            />
                                        </div>

                                        <span>
                                            {
                                                day.label
                                            }
                                        </span>

                                        <small>
                                            {formatCurrency(
                                                day.value
                                            )}
                                        </small>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                <div className="dashboard-panel quick-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <span className="panel-kicker">
                                QUICK ACTIONS
                            </span>

                            <h3>
                                Manage Store
                            </h3>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <Link
                            href="/admin/products"
                            className="quick-action"
                        >
                            <span>
                                Add or edit products
                            </span>

                            <b>
                                →
                            </b>
                        </Link>

                        <Link
                            href="/admin/categories"
                            className="quick-action"
                        >
                            <span>
                                Manage categories
                            </span>

                            <b>
                                →
                            </b>
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="quick-action"
                        >
                            <span>
                                Process customer orders
                            </span>

                            <b>
                                →
                            </b>
                        </Link>

                        <Link
                            href="/admin/customers"
                            className="quick-action"
                        >
                            <span>
                                View customer area
                            </span>

                            <b>
                                →
                            </b>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                <div className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <span className="panel-kicker">
                                ORDER ACTIVITY
                            </span>

                            <h3>
                                Recent Orders
                            </h3>
                        </div>

                        <Link
                            href="/admin/orders"
                            className="panel-action"
                        >
                            View all
                        </Link>
                    </div>

                    {recentOrders.length ===
                        0 ? (
                        <div className="dashboard-empty">
                            <p>
                                No orders have been placed yet.
                            </p>
                        </div>
                    ) : (
                        <div className="dashboard-table-wrap">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>
                                            Order
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map(
                                        (
                                            order
                                        ) => (
                                            <tr
                                                key={
                                                    order.id
                                                }
                                            >
                                                <td>
                                                    <Link
                                                        href={`/admin/orders?order=${order.id}`}
                                                        className="order-number"
                                                    >
                                                        #
                                                        {
                                                            order.id
                                                        }
                                                    </Link>
                                                </td>

                                                <td>
                                                    <div className="customer-cell">
                                                        <span className="customer-avatar">
                                                            {getCustomerName(
                                                                order.customer
                                                            )
                                                                .charAt(
                                                                    0
                                                                )
                                                                .toUpperCase()}
                                                        </span>

                                                        <span>
                                                            {getCustomerName(
                                                                order.customer
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    {getDateLabel(
                                                        order.created_at
                                                    )}
                                                </td>

                                                <td className="amount-cell">
                                                    {formatCurrency(
                                                        order.total_amount
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`status-badge ${getStatusClass(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {formatStatus(
                                                            order.status
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <span className="panel-kicker">
                                INVENTORY
                            </span>

                            <h3>
                                Low Stock Products
                            </h3>
                        </div>

                        <Link
                            href="/admin/products"
                            className="panel-action"
                        >
                            Manage
                        </Link>
                    </div>

                    {metrics
                        .lowStockProducts
                        .length ===
                        0 ? (
                        <div className="inventory-clear">
                            <div className="inventory-clear-icon">
                                ✓
                            </div>

                            <strong>
                                Inventory looks good
                            </strong>

                            <p>
                                No active products are below the
                                low-stock threshold.
                            </p>
                        </div>
                    ) : (
                        <div className="inventory-list">
                            {metrics
                                .lowStockProducts
                                .slice(0, 6)
                                .map(
                                    (
                                        product
                                    ) => (
                                        <div
                                            className="inventory-item"
                                            key={
                                                product.id
                                            }
                                        >
                                            <div className="inventory-product">
                                                <div className="inventory-image">
                                                    {product.image_url ? (
                                                        <Image
                                                            src={
                                                                product.image_url
                                                            }
                                                            alt=""
                                                            width={
                                                                42
                                                            }
                                                            height={
                                                                42
                                                            }
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <span>
                                                            SS
                                                        </span>
                                                    )}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {
                                                            product.name
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            product.unit ||
                                                            "Unit"
                                                        }
                                                    </small>
                                                </div>
                                            </div>

                                            <span className="stock-count">
                                                {Number(
                                                    product.stock_quantity ??
                                                    0
                                                )}{" "}
                                                left
                                            </span>
                                        </div>
                                    )
                                )}
                        </div>
                    )}
                </div>
            </div>

            <div className="dashboard-panel top-products-panel">
                <div className="dashboard-panel-header">
                    <div>
                        <span className="panel-kicker">
                            PRODUCT PERFORMANCE
                        </span>

                        <h3>
                            Top Selling Products
                        </h3>
                    </div>
                </div>

                {topProducts.length ===
                    0 ? (
                    <div className="dashboard-empty">
                        <p>
                            Sales data will appear here after
                            products are ordered.
                        </p>
                    </div>
                ) : (
                    <div className="top-products-list">
                        {topProducts.map(
                            (
                                product,
                                index
                            ) => (
                                <div
                                    className="top-product-row"
                                    key={
                                        product.name
                                    }
                                >
                                    <span className="top-product-rank">
                                        {String(
                                            index +
                                            1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <div className="top-product-info">
                                        <strong>
                                            {
                                                product.name
                                            }
                                        </strong>

                                        <span>
                                            {
                                                product.quantity
                                            }{" "}
                                            units sold
                                        </span>
                                    </div>

                                    <strong className="top-product-revenue">
                                        {formatCurrency(
                                            product.revenue
                                        )}
                                    </strong>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            <div className="dashboard-footer-note">
                <span>
                    {orders.length} orders
                </span>

                <span>
                    •
                </span>

                <span>
                    {products.length} products
                </span>

                <span>
                    •
                </span>

                <span>
                    {categories.length} categories
                </span>

                <span>
                    •
                </span>

                <span>
                    {formatCurrency(
                        metrics.totalOrderValue
                    )}{" "}
                    total order value
                </span>
            </div>
        </section>
    );
}