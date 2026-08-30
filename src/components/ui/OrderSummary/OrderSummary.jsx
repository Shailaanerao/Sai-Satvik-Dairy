export default function OrderSummary({
  items,
  subtotal,
  discount = 0,
  delivery = 0,
}) {
  const total = subtotal - discount + delivery;

  return (
    <div className="order-summary-box">
      <h2>Order Summary</h2>

      <div className="summary-items">
        {items.map((item) => (
          <div className="summary-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>
                {item.quantity} × ₹{item.price}
              </span>
            </div>

            <strong>
              ₹{item.price * item.quantity}
            </strong>
          </div>
        ))}
      </div>

      <div className="summary-line">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="summary-line">
        <span>Discount</span>
        <span className="discount-text">
          -₹{discount}
        </span>
      </div>

      <div className="summary-line">
        <span>Delivery</span>
        <span>
          {delivery === 0 ? "FREE" : `₹${delivery}`}
        </span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
}