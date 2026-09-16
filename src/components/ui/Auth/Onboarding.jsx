"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./Onboarding.css";

const onboardingData = [
  {
    id: 1,
    image: "/milk.jpg",
    number: "01",
    title: "Pure A2 Milk",
    highlight: "Every Morning",
    description:
      "Fresh A2 Desi Cow Milk sourced from trusted farms and delivered fresh to your doorstep.",
  },

  {
    id: 2,
    image: "/ghee.jpg",
    number: "02",
    title: "Traditional Goodness",
    highlight: "Made Naturally",
    description:
      "Authentic dairy products prepared using traditional methods while maintaining natural goodness.",
  },

  {
    id: 3,
    image: "/banner/banner3.jpg",
    number: "03",
    title: "Fresh From Farm",
    highlight: "To Your Family",
    description:
      "From our farms to your home, enjoy fresh, hygienic and quality dairy products every day.",
  },
];

export default function Onboarding() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const currentData =
    onboardingData[currentSlide];

  const handleNext = () => {
    if (
      currentSlide ===
      onboardingData.length - 1
    ) {
      router.replace("/welcome");
      return;
    }

    setCurrentSlide((previous) => previous + 1);
  };

  const handleSkip = () => {
    router.replace("/welcome");
  };

  return (
    <main className="onboarding-screen">

      <div className="onboarding-top">

        <div className="onboarding-mini-brand">
          Sai Satvik
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="onboarding-skip"
        >
          Skip
        </button>

      </div>

      <div className="onboarding-content">

        <div className="onboarding-image-card">

          <div className="onboarding-image-number">
            {currentData.number}
          </div>

          <Image
            src={currentData.image}
            alt={currentData.title}
            width={500}
            height={420}
            priority
            className="onboarding-image"
          />

        </div>

        <div className="onboarding-text">

          <span className="onboarding-small-title">
            SAI SATVIK DAIRY
          </span>

          <h1>
            {currentData.title}
            <br />
            <strong>
              {currentData.highlight}
            </strong>
          </h1>

          <p>
            {currentData.description}
          </p>

        </div>

        <div className="onboarding-footer">

          <div className="onboarding-dots">

            {onboardingData.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  className={
                    index === currentSlide
                      ? "onboarding-dot active"
                      : "onboarding-dot"
                  }
                  onClick={() =>
                    setCurrentSlide(index)
                  }
                />
              )
            )}

          </div>

          <button
            type="button"
            className="onboarding-next"
            onClick={handleNext}
          >
            <span>
              {currentSlide ===
              onboardingData.length - 1
                ? "Get Started"
                : "Continue"}
            </span>

            <span className="onboarding-arrow">
              →
            </span>
          </button>

        </div>

      </div>

    </main>
  );
}