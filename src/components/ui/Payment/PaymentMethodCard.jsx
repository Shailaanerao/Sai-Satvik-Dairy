export default function PaymentMethodCard({
  icon,
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`payment-method-card ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="payment-method-icon">
        {icon}
      </div>

      <div className="payment-method-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <input
        type="radio"
        checked={selected}
        onChange={onClick}
      />
    </button>
  );
}