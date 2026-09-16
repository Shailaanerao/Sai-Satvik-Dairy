"use client";

import { useState } from "react";
import Link from "next/link";

import "./ExclusiveOffer.css";

const offers = [
  {
    id: 1,
    tag: "WELCOME OFFER",
    title: "Get 15% OFF",
    subtitle: "On Your First Order",
    description:
      "Start your journey with fresh and pure dairy products directly from our Vedic farm.",
    code: "SAI10",
    buttonText: "Shop Now",
    link: "/products",
    badgeColor: "#2d5a37",
    cardTheme: "theme-fresh",
  },
  {
    id: 2,
    tag: "DAILY SUBSCRIPTION",
    title: "Save on Daily Delivery",
    subtitle: "Fresh dairy at your doorstep",
    description:
      "Enjoy hassle-free early morning delivery of fresh dairy products.",
    code: "FRESH20",
    buttonText: "Subscribe Now",
    link: "/subscription",
    badgeColor: "#c27803",
    cardTheme: "theme-warm",
  },
  {
    id: 3,
    tag: "FARM COMBO PACK",
    title: "Save Flat ₹100",
    subtitle: "On eligible dairy orders",
    description:
      "Use this offer while shopping for your family’s daily dairy needs.",
    code: "DAIRY100",
    buttonText: "Claim Offer",
    link: "/products",
    badgeColor: "#1b4d3e",
    cardTheme: "theme-earth",
  },
];

export default function ExclusiveOffer() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      window.setTimeout(() => {
        setCopiedCode(null);
      }, 2500);
    } catch {
      setCopiedCode(null);
    }
  };

  return (
    <section className="exclusive-section">
      <div className="exclusive-header">
        <span className="exclusive-badge-pill">
          SPECIAL PROMOTIONS
        </span>

        <h2 className="exclusive-title">
          Exclusive Farm Offers
        </h2>

        <p className="exclusive-subtitle">
          Save more on organic, chemical-free dairy products and daily
          subscription plans.
        </p>
      </div>

      <div className="exclusive-grid">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className={`exclusive-card ${offer.cardTheme}`}
          >
            <div className="card-top-bar">
              <span
                className="offer-pill"
                style={{ backgroundColor: offer.badgeColor }}
              >
                {offer.tag}
              </span>
            </div>

            <div className="card-body">
              <h3 className="offer-discount">{offer.title}</h3>
              <h4 className="offer-subtitle">{offer.subtitle}</h4>
              <p className="offer-desc">{offer.description}</p>
            </div>

            <div className="coupon-action-box">
              <div className="coupon-info">
                <span className="coupon-label">COUPON CODE</span>
                <span className="coupon-value">{offer.code}</span>
              </div>

              <button
                type="button"
                className={
                  copiedCode === offer.code
                    ? "copy-btn copied"
                    : "copy-btn"
                }
                onClick={() => handleCopy(offer.code)}
                aria-label={`Copy coupon code ${offer.code}`}
              >
                {copiedCode === offer.code ? "Copied" : "Copy"}
              </button>
            </div>

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
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}