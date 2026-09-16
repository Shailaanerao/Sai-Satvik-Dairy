"use client";

export default function PaymentCard({
  type,
  number,
  expiry,
  isDefault = false,
  onRemove,
}) {
  return (
    <div className="payment-card">
      <div className="payment-icon">
        {type === "UPI" ? "UPI" : "💳"}
      </div>

      <div className="payment-details">
        <strong>{type}</strong>

        <span>{number}</span>

        {expiry && (
          <small>
            Expires {expiry}
          </small>
        )}

        {isDefault && (
          <span className="default-badge">
            Default
          </span>
        )}
      </div>

      <button
        type="button"
        className="remove-payment"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}