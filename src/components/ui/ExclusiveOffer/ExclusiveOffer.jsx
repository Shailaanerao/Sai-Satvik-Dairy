"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./ExclusiveOffer.css";

const offers = [
  {
    id: 1,
    tag: "WELCOME OFFER",
    title: "Get 15% OFF",
    subtitle: "On Your First Order",
    description: "Start your journey with fresh and pure dairy products directly from our Vedic farm.",
    code: "WELCOME15",
    image: "/offer-milk.jpg",
    buttonText: "Shop Now",
    link: "/products",
    badgeColor: "#2d5a37",
    cardTheme: "theme-fresh",
  },
  {
    id: 2,
    tag: "DAILY SUBSCRIPTION",
    title: "Flat ₹250 Cashback",
    subtitle: "On 30-Day Milk Plan",
    description: "Enjoy hassle-free early morning delivery of unprocessed, raw A2 Gir cow milk.",
    code: "FRESH30",
    image: "/offer-subscription.jpg",
    buttonText: "Subscribe Now",
    link: "/subscription",
    badgeColor: "#c27803",
    cardTheme: "theme-warm",
  },
  {
    id: 3,
    tag: "FARM COMBO PACK",
    title: "Save Flat 20%",
    subtitle: "Vedic Ghee + Honey + Curd",
    description: "Handcrafted artisan dairy bundle slow-cooked with authentic wooden bilona churners.",
    code: "VEDIC20",
    image: "/offer-combo.jpg",
    buttonText: "Claim Combo",
    link: "/products",
    badgeColor: "#1b4d3e",
    cardTheme: "theme-earth",
  },
];

export default function ExclusiveOffer() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="exclusive-section">
      <div className="exclusive-header">
        <span className="exclusive-badge-pill">SPECIAL PROMOTIONS</span>
        <h2 className="exclusive-title">Exclusive Farm Offers</h2>
        <p className="exclusive-subtitle">
          Save more on organic, chemical-free dairy products and daily subscription plans.
        </p>
      </div>

      <div className="exclusive-grid">
        {offers.map((offer) => (
          <div key={offer.id} className={`exclusive-card ${offer.cardTheme}`}>
            {/* Top Tag */}
            <div className="card-top-bar">
              <span
                className="offer-pill"
                style={{ backgroundColor: offer.badgeColor }}
              >
                {offer.tag}
              </span>
            </div>

            {/* Offer Body */}
            <div className="card-body">
              <h3 className="offer-discount">{offer.title}</h3>
              <h4 className="offer-subtitle">{offer.subtitle}</h4>
              <p className="offer-desc">{offer.description}</p>
            </div>

            {/* Interactive Coupon Box */}
            <div className="coupon-action-box">
              <div className="coupon-info">
                <span className="coupon-label">COUPON CODE</span>
                <span className="coupon-value">{offer.code}</span>
              </div>
              <button
                className={`copy-btn ${copiedCode === offer.code ? "copied" : ""}`}
                onClick={() => handleCopy(offer.code)}
                aria-label={`Copy coupon code ${offer.code}`}
              >
                {copiedCode === offer.code ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* CTA Button */}
            <div className="card-footer">
              <Link href={offer.link} className="claim-link">
                <span>{offer.buttonText}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}