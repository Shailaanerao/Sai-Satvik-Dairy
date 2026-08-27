"use client";

import "./Ourpromise.css";

const promises = [
  {
    id: 1,
    title: "Farm Fresh",
    description:
      "Fresh dairy products sourced directly from trusted farms and prepared with care.",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.5 6 5 9.2 5 13.5a7 7 0 0 0 14 0C19 9.2 15.5 6 12 2Z" />
        <path d="M8.5 14.5a4 4 0 0 0 4 4" />
      </svg>
    ),
  },

  {
    id: 2,
    title: "Natural & Pure",
    description:
      "We believe in simple, wholesome dairy made without unnecessary additives or preservatives.",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3C8 7 5 10 5 14a7 7 0 0 0 14 0c0-4-3-7-7-11Z" />
        <path d="M9 15c.4 1.5 1.5 2.5 3 3" />
      </svg>
    ),
  },

  {
    id: 3,
    title: "Quality Tested",
    description:
      "Every product goes through quality checks to maintain freshness, purity and consistency.",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3 20 7v5c0 4.8-3.3 8.5-8 10-4.7-1.5-8-5.2-8-10V7l8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },

  {
    id: 4,
    title: "Freshly Delivered",
    description:
      "From our dairy farm to your doorstep, we work to deliver freshness every day.",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    ),
  },
];

export default function OurPromise() {
  return (
    <section className="promise-section">

      <div className="promise-container">

        {/* Section Heading */}

        <div className="promise-heading">

          <span className="promise-label">
            WHY SAI SATVIK
          </span>

          <h2 className="promise-title">
            Our Promise to
            <span> Your Family</span>
          </h2>

          <p className="promise-intro">
            From the care we give our cows to the way we prepare
            and deliver our products, we are committed to bringing
            goodness and freshness to your everyday table.
          </p>

        </div>


        {/* Promise Cards */}

        <div className="promise-grid">

          {promises.map((promise) => (
            <div
              className="promise-card"
              key={promise.id}
            >

              <div className="promise-icon">
                {promise.icon}
              </div>

              <h3 className="promise-card-title">
                {promise.title}
              </h3>

              <p className="promise-card-description">
                {promise.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}