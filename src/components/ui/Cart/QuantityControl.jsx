export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="quantity-control">

      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>

    </div>
  );
}