"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/app/context/CartContext";

import "./ProductCard.css";

export default function ProductCard({
  product,
  onAddToCart,
}) {
  const { addToCart } = useCart();

  const [imageLoadFailed, setImageLoadFailed] =
    useState(false);

  const [showAddedMessage, setShowAddedMessage] =
    useState(false);

  useEffect(() => {
    if (!showAddedMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setShowAddedMessage(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, [showAddedMessage]);

  if (!product) {
    return null;
  }

  const productImage =
    product.image ||
    product.image_url ||
    product.images?.[0] ||
    "";

  const imageSrc =
    imageLoadFailed || !productImage
      ? "/logo.jpeg"
      : productImage;

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }

    setShowAddedMessage(true);
  };

  const rating = Number(
    product.rating || 0
  );

  const reviewCount = Number(
    product.reviewCount ??
      product.review_count ??
      0
  );

  return (
    <article className="products-card">
      <Link
        href={`/products/${product.id}`}
        className="products-card-image"
      >
        {product.badge && (
          <span className="products-card-badge">
            {product.badge}
          </span>
        )}

        <Image
          src={imageSrc}
          alt={product.name}
          fill
          unoptimized
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            25vw
          "
          style={{
            objectFit: "cover",
          }}
          onError={() => {
            setImageLoadFailed(true);
          }}
        />

        <span className="products-card-view">
          View Product
        </span>
      </Link>

      <div className="products-card-content">
        <span className="products-card-category">
          {product.categoryName ||
            product.category ||
            product.categories?.name ||
            ""}
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
          <span
            className="rating-stars"
            aria-label={`${rating} out of 5`}
          >
            {"★".repeat(
              Math.min(
                5,
                Math.max(
                  0,
                  Math.round(rating)
                )
              )
            )}

            {"☆".repeat(
              5 -
                Math.min(
                  5,
                  Math.max(
                    0,
                    Math.round(rating)
                  )
                )
            )}
          </span>

          <strong>
            {rating.toFixed(1)}
          </strong>

          <span>
            ({reviewCount})
          </span>
        </div>

        <div className="products-card-footer">
          <div className="products-card-price">
            <strong>
              ₹{product.price}
            </strong>

            {(product.oldPrice ??
              product.old_price) ? (
              <del>
                ₹
                {product.oldPrice ??
                  product.old_price}
              </del>
            ) : null}

            <span>
              / {product.unit}
            </span>
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

        {showAddedMessage && (
          <div
            className="products-card-added-message"
            role="status"
            aria-live="polite"
          >
            ✓ Product added to cart
          </div>
        )}
      </div>
    </article>
  );
}