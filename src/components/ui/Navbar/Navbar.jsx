"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.css";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="navbar-container">

        {/* LEFT SECTION */}
        <div className="navbar-left">

          {/* Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
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


          {/* LOGO */}
          <Link href="/" className="brand-logo">

            <div className="logo-icon-wrapper">
              <Image
                src="/logo.jpeg"
                alt="Sai Satvik Logo"
                width={44}
                height={44}
                priority
                className="brand-logo-img"
              />
            </div>

            <div className="brand-text">

              <span className="brand-title">
                Sai Satvik
              </span>

              <span className="brand-subtitle">
                — DAIRY PRODUCTS —
              </span>

              <span className="brand-subtitle1">
                PURE FOR SURE
              </span>

            </div>

          </Link>

        </div>


        {/* SEARCH */}
        <div className="navbar-search-wrapper">

          <button className="category-btn">

            <span>
              All Categories
            </span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>

          </button>


          <div className="search-bar">

            <input
              type="text"
              placeholder="Search for milk, ghee..."
              aria-label="Search"
            />

            <button
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
              >
                <circle cx="11" cy="11" r="8" />

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


        {/* DESKTOP NAVIGATION */}
        <nav className="nav-links">

          <Link
            href="/"
            className="nav-link active"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="nav-link"
          >
            Products
          </Link>

          <Link
            href="/services"
            className="nav-link"
          >
            Services
          </Link>

          <Link
            href="/subscription"
            className="nav-link"
          >
            Subscription
          </Link>

          <Link
            href="/about"
            className="nav-link"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="nav-link"
          >
            Contact
          </Link>

        </nav>


        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">

          {/* Notification */}
          <button
            className="action-btn notification-btn"
            aria-label="Notifications"
          >

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />

              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

          </button>


          {/* CART */}
          <Link
            href="/cart"
            className="action-btn"
            aria-label="Cart"
          >

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />

              <circle cx="20" cy="21" r="1" />

              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

          </Link>


          {/* PROFILE */}
          <Link
            href="/account"
            className="user-profile"
          >

            <div className="profile-avatar">

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>

            </div>

            <div className="profile-info">

              <span className="user-greeting">
                Hello, Priya
              </span>

              <div className="user-account">

                <span>
                  My account
                </span>

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


      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

    </>
  );
}