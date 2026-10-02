"use client";

import Link from "next/link";

import { useCart } from "@/app/context/CartContext";

export default function NavbarCart() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="action-btn cart-circle-btn"
      aria-label={`Shopping cart with ${
        totalQuantity || 0
      } items`}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle
          cx="9"
          cy="21"
          r="1"
        />

        <circle
          cx="20"
          cy="21"
          r="1"
        />

        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {totalQuantity > 0 && (
        <span className="cart-badge-pulse">
          {totalQuantity > 99
            ? "99+"
            : totalQuantity}
        </span>
      )}
    </Link>
  );
}