"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

// Reusable Component: Nav & Category Link Columns
function FooterLinkColumn({ title, links }) {
  return (
    <div className="footer-col">
      <h4 className="footer-col-title">{title}</h4>
      <ul className="footer-links-list">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reusable Component: Dual Address Cards (Vendor & Corporate/Design Office)
function AddressCard({ badge, title, address, phone, email }) {
  return (
    <div className="address-card">
      <div className="address-card-header">
        <span className="address-badge">{badge}</span>
        <h5 className="address-name">{title}</h5>
      </div>
      <div className="address-body">
        <div className="address-row">
          <svg className="address-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="address-text">{address}</p>
        </div>
        {phone && (
          <div className="address-row">
            <svg className="address-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="address-subtext">{phone}</span>
          </div>
        )}
        {email && (
          <div className="address-row">
            <svg className="address-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="address-subtext">{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Our Products", href: "/products" },
    { label: "Farming Services", href: "/services" },
    { label: "Milk Subscription", href: "/subscription" },
    { label: "About Our Farm", href: "/about" },
    { label: "Contact Support", href: "/contact" },
  ];

  const productLinks = [
    { label: "A2 Gir Cow Milk", href: "/products" },
    { label: "Vedic Bilona Ghee", href: "/products" },
    { label: "Fresh Malai Paneer", href: "/products" },
    { label: "Probiotic Desi Curd", href: "/products" },
    { label: "Cultured Butter", href: "/products" },
    { label: "Organic Raw Honey", href: "/products" },
  ];

  const addressData = [
    {
      badge: "FARM & VENDOR HUB",
      title: "Sai Satvik Dairy Farms",
      address: "Gat No. 42, Satvik Agro Pastures, Organic Dairy Zone, Pune Rural, Maharashtra 412206",
      phone: "+91 98765 43210 / +91 98765 43211",
      email: "supply@saisatvik.com",
    },
    {
      badge: "DESIGN & CORPORATE OFFICE",
      title: "Digital Experience & Tech Hub",
      address: "Level 4, Sai Tech Square, IT Park Road, Pimpri-Chinchwad, Pune, Maharashtra 411019",
      phone: "+91 91234 56789",
      email: "tech-design@saisatvik.com",
    },
  ];

  return (
    <footer className="site-footer">
      {/* Top Banner: Newsletter */}
      <div className="footer-newsletter-banner">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Subscribe for Fresh Farm Updates</h3>
            <p>Receive early harvest notifications, fresh batch schedules, and wellness recipes.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address..."
              aria-label="Email Address"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="footer-main">
        <div className="footer-top-grid">
          {/* Brand Info Column */}
          <div className="footer-col footer-brand-col">
            <Link href="/" className="footer-brand-logo">
              <div className="logo-circle">
                <Image
                  src="/logo.jpeg"
                  alt="Sai Satvik Logo"
                  width={42}
                  height={42}
                  className="footer-logo-img"
                />
              </div>
              <div className="brand-titles">
                <span className="footer-brand-name">Sai Satvik</span>
                <span className="footer-brand-sub">— DAIRY PRODUCTS —</span>
                <span className="footer-brand-tag">PURE FOR SURE</span>
              </div>
            </Link>

            <p className="footer-bio">
              Ethical Vedic Gaushala preserving indigenous Indian Gir cows. Naturally extracted A2 milk and traditional bilona churned dairy essentials delivered fresh at sunrise.
            </p>

            <div className="footer-badges">
              <span className="badge-pill">🌱 100% Organic Fodder</span>
              <span className="badge-pill">🥛 Pure A2 Beta-Casein</span>
              <span className="badge-pill">🪵 Hand-Churned Bilona</span>
            </div>
          </div>

          {/* Navigation Links */}
          <FooterLinkColumn title="Navigation" links={quickLinks} />

          {/* Products */}
          <FooterLinkColumn title="Pure Range" links={productLinks} />
        </div>

        {/* Dual Location Address Section */}
        <div className="footer-locations-wrapper">
          <h4 className="locations-title">Our Operational Facilities & Offices</h4>
          <div className="addresses-grid">
            {addressData.map((item, index) => (
              <AddressCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Sai Satvik Dairy Products. All rights reserved.</p>
          <div className="bottom-meta">
            <span>FSSAI Certified</span>
            <span>•</span>
            <span>Dawn Dispatch System</span>
            <span>•</span>
            <span>Glass Bottle Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}