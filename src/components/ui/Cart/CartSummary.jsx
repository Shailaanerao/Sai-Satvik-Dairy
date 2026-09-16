import Link from "next/link";

export default function CartSummary({
  subtotal,
  deliveryFee,
  discount,
  total,
  freeDeliveryThreshold = 500,
  checkoutHref = "/checkout",
  actionLabel = "Proceed to Checkout",
  showCheckoutAction = true,
}) {
  const amountForFreeDelivery = Math.max(
    0,
    freeDeliveryThreshold - subtotal
  );

  return (
    <aside className="cart-summary">
      <div className="summary-header">
        <h2>Order Summary</h2>
        <span>₹</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>₹{subtotal}</strong>
      </div>

      <div className="summary-row">
        <span>Delivery</span>

        <strong
          className={deliveryFee === 0 ? "free-delivery" : ""}
        >
          {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
        </strong>
      </div>

      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Discount</span>
          <strong>-₹{discount}</strong>
        </div>
      )}

      <div className="free-delivery-message">
        {subtotal >= freeDeliveryThreshold
          ? "✓ You qualify for free sunrise delivery"
          : `Add ₹${amountForFreeDelivery} more for free delivery`}
      </div>

      <div className="summary-divider" />

      <div className="summary-total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>

      {showCheckoutAction && (
        <Link href={checkoutHref} className="checkout-btn">
          {actionLabel}
          <span>→</span>
        </Link>
      )}

      <div className="secure-checkout">
        🔒 100% Safe & Encrypted Checkout
      </div>
    </aside>
  );
}