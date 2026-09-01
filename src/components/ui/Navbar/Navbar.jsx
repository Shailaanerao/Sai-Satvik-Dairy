"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import NotificationDropdown from "../Notifications/NotificationDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { useCart } from "@/app/context/CartContext";
import "./Navbar.css";

// Removed duplicate "Categories" link from the main nav list
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Subscription", href: "/subscription" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { totalQuantity } = useCart();

  return (
    <>
      <header className="navbar-container">
        {/* LEFT SECTION */}
        <div className="navbar-left">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className="brand-logo">
            <div className="logo-icon-wrapper">
              <Image
                src="/logo.jpeg"
                alt="Sai Satvik Dairy"
                width={44}
                height={44}
                priority
                className="brand-logo-img"
              />
            </div>

            <div className="brand-text">
              <span className="brand-title">Sai Satvik</span>
              <span className="brand-subtitle">— DAIRY PRODUCTS —</span>
              <span className="brand-subtitle1">PURE FOR SURE</span>
            </div>
          </Link>
        </div>

        {/* SEARCH BAR WITH ALL CATEGORIES DROPDOWN */}
        <div className="navbar-search-wrapper">
          <CategoryDropdown />

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for milk, ghee..."
              aria-label="Search"
            />

            <button
              className="search-btn"
              aria-label="Search"
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* CLEAN DESKTOP NAV LINKS */}
        <nav className="nav-links">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">
          <NotificationDropdown />

          <Link
            href="/cart"
            className="action-btn cart-circle-btn"
            aria-label={`Shopping cart with ${totalQuantity || 0} items`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {totalQuantity > 0 && (
              <span className="cart-badge-pulse">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </Link>

          <Link href="/account" className="user-profile">
            <div className="profile-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <div className="profile-info">
              <span className="user-greeting">Hello, Priya</span>
              <div className="user-account">
                <span>My account</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}