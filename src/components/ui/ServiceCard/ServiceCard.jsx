import "./ServiceCard.css";

export default function ServiceCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="service-card">

      <div className="service-icon">
        {icon}
      </div>

      <div className="service-content">

        <h3 className="service-title">
          {title}
        </h3>

        <p className="service-description">
          {description}
        </p>

        <button
          type="button"
          className="service-btn"
        >
          Learn More
          <span>→</span>
        </button>

      </div>

    </div>
  );
}