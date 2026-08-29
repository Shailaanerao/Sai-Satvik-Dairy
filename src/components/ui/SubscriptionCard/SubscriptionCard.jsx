import Link from "next/link";
import "./SubscriptionCard.css";

export default function SubscriptionCard({
  title,
  price,
  period,
  description,
  features,
  popular = false,
}) {
  return (
    <div className={`subscription-card ${popular ? "popular" : ""}`}>

      {/* Popular Badge */}
      {popular && (
        <div className="popular-badge">
          MOST POPULAR
        </div>
      )}

      {/* Card Header */}
      <div className="subscription-card-header">

        <h3 className="subscription-title">
          {title}
        </h3>

        <p className="subscription-description">
          {description}
        </p>

      </div>


      {/* Price */}
      <div className="subscription-price">

        <span className="price">
          {price}
        </span>

        <span className="period">
          {period}
        </span>

      </div>


      {/* Features */}
      <div className="subscription-features">

        {features.map((feature, index) => (
          <div
            className="subscription-feature"
            key={index}
          >

            <span className="feature-check">
              ✓
            </span>

            <span>
              {feature}
            </span>

          </div>
        ))}

      </div>


      {/* Button */}
      <Link
        href="/contact"
        className="subscription-btn"
      >
        Choose Plan
        <span>→</span>
      </Link>

    </div>
  );
}