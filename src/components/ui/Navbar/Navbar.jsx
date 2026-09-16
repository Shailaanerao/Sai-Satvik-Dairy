"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "../Sidebar/Sidebar";
import NotificationDropdown from "../Notifications/NotificationDropdown";
import CategoryDropdown from "./CategoryDropdown";

import { useCart } from "@/app/context/CartContext";

import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Subscription", href: "/subscription" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { totalQuantity } = useCart();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isLinkActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      router.push("/products");
      return;
    }

    router.push(
      `/products?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <>
      <header className="navbar-container">

        {/* LEFT / BRAND */}

        <div className="navbar-left">

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

<div
  className="brand-logo"
  aria-label="Sai Satvik Dairy"
>
  <div className="logo-icon-wrapper">
    <Image
      src="/logo.jpeg"
      alt="Sai Satvik Dairy"
      width={48}
      height={48}
      priority
      className="brand-logo-img"
    />
  </div>

  <div className="brand-text">
    <span className="brand-title">
      Sai Satvik
    </span>

    <span className="brand-subtitle">
      DAIRY PRODUCTS
    </span>

    <span className="brand-subtitle1">
      PURE FOR SURE
    </span>
  </div>
</div>

        </div>

        {/* SEARCH */}

        <form
          className="navbar-search-wrapper"
          onSubmit={handleSearch}
        >
          <div className="search-container">

            <CategoryDropdown />

            <div className="search-divider"></div>

            <div className="search-bar">

              <svg
                className="search-leading-icon"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>

              <input
                type="search"
                placeholder="Search milk, ghee, paneer..."
                aria-label="Search products"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

              <button
                type="submit"
                className="search-btn"
                aria-label="Search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  />
                </svg>
              </button>

            </div>
          </div>
        </form>

        {/* NAVIGATION */}

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLinkActive(link.href)
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}

        <div className="navbar-actions">

          {/* NOTIFICATION */}

          <div className="notification-wrapper">
            <NotificationDropdown />
          </div>

          {/* CART */}

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

          {/* PROFILE */}

          <Link
            href="/profile"
            className="user-profile"
            aria-label="Open My Account"
          >
            <div className="profile-avatar">

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>

            </div>

            <div className="profile-info">

              <span className="user-greeting">
                Hello, Shaila
              </span>

              <div className="user-account">
                <span>My Account</span>

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

            </div>
          </Link>

        </div>
      </header>

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}