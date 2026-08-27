import Image from "next/image";
import Link from "next/link";
import "./ProductCard.css";

export default function ProductCard({
  name,
  category,
  price,
  image,
  description,
}) {
  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-wrapper">

        <Image
          src={image}
          alt={name}
          fill
          className="product-image"
        />

        <span className="product-category">
          {category}
        </span>

        {/* Wishlist */}
        <button
          className="wishlist-btn"
          aria-label={`Add ${name} to wishlist`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />
          </svg>
        </button>

      </div>


      {/* Product Information */}
      <div className="product-info">

        <h3 className="product-name">
          {name}
        </h3>

        <p className="product-description">
          {description}
        </p>


        {/* Bottom Row */}
        <div className="product-bottom">

          <div className="product-price">
            {price}
          </div>

          <Link
            href="/products"
            className="product-add-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            Add
          </Link>

        </div>

      </div>

    </div>
  );
}