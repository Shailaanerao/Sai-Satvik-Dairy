import Link from "next/link";

export default function CartSummary({
  subtotal,
  deliveryFee,
  discount,
  total,
}) {
  return (
    <aside className="cart-summary">

      {/* Header */}

      <div className="summary-header">

        <h2>
          Order Summary
        </h2>

        <span>
          ₹
        </span>

      </div>


      {/* Subtotal */}

      <div className="summary-row">

        <span>
          Subtotal
        </span>

        <strong>
          ₹{subtotal}
        </strong>

      </div>


      {/* Delivery */}

      <div className="summary-row">

        <span>
          Delivery
        </span>

        <strong
          className={
            deliveryFee === 0
              ? "free-delivery"
              : ""
          }
        >
          {deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`}
        </strong>

      </div>


      {/* Discount */}

      {discount > 0 && (

        <div className="summary-row discount-row">

          <span>
            Discount
          </span>

          <strong>
            -₹{discount}
          </strong>

        </div>

      )}


      {/* Free Delivery Message */}

      <div className="free-delivery-message">

        {subtotal >= 500 ? (
          <>
            ✓ You qualify for free delivery
          </>
        ) : (
          <>
            Add ₹{500 - subtotal} more
            for free delivery
          </>
        )}

      </div>


      {/* Divider */}

      <div className="summary-divider"></div>


      {/* Total */}

      <div className="summary-total">

        <span>
          Total
        </span>

        <strong>
          ₹{total}
        </strong>

      </div>


      {/* Checkout */}

      <Link
        href="/checkout"
        className="checkout-btn"
      >
        Proceed to Checkout

        <span>
          →
        </span>

      </Link>


      {/* Security */}

      <div className="secure-checkout">
        🔒 Secure & Safe Checkout
      </div>

    </aside>
  );
}