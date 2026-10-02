"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import ProductGrid from "@/components/ui/Products-card/ProductGrid";
import { useCart } from "@/app/context/CartContext";
import useProducts from "@/hooks/useProducts";

import "./products.css";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { addToCart } = useCart();

  const {
    products,
    categories: apiCategories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  } = useProducts();

  const [sortBy, setSortBy] = useState("featured");

  /*
   * Read filters directly from the URL.
   */
  const categoryFromUrl =
    searchParams.get("category");

  const searchFromUrl =
    searchParams.get("search") || "";

  /*
   * Build the list of categories returned
   * from the backend.
   */
  const categories = useMemo(
    () => [
      {
        id: "all",
        name: "All Products",
        slug: "all",
      },
      ...(Array.isArray(apiCategories)
        ? apiCategories
        : []),
    ],
    [apiCategories]
  );

  /*
   * Check whether the URL category exists
   * in the backend category list.
   */
  const validCategory =
    categoryFromUrl === "all" ||
    apiCategories.some(
      (category) =>
        category.slug === categoryFromUrl
    );

  const selectedCategory =
    validCategory && categoryFromUrl
      ? categoryFromUrl
      : "all";

  /*
   * Fetch categories once.
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories();
      } catch (requestError) {
        console.error(
          "Failed to load categories:",
          requestError
        );
      }
    };

    loadCategories();
  }, [fetchCategories]);

  /*
   * Fetch products based on the current
   * category and search query.
   *
   * This is intentionally the ONLY product
   * loading effect on this page so we do not
   * create competing requests.
   */
  useEffect(() => {
    const loadProducts = async () => {
      const params = new URLSearchParams();

      if (selectedCategory !== "all") {
        params.set(
          "category",
          selectedCategory
        );
      }

      if (searchFromUrl.trim()) {
        params.set(
          "search",
          searchFromUrl.trim()
        );
      }

      const queryString = params.toString();

      try {
        await fetchProducts(
          queryString
            ? `?${queryString}`
            : ""
        );
      } catch (requestError) {
        console.error(
          "Failed to load products:",
          requestError
        );
      }
    };

    loadProducts();
  }, [
    selectedCategory,
    searchFromUrl,
    fetchProducts,
  ]);

  /*
   * Convert backend product structure into
   * the structure expected by ProductGrid.
   */
  const normalizedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,

      image:
        product.image_url ||
        product.image ||
        product.images?.[0] ||
        "/logo.jpeg",

      images:
        Array.isArray(product.images) &&
        product.images.length > 0
          ? product.images
          : [
              product.image_url ||
                product.image ||
                "/logo.jpeg",
            ],

      categorySlug:
        product.categories?.slug ||
        product.categorySlug ||
        "",

      categoryName:
        product.categories?.name ||
        product.categoryName ||
        "",

      oldPrice:
        product.old_price ??
        product.oldPrice ??
        null,

      featured:
        Boolean(product.featured),

      rating:
        Number(product.rating) || 0,

      reviewCount:
        Number(product.review_count) || 0,
    }));
  }, [products]);

  /*
   * Sort products on the client.
   */
  const filteredProducts = useMemo(() => {
    const result = [...normalizedProducts];

    if (sortBy === "price-low") {
      result.sort(
        (first, second) =>
          Number(first.price) -
          Number(second.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (first, second) =>
          Number(second.price) -
          Number(first.price)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (first, second) =>
          Number(second.rating) -
          Number(first.rating)
      );
    }

    if (sortBy === "featured") {
      result.sort(
        (first, second) =>
          Number(second.featured) -
            Number(first.featured) ||
          Number(second.rating) -
            Number(first.rating)
      );
    }

    return result;
  }, [
    normalizedProducts,
    sortBy,
  ]);

  /*
   * Change category by updating the URL.
   */
  const handleCategoryChange =
    (categorySlug) => {
      const params =
        new URLSearchParams(
          searchParams.toString()
        );

      if (categorySlug === "all") {
        params.delete("category");
      } else {
        params.set(
          "category",
          categorySlug
        );
      }

      const queryString =
        params.toString();

      router.push(
        queryString
          ? `${pathname}?${queryString}`
          : pathname
      );
    };

  return (
    <>
      <main className="products-page">
        <section className="products-hero">
          <div className="products-hero-inner">
            <span className="products-eyebrow">
              FROM OUR FARM
            </span>

            <h1>
              Fresh Dairy Products
            </h1>

            <p>
              Discover fresh, pure and
              wholesome dairy products
              made with care for your
              family.
            </p>
          </div>
        </section>

        <section className="products-container">
          <div className="products-toolbar">
            <div className="category-tabs">
              {categories.map(
                (category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={
                      selectedCategory ===
                      category.slug
                        ? "category-tab active"
                        : "category-tab"
                    }
                    onClick={() =>
                      handleCategoryChange(
                        category.slug
                      )
                    }
                  >
                    {category.name}
                  </button>
                )
              )}
            </div>

            <div className="products-sort">
              <span>
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                aria-label="Sort products"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>
              </select>
            </div>
          </div>

          <div className="products-result-header">
            <div>
              <span className="result-eyebrow">
                OUR PURE RANGE
              </span>

              <h2>
                {searchFromUrl
                  ? `Search results for "${searchFromUrl}"`
                  : selectedCategory !== "all"
                    ? `${
                        categories.find(
                          (category) =>
                            category.slug ===
                            selectedCategory
                        )?.name ||
                        "Shop Fresh"
                      } Products`
                    : "Shop Fresh"}
              </h2>
            </div>

            <span className="result-count">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} products`}
            </span>
          </div>

          {error && (
            <p>
              Unable to load products.
              Please try again.
            </p>
          )}

          {!loading &&
            !error &&
            filteredProducts.length ===
              0 && (
              <p>
                No products found.
              </p>
            )}

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