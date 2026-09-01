import React from "react";

export default function CategoryHero({
  badge = "EXPLORE BY TYPE",
  title = "Our Dairy Categories",
  description = "Browse our wholesome selection of farm-fresh, chemical-free Vedic dairy goods.",
}) {
  return (
    <div className="category-hero">
      <span className="category-hero-badge">{badge}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}