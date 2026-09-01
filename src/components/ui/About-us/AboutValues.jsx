import React from "react";

const defaultValues = [
  {
    icon: "🌱",
    title: "100% Organic Fodder",
    desc: "Cows are fed pesticide-free grass, medicinal herbs, and fresh seasonal green greens.",
  },
  {
    icon: "🍯",
    title: "Bilona Method",
    desc: "Our ghee is churned bi-directionally from cultured whole milk curd in earthen pots.",
  },
  {
    icon: "❄️",
    title: "Zero Heat Damage",
    desc: "Chilled instantly to 4°C directly post-milking to preserve vital enzymes and beneficial probiotics.",
  },
  {
    icon: "🧪",
    title: "26+ Daily Quality Tests",
    desc: "Tested rigorously for antibiotics, heavy metals, toxins, and synthetic additives.",
  },
];

export default function AboutValues({
  eyebrow = "WHY FAMILIES TRUST US",
  title = "Our Core Principles",
  subtitle = "We preserve the golden standard of unadulterated dairy craftsmanship.",
  values = defaultValues,
}) {
  return (
    <section className="about-values-section">
      <div className="values-container">
        <div className="values-header">
          <span className="values-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="values-grid">
          {values.map((val, idx) => (
            <div className="value-card" key={idx}>
              <div className="value-icon">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}