"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import ProductGrid from "@/components/ui/Products-card/ProductGrid";
import SubscriptionCard from "@/components/ui/SubscriptionCard/SubscriptionCard";
import { useCart } from "@/app/context/CartContext";
import { getProductById, products } from "@/app/data/productsData";

import "./products-details.css";

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const productImages = product?.images?.length
    ? product.images
    : [product?.image || "/logo.jpeg"];

  const similarProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.categorySlug === product.categorySlug
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-not-found">
          <div>
            <span>404</span>
            <h1>Product Not Found</h1>
            <p>The product you are looking for does not exist.</p>

            <Link href="/products">Back to Products</Link>
          </div>
        </main>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const handleSubscribe = (subscription) => {
    console.log("Subscription selected:", subscription);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    if (!reviewTitle.trim() || !reviewComment.trim()) {
      return;
    }

    setReviews((currentReviews) => [
      {
        id: Date.now(),
        name: "Priya Sharma",
        rating: reviewRating,
        date: "Just now",
        title: reviewTitle,
        comment: reviewComment,
      },
      ...currentReviews,
    ]);

    setReviewTitle("");
    setReviewComment("");
    setReviewRating(5);
  };

  const reviewCount = reviews.length || product.reviewCount || 0;

  return (
    <>
      <Navbar />

      <main className="product-details-page">
        <div className="product-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        <section className="product-main-section">
          <div className="product-gallery">
            <div className="product-main-image">
              {product.badge && (
                <span className="product-detail-badge">
                  {product.badge}
                </span>
              )}

              <img
                src={productImages[activeImage]}
                alt={product.name}
              />
            </div>

            {productImages.length > 1 && (
              <div className="product-thumbnails">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={
                      activeImage === index
                        ? "product-thumbnail active"
                        : "product-thumbnail"
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-information">
            <span className="product-detail-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="product-detail-rating">
              <span className="detail-stars">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>

              <strong>{product.rating}</strong>
              <span>{reviewCount} reviews</span>
            </div>

            <p className="product-long-description">
              {product.longDescription}
            </p>

            <div className="product-detail-price">
              <strong>₹{product.price}</strong>

              {product.oldPrice && <del>₹{product.oldPrice}</del>}

              <span>/ {product.unit}</span>
            </div>

            <div className="fresh-delivery">
              <div className="fresh-delivery-icon">✓</div>

              <div>
                <strong>Farm Fresh Delivery</strong>
                <p>Freshly prepared and delivered to your doorstep.</p>
              </div>
            </div>

            <div className="quantity-row">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  −
                </button>

                <strong>{quantity}</strong>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-action-buttons">
              <button
                type="button"
                className="detail-add-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="detail-buy-button"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>

        <SubscriptionCard
          product={product}
          onSubscribe={handleSubscribe}
        />

        <section className="detail-section">
          <div className="detail-section-heading">
            <span>GOODNESS INSIDE</span>
            <h2>Nutrition Information</h2>
            <p>Nutritional values per serving.</p>
          </div>

          <div className="nutrition-card">
            {product.nutrition.map((item) => (
              <div key={item.name} className="nutrition-item">
                <span>{item.name}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <div className="detail-section-heading">
            <span>CUSTOMER LOVE</span>
            <h2>Customer Reviews</h2>
            <p>See what customers say about this product.</p>
          </div>

          <div className="reviews-list">
            {reviews.map((review) => (
              <article key={review.id} className="review-card">
                <div className="review-card-header">
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>

                  <span className="detail-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>

                <h3>{review.title}</h3>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Write a Review</h3>

            <select
              value={reviewRating}
              onChange={(event) =>
                setReviewRating(Number(event.target.value))
              }
              aria-label="Review rating"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={reviewTitle}
              onChange={(event) => setReviewTitle(event.target.value)}
              placeholder="Review title"
            />

            <textarea
              value={reviewComment}
              onChange={(event) => setReviewComment(event.target.value)}
              placeholder="Share your experience"
              rows="4"
            />

            <button type="submit">Submit Review</button>
          </form>
        </section>

        {similarProducts.length > 0 && (
          <section className="detail-section">
            <div className="detail-section-heading">
              <span>YOU MAY ALSO LIKE</span>
              <h2>Similar Products</h2>
              <p>Explore more fresh products from this category.</p>
            </div>

            <ProductGrid
              products={similarProducts}
              className="products-grid"
            />
          </section>
        )}
      </main>
    </>
  );
}