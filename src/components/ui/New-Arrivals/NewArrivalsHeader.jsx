import React from "react";
import Link from "next/link";

export default function NewArrivalsHeader({
  badgeText = "JUST HARVESTED",
  title = "New Arrivals",
  highlightText = "Latest Products",
  description = "Discover our freshest farm additions, prepared with pure Vedic traditions.",
  viewAllLink = "/products",
}) {
  return (
    <div className="new-arrivals-header">
      <div className="new-arrivals-heading-left">
        <span className="new-arrivals-badge">{badgeText}</span>
        <h2 className="new-arrivals-title">
          {title} <span>{highlightText}</span>
        </h2>
      </div>

      <div className="new-arrivals-heading-right">
        <p className="new-arrivals-desc">{description}</p>
        {viewAllLink && (
          <Link href={viewAllLink} className="new-arrivals-view-btn">
            View All
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
        )}
      </div>
    </div>
  );
}