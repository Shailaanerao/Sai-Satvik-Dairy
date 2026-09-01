import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(category.slug)}`}
      className="category-card"
    >
      <div className="category-image-wrap">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="category-img"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="category-content">
        <div className="category-heading-row">
          <h3>{category.name}</h3>
          <span className="category-subtext-pill">{category.subtext}</span>
        </div>
        <p>{category.description}</p>
        <span className="category-count">Explore Products →</span>
      </div>
    </Link>
  );
}