"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ProductGrid from "@/components/ui/Products-card/ProductGrid";
import SubscriptionCard from "@/components/ui/SubscriptionCard/SubscriptionCard";
import { useCart } from "@/app/context/CartContext";
import useProducts from "@/hooks/useProducts";

import "./products-details.css";

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);

  const router = useRouter();

  const { addToCart } = useCart();

  const {
    product: apiProduct,
    products,
    loading,
    error,
    fetchProduct,
    fetchProducts,
  } = useProducts();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  /*
   * Fetch the selected product from the backend.
   */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProduct(id);
      } catch (requestError) {
        console.error(
          "Failed to load product:",
          requestError
        );
      }
    };

    loadProduct();
  }, [id, fetchProduct]);

  /*
   * Convert the backend product structure
   * into the structure expected by the existing UI.
   *
   * This is derived data, so useMemo is used
   * instead of setting product state inside an effect.
   */
  const product = useMemo(() => {
    if (!apiProduct) {
      return null;
    }

    return {
      ...apiProduct,

      image:
        apiProduct.image_url ||
        apiProduct.image ||
        apiProduct.images?.[0] ||
        "/logo.jpeg",

      images:
        Array.isArray(apiProduct.images) &&
        apiProduct.images.length > 0
          ? apiProduct.images
          : [
              apiProduct.image_url ||
                apiProduct.image ||
                "/logo.jpeg",
            ],

      category:
        apiProduct.categories?.name ||
        apiProduct.category ||
        "",

      categorySlug:
        apiProduct.categories?.slug ||
        apiProduct.categorySlug ||
        "",

      longDescription:
        apiProduct.long_description ||
        apiProduct.longDescription ||
        apiProduct.description ||
        "",

      oldPrice:
        apiProduct.old_price ??
        apiProduct.oldPrice ??
        null,

      rating:
        Number(apiProduct.rating) || 0,

      reviewCount:
        Number(apiProduct.review_count) || 0,

      stockQuantity:
        Number(apiProduct.stock_quantity) || 0,

      /*
       * Nutrition and reviews are not stored
       * in the current products table yet.
       */
      nutrition: Array.isArray(
        apiProduct.nutrition
      )
        ? apiProduct.nutrition
        : [],

      reviews: Array.isArray(
        apiProduct.reviews
      )
        ? apiProduct.reviews
        : [],
    };
  }, [apiProduct]);

  /*
   * Fetch products from the same category
   * for the Similar Products section.
   */
  useEffect(() => {
    if (!product?.categorySlug) {
      return;
    }

    const loadSimilarProducts = async () => {
      try {
        await fetchProducts(
          `?category=${encodeURIComponent(
            product.categorySlug
          )}`
        );
      } catch (requestError) {
        console.error(
          "Failed to load similar products:",
          requestError
        );
      }
    };

    loadSimilarProducts();
  }, [
    product?.categorySlug,
    fetchProducts,
  ]);

  /*
   * Convert similar products into the structure
   * expected by ProductGrid.
   */
  const similarProducts = products
    .filter(
      (item) =>
        String(item.id) !== String(product?.id)
    )
    .slice(0, 4)
    .map((item) => ({
      ...item,

      image:
        item.image_url ||
        item.image ||
        item.images?.[0] ||
        "/logo.jpeg",

      images:
        Array.isArray(item.images) &&
        item.images.length > 0
          ? item.images
          : [
              item.image_url ||
                item.image ||
                "/logo.jpeg",
            ],

      category:
        item.categories?.name ||
        item.category ||
        "",

      categorySlug:
        item.categories?.slug ||
        item.categorySlug ||
        "",

      longDescription:
        item.long_description ||
        item.longDescription ||
        item.description ||
        "",

      oldPrice:
        item.old_price ??
        item.oldPrice ??
        null,

      rating:
        Number(item.rating) || 0,

      reviewCount:
        Number(item.review_count) || 0,

      featured:
        Boolean(item.featured),
    }));

  /*
   * Loading state.
   */
  if (loading && !product) {
    return (
      <>

        <main className="product-not-found">
          <div>
            <span>...</span>

            <h1>
              Loading Product
            </h1>

            <p>
              Please wait while we load the
              product details.
            </p>
          </div>
        </main>
      </>
    );
  }

  /*
   * API error state.
   */
  if (error && !product) {
    return (
      <>

        <main className="product-not-found">
          <div>
            <span>!</span>

            <h1>
              Unable to Load Product
            </h1>

            <p>
              We could not load this product.
              Please try again.
            </p>

            <Link href="/products">
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  /*
   * Product not found.
   */
  if (!product) {
    return (
      <>

        <main className="product-not-found">
          <div>
            <span>404</span>

            <h1>
              Product Not Found
            </h1>

            <p>
              The product you are looking for
              does not exist.
            </p>

            <Link href="/products">
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const productImages =
    product.images?.length
      ? product.images
      : [product.image || "/logo.jpeg"];

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      quantity
    );

    router.push("/cart");
  };

  const handleSubscribe = (subscription) => {
    console.log(
      "Subscription selected:",
      subscription
    );
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    if (
      !reviewTitle.trim() ||
      !reviewComment.trim()
    ) {
      return;
    }

    setReviews(
      (currentReviews) => [
        {
          id: Date.now(),
          name: "You",
          rating: reviewRating,
          date: "Just now",
          title: reviewTitle,
          comment: reviewComment,
        },
        ...currentReviews,
      ]
    );

    setReviewTitle("");
    setReviewComment("");
    setReviewRating(5);
  };

  const reviewCount =
    reviews.length ||
    product.reviewCount ||
    0;

  const maxQuantity =
    product.stockQuantity > 0
      ? product.stockQuantity
      : 99;

  return (
    <>

      <main className="product-details-page">
        <div className="product-breadcrumb">
          <Link href="/">
            Home
          </Link>

          <span>/</span>

          <Link href="/products">
            Products
          </Link>

          <span>/</span>

          <strong>
            {product.name}
          </strong>
        </div>

        <section className="product-main-section">
          <div className="product-gallery">
            <div className="product-main-image">
              {product.badge && (
                <span className="product-detail-badge">
                  {product.badge}
                </span>
              )}

              <Image
                src={
                  productImages[
                    activeImage
                  ]
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                }}
                priority
              />
            </div>

            {productImages.length > 1 && (
              <div className="product-thumbnails">
                {productImages.map(
                  (image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      className={
                        activeImage === index
                          ? "product-thumbnail active"
                          : "product-thumbnail"
                      }
                      onClick={() =>
                        setActiveImage(
                          index
                        )
                      }
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        fill
                        sizes="80px"
                        style={{
                          objectFit:
                            "cover",
                        }}
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div className="product-information">
            <span className="product-detail-category">
              {product.category}
            </span>

            <h1>
              {product.name}
            </h1>

            <div className="product-detail-rating">
              <span className="detail-stars">
                {"★".repeat(
                  Math.round(
                    product.rating
                  )
                )}

                {"☆".repeat(
                  5 -
                    Math.round(
                      product.rating
                    )
                )}
              </span>

              <strong>
                {product.rating}
              </strong>

              <span>
                {reviewCount} reviews
              </span>
            </div>

            <p className="product-long-description">
              {product.longDescription}
            </p>

            <div className="product-detail-price">
              <strong>
                ₹{product.price}
              </strong>

              {product.oldPrice && (
                <del>
                  ₹{product.oldPrice}
                </del>
              )}

              <span>
                / {product.unit}
              </span>
            </div>

            <div className="fresh-delivery">
              <div className="fresh-delivery-icon">
                ✓
              </div>

              <div>
                <strong>
                  Farm Fresh Delivery
                </strong>

                <p>
                  Freshly prepared and
                  delivered to your
                  doorstep.
                </p>
              </div>
            </div>

            <div className="quantity-row">
              <span>
                Quantity
              </span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      (current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                    )
                  }
                >
                  −
                </button>

                <strong>
                  {quantity}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      (current) =>
                        Math.min(
                          maxQuantity,
                          current + 1
                        )
                    )
                  }
                  disabled={
                    quantity >=
                    maxQuantity
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-action-buttons">
              <button
                type="button"
                className="detail-add-button"
                onClick={
                  handleAddToCart
                }
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="detail-buy-button"
                onClick={
                  handleBuyNow
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>

        <SubscriptionCard
          product={product}
          onSubscribe={
            handleSubscribe
          }
        />

        <section className="detail-section">
          <div className="detail-section-heading">
            <span>
              GOODNESS INSIDE
            </span>

            <h2>
              Nutrition Information
            </h2>

            <p>
              Nutritional values per
              serving.
            </p>
          </div>

          {product.nutrition.length > 0 ? (
            <div className="nutrition-card">
              {product.nutrition.map(
                (item) => (
                  <div
                    key={item.name}
                    className="nutrition-item"
                  >
                    <span>
                      {item.name}
                    </span>

                    <strong>
                      {item.value}
                    </strong>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="nutrition-card">
              <div className="nutrition-item">
                <span>
                  Nutrition information
                </span>

                <strong>
                  Coming soon
                </strong>
              </div>
            </div>
          )}
        </section>

        <section className="detail-section">
          <div className="detail-section-heading">
            <span>
              CUSTOMER LOVE
            </span>

            <h2>
              Customer Reviews
            </h2>

            <p>
              See what customers say
              about this product.
            </p>
          </div>

          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map(
                (review) => (
                  <article
                    key={review.id}
                    className="review-card"
                  >
                    <div className="review-card-header">
                      <div>
                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          {review.date}
                        </span>
                      </div>

                      <span className="detail-stars">
                        {"★".repeat(
                          review.rating
                        )}

                        {"☆".repeat(
                          5 -
                            review.rating
                        )}
                      </span>
                    </div>

                    <h3>
                      {review.title}
                    </h3>

                    <p>
                      {review.comment}
                    </p>
                  </article>
                )
              )
            ) : (
              <p>
                No reviews yet. Be the
                first to review this
                product.
              </p>
            )}
          </div>

          <form
            className="review-form"
            onSubmit={
              handleReviewSubmit
            }
          >
            <h3>
              Write a Review
            </h3>

            <select
              value={
                reviewRating
              }
              onChange={(event) =>
                setReviewRating(
                  Number(
                    event.target.value
                  )
                )
              }
              aria-label="Review rating"
            >
              {[5, 4, 3, 2, 1].map(
                (rating) => (
                  <option
                    key={rating}
                    value={rating}
                  >
                    {rating} Star
                    {rating > 1
                      ? "s"
                      : ""}
                  </option>
                )
              )}
            </select>

            <input
              type="text"
              value={
                reviewTitle
              }
              onChange={(event) =>
                setReviewTitle(
                  event.target.value
                )
              }
              placeholder="Review title"
            />

            <textarea
              value={
                reviewComment
              }
              onChange={(event) =>
                setReviewComment(
                  event.target.value
                )
              }
              placeholder="Share your experience"
              rows="4"
            />

            <button type="submit">
              Submit Review
            </button>
          </form>
        </section>

        {similarProducts.length > 0 && (
          <section className="detail-section">
            <div className="detail-section-heading">
              <span>
                YOU MAY ALSO LIKE
              </span>

              <h2>
                Similar Products
              </h2>

              <p>
                Explore more fresh
                products from this
                category.
              </p>
            </div>

            <ProductGrid
              products={
                similarProducts
              }
              className="products-grid"
            />
          </section>
        )}
      </main>
    </>
  );
}