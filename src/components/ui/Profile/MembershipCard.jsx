"use client";

export default function MembershipCard({
  name,
  price,
  features,
  current = false,
  onSelect,
}) {
  return (
    <div
      className={`membership-card ${
        current ? "membership-current" : ""
      }`}
    >
      {current && (
        <span className="current-plan">
          Current Plan
        </span>
      )}

      <h3>{name}</h3>

      <div className="membership-price">
        ₹{price}
        <span>/ year</span>
      </div>

      <ul>
        {features.map((feature, index) => (
          <li key={index}>
            <span>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="membership-button"
        onClick={onSelect}
        disabled={current}
      >
        {current
          ? "Active Plan"
          : "Choose Plan"}
      </button>
    </div>
  );
}