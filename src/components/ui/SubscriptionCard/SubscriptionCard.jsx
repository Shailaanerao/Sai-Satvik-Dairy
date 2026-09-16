"use client";

import { useState } from "react";

export default function SubscriptionCard({
  product,
  onSubscribe,
}) {

  const [frequency, setFrequency] =
    useState("daily");

  const [selected, setSelected] =
    useState(false);


  const options = [
    {
      id: "daily",
      title: "Daily",
      subtitle:
        "Fresh delivery every morning",
    },

    {
      id: "weekly",
      title: "Weekly",
      subtitle:
        "Convenient weekly delivery",
    },
  ];


  const handleSubscribe = () => {

    setSelected(true);

    onSubscribe?.({
      productId: product.id,
      productName: product.name,
      frequency,
    });

  };


  return (
    <section className="subscription-card">


      {/* HEADER */}

      <div className="subscription-card-header">

        <div>

          <span className="subscription-eyebrow">
            FRESHNESS ON REPEAT
          </span>

          <h2>
            Subscribe & Save
          </h2>

          <p>
            Get your favourite dairy products
            delivered automatically.
          </p>

        </div>


        <div className="subscription-symbol">
          ↻
        </div>

      </div>


      {/* OPTIONS */}

      <div className="subscription-options">

        {options.map(
          (option) => (

            <button
              key={option.id}
              type="button"

              className={
                frequency === option.id
                  ? "subscription-option active"
                  : "subscription-option"
              }

              onClick={() =>
                setFrequency(option.id)
              }
            >

              <span className="subscription-radio">

                {frequency === option.id
                  ? "✓"
                  : ""}

              </span>


              <span className="subscription-option-text">

                <strong>
                  {option.title}
                </strong>

                <small>
                  {option.subtitle}
                </small>

              </span>

            </button>

          )
        )}

      </div>


      {/* BENEFITS */}

      <div className="subscription-benefits">

        <span>
          ✓ Save 5%
        </span>

        <span>
          ✓ Pause anytime
        </span>

        <span>
          ✓ Skip a delivery
        </span>

        <span>
          ✓ Cancel anytime
        </span>

      </div>


      {/* BUTTON */}

      <button
        type="button"
        className="subscription-submit"
        onClick={handleSubscribe}
      >

        {selected
          ? "Subscription Selected ✓"
          : `Subscribe ${frequency === "daily"
              ? "Daily"
              : "Weekly"}`}

      </button>

    </section>
  );
}