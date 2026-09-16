import Link from "next/link";

import ProductGrid from "../Products-card/ProductGrid";
import { products } from "@/app/data/productsData";

import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-heading">
          <div className="featured-heading-left">
            <span className="featured-label">FROM OUR FARM</span>

            <h2 className="featured-title">
              Featured <span>Products</span>
            </h2>
          </div>

          <p className="featured-description">
            Discover our selection of fresh, pure and wholesome dairy
            products made with care for your family.
          </p>
        </div>

        <ProductGrid
          products={featuredProducts}
          className="featured-grid"
          emptyTitle="Featured products are coming soon"
          emptyMessage="Please check back shortly."
        />

        <div className="featured-footer">
          <Link href="/products" className="view-products-btn">
            View All Products

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