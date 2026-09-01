"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import "./ProductCard.css";

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  description,
  size,
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(image || "/logo.jpeg");

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      category,
      price,
      image: imgSrc,
      description,
      size,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        <Image
          src={imgSrc}
          alt={name || "Dairy Product"}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 20vw"
          className="product-image"
          onError={() => setImgSrc("/logo.jpeg")}
        />

        {/* Category */}
        {category && (
          <span className="product-category">
            {category}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
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

        {/* Price + Add */}
        <div className="product-bottom">
          <div className="product-price">
            {price}
          </div>

          <button
            type="button"
            className={`product-add-btn ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
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
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}