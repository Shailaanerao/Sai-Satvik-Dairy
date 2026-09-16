"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Carousel.css";

const slides = [
  {
    id: 1,
    badge: "100% Pure & Fresh",
    title: "Farm Fresh A2 Desi Cow Milk",
    description:
      "Directly sourced from grass-fed desi cows, delivered straight to your doorstep every morning.",
    buttonText: "Order Now",
    link: "/products",
    bgImage: "/banner/banner1.jpg",
  },
  {
    id: 2,
    badge: "Traditional Bilona Method",
    title: "Pure Vedic A2 Gir Cow Ghee",
    description:
      "Handcrafted using ancient wooden churns to preserve authentic aroma, texture, and nutrition.",
    buttonText: "Explore Ghee",
    link: "/products",
    bgImage: "/banner/banner2.jpg",
  },
  {
    id: 3,
    badge: "Daily Essentials",
    title: "Organic Paneer, Curd & Butter",
    description:
      "Rich in calcium and protein, prepared fresh daily without any chemicals or preservatives.",
    buttonText: "Subscribe Daily",
    link: "/subscription",
    bgImage: "/banner/banner3.jpg",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="carousel-slide">
            <Image
              src={slide.bgImage}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="slide-bg-image"
            />

            <div className="slide-overlay" />

            <div className="slide-content">
              <span className="slide-badge">
                {slide.badge}
              </span>

              <h2 className="slide-title">
                {slide.title}
              </h2>

              <p className="slide-description">
                {slide.description}
              </p>

              <Link
                href={slide.link}
                className="slide-btn"
              >
                {slide.buttonText}

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
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                  />

                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className="carousel-arrow arrow-prev"
        aria-label="Previous Slide"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="carousel-arrow arrow-next"
        aria-label="Next Slide"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={
              currentIndex === index ? "true" : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}