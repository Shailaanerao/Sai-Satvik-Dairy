import React from "react";

export default function AboutHero({
  badge = "OUR ROOTS & PASSION",
  title = "Pioneering Purity from Farm to Home",
  description = "We are reviving traditional Indian dairy wisdom—nurturing indigenous Gir & Desi cows with love, organic fodder, and absolute reverence.",
}) {
  return (
    <section className="about-hero">
      <div className="about-hero-content">
        <span className="about-badge">{badge}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}