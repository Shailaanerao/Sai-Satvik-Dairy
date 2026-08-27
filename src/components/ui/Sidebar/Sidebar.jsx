"use client";

import React from "react";
import Link from "next/link";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {

  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}


      {/* Sidebar */}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        {/* HEADER */}

        <div className="sidebar-header">

          <div className="sidebar-brand">

            <div className="sidebar-logo">

              <span>SS</span>

            </div>

            <div className="sidebar-brand-text">

              <h2>
                Sai Satvik
              </h2>

              <span>
                Dairy Products
              </span>

            </div>

          </div>


          {/* CLOSE */}

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>

        </div>


        {/* PROFILE */}

        <Link
          href="/account"
          className="sidebar-profile"
          onClick={onClose}
        >

          <div className="sidebar-avatar">
            P
          </div>

          <div className="sidebar-profile-info">

            <strong>
              Hello, Priya
            </strong>

            <span>
              My Account
            </span>

          </div>

        </Link>


        {/* NAVIGATION */}

        <nav className="sidebar-navigation">

          <p className="sidebar-section-title">
            MENU
          </p>


          <SidebarLink
            href="/"
            icon={<HomeIcon />}
            text="Home"
            onClose={onClose}
          />

          <SidebarLink
            href="/products"
            icon={<ProductsIcon />}
            text="Products"
            onClose={onClose}
          />

          <SidebarLink
            href="/orders"
            icon={<OrdersIcon />}
            text="My Orders"
            onClose={onClose}
          />

          <SidebarLink
            href="/wishlist"
            icon={<HeartIcon />}
            text="Wishlist"
            onClose={onClose}
          />

          <SidebarLink
            href="/subscription"
            icon={<SubscriptionIcon />}
            text="Subscription"
            onClose={onClose}
          />


          <p className="sidebar-section-title information-title">
            INFORMATION
          </p>


          <SidebarLink
            href="/about"
            icon={<InfoIcon />}
            text="About Us"
            onClose={onClose}
          />

          <SidebarLink
            href="/contact"
            icon={<ContactIcon />}
            text="Contact Us"
            onClose={onClose}
          />

          <SidebarLink
            href="/quality"
            icon={<QualityIcon />}
            text="Quality & Testing"
            onClose={onClose}
          />

        </nav>


        {/* BOTTOM */}

        <div className="sidebar-bottom">

          <SidebarLink
            href="/settings"
            icon={<SettingsIcon />}
            text="Settings"
            onClose={onClose}
          />

          <button
            className="sidebar-logout"
            onClick={() => {
              console.log("Logout clicked");
            }}
          >

            <LogoutIcon />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
}


/* =========================================
   REUSABLE SIDEBAR LINK
========================================= */

function SidebarLink({
  href,
  icon,
  text,
  onClose
}) {

  return (
    <Link
      href={href}
      className="sidebar-link"
      onClick={onClose}
    >

      <span className="sidebar-icon">
        {icon}
      </span>

      <span>
        {text}
      </span>

    </Link>
  );
}


/* =========================================
   ICONS
========================================= */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}


function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 7h16v13H4z" />
      <path d="M8 7V5a4 4 0 018 0v2" />
    </svg>
  );
}


function OrdersIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 4h14v16H5z" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}


function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11S3.2 14.2 3.2 8.7A4.7 4.7 0 0112 6a4.7 4.7 0 018.8 2.7z" />
    </svg>
  );
}


function SubscriptionIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
      <path d="M4 4l-1 4 4 1" />
    </svg>
  );
}


function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}


function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}


function QualityIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />

      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}


function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="3"
      />

      <path d="M19.4 15a1.7 1.7 0 000-6l-1-1.7a1.7 1.7 0 00-2.3-.6l-1.7-1a1.7 1.7 0 00-4.8 0l-1.7 1a1.7 1.7 0 00-2.3.6l-1 1.7a1.7 1.7 0 000 6l1 1.7a1.7 1.7 0 002.3.6l1.7 1a1.7 1.7 0 004.8 0l1.7-1a1.7 1.7 0 002.3-.6z" />
    </svg>
  );
}


function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M10 5H5v14h5" />

      <path d="M14 8l4 4-4 4" />

      <path d="M18 12H9" />
    </svg>
  );
}