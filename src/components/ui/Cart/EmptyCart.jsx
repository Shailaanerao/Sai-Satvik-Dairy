import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="empty-cart">

      <div className="empty-cart-icon">
        🛒
      </div>

      <h2>
        Your Cart is Empty
      </h2>

      <p>
        Looks like you haven't added any
        dairy products yet.
      </p>

      <Link
        href="/products"
        className="continue-shopping-btn"
      >
        Explore Products

        <span>
          →
        </span>

      </Link>

    </div>
  );
}