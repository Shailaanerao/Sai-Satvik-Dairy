import Link from "next/link";

import ProductGrid from "../Products-card/ProductGrid";
import { products } from "@/app/data/productsData";

import "./BestSellers.css";

export default function BestSellers() {
  const bestSellingProducts = products.filter(
    (product) => product.bestSeller
  );

  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">
        <div className="best-sellers-heading">
          <div className="best-sellers-heading-left">
            <span className="best-sellers-label">
              CUSTOMER FAVORITES
            </span>

            <h2 className="best-sellers-title">
              Our <span>Best Sellers</span>
            </h2>
          </div>

          <p className="best-sellers-description">
            Loved by families every day, these are some of our most popular
            dairy products.
          </p>
        </div>

        <ProductGrid
          products={bestSellingProducts}
          className="best-sellers-grid"
          emptyTitle="Best sellers are coming soon"
          emptyMessage="Please check back shortly."
        />

        <div className="best-sellers-footer">
          <Link href="/products" className="best-sellers-btn">
            Explore All Products

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}