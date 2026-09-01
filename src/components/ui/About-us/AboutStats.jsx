import React from "react";

const defaultStats = [
  { value: "100%", label: "Pure Desi A2 Milk", detail: "Single-breed native cows" },
  { value: "5,000+", label: "Happy Families", detail: "Served across the region" },
  { value: "0%", label: "Adulteration & Chemicals", detail: "Zero hormones or additives" },
  { value: "7:00 AM", label: "Daily Dawn Delivery", detail: "Freshness within 3 hours" },
];

export default function AboutStats({ stats = defaultStats }) {
  return (
    <section className="about-stats-section">
      <div className="about-stats-grid">
        {stats.map((item, idx) => (
          <div className="stat-card" key={idx}>
            <strong className="stat-value">{item.value}</strong>
            <span className="stat-label">{item.label}</span>
            <p className="stat-detail">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}