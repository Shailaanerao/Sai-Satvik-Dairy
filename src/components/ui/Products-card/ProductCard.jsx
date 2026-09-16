"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const [imageSrc, setImageSrc] = useState(
    product?.image || product?.images?.[0] || "/logo.jpeg"
  );

  if (!product) {
    return null;
  }

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    addToCart(product);
  };

  const rating = Number(product.rating || 0);
  const reviewCount = Number(product.reviewCount || 0);

  return (
    <article className="products-card">
      <Link
        href={`/products/${product.id}`}
        className="products-card-image"
      >
        {product.badge && (
          <span className="products-card-badge">{product.badge}</span>
        )}

        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImageSrc("/logo.jpeg")}
        />

        <span className="products-card-view">View Product</span>
      </Link>

      <div className="products-card-content">
        <span className="products-card-category">
          {product.category}
        </span>

        <Link
          href={`/products/${product.id}`}
          className="products-card-name"
        >
          {product.name}
        </Link>

        <p className="products-card-description">
          {product.description}
        </p>

        <div className="products-card-rating">
          <span className="rating-stars" aria-label={`${rating} out of 5`}>
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
          </span>

          <strong>{rating.toFixed(1)}</strong>
          <span>({reviewCount})</span>
        </div>

        <div className="products-card-footer">
          <div className="products-card-price">
            <strong>₹{product.price}</strong>

            {product.oldPrice && <del>₹{product.oldPrice}</del>}

            <span>/ {product.unit}</span>
          </div>

          <button
            type="button"
            className="products-card-add"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </article>
  );
}