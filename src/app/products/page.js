"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import ProductGrid from "@/components/ui/Products-card/ProductGrid";
import { useCart } from "@/app/context/CartContext";
import { categoriesData } from "@/app/data/categoriesData";
import { products } from "@/app/data/productsData";

import "./products.css";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    const validCategory = categoriesData.some(
      (category) => category.slug === categoryFromUrl
    );

    setSelectedCategory(validCategory ? categoryFromUrl : "all");
  }, [searchParams]);

  const categories = [
    {
      id: "all",
      name: "All Products",
      slug: "all",
    },
    ...categoriesData,
  ];

  const filteredProducts = useMemo(() => {
    const result =
      selectedCategory === "all"
        ? [...products]
        : products.filter(
            (product) => product.categorySlug === selectedCategory
          );

    if (sortBy === "price-low") {
      result.sort((first, second) => first.price - second.price);
    }

    if (sortBy === "price-high") {
      result.sort((first, second) => second.price - first.price);
    }

    if (sortBy === "rating") {
      result.sort((first, second) => second.rating - first.rating);
    }

    if (sortBy === "featured") {
      result.sort(
        (first, second) =>
          Number(second.featured) - Number(first.featured) ||
          second.rating - first.rating
      );
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <>
      <Navbar />

      <main className="products-page">
        <section className="products-hero">
          <div className="products-hero-inner">
            <span className="products-eyebrow">FROM OUR FARM</span>

            <h1>Fresh Dairy Products</h1>

            <p>
              Discover fresh, pure and wholesome dairy products made with
              care for your family.
            </p>
          </div>
        </section>

        <section className="products-container">
          <div className="products-toolbar">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={
                    selectedCategory === category.slug
                      ? "category-tab active"
                      : "category-tab"
                  }
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="products-sort">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="products-result-header">
            <div>
              <span className="result-eyebrow">OUR PURE RANGE</span>
              <h2>Shop Fresh</h2>
            </div>

            <span className="result-count">
              {filteredProducts.length} products
            </span>
          </div>

          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </section>
      </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}