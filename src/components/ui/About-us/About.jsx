"use client";

import Image from "next/image";
import Link from "next/link";
import "./About.css";

export default function AboutUs() {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* LEFT - IMAGE */}
        <div className="about-image-wrapper">

          <Image
            src="/about-dairy.jpg"
            alt="Fresh dairy farm and cows"
            fill
            className="about-image"
          />

          {/* Small Experience Card */}
          <div className="about-experience-card">
            <span className="experience-number">100%</span>
            <span className="experience-text">
              Pure & Fresh
            </span>
          </div>

        </div>


        {/* RIGHT - CONTENT */}
        <div className="about-content">

          <span className="about-label">
            ABOUT SAI SATVIK DAIRY
          </span>

          <h2 className="about-title">
            From Our Farm
            <br />
            <span>To Your Family</span>
          </h2>

          <p className="about-description">
            At Sai Satvik Dairy, we believe that good health begins
            with pure and wholesome food. Our journey starts at the
            farm, where we carefully care for our cows and follow
            responsible dairy farming practices.
          </p>

          <p className="about-description">
            From fresh A2 milk to traditional ghee, paneer, curd and
            other dairy essentials, every product is prepared with
            care, quality and freshness in mind.
          </p>


          {/* Highlights */}
          <div className="about-highlights">

            <div className="about-highlight">

              <div className="highlight-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8 6 5 9 5 13a7 7 0 0 0 14 0c0-4-3-7-7-11z" />
                  <path d="M8 14a4 4 0 0 0 4 4" />
                </svg>
              </div>

              <div>
                <h3>Farm Fresh</h3>
                <p>Freshly sourced every day</p>
              </div>

            </div>


            <div className="about-highlight">

              <div className="highlight-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3L20 7V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V7L12 3Z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>

              <div>
                <h3>Quality Assured</h3>
                <p>Tested for purity & quality</p>
              </div>

            </div>


            <div className="about-highlight">

              <div className="highlight-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11a9 9 0 0 1 18 0" />
                  <path d="M5 11v6a2 2 0 0 0 2 2h1v-8H5z" />
                  <path d="M19 11v6a2 2 0 0 1-2 2h-1v-8h3z" />
                  <path d="M9 21h6" />
                </svg>
              </div>

              <div>
                <h3>Made With Care</h3>
                <p>Traditional & responsible practices</p>
              </div>

            </div>


            <div className="about-highlight">

              <div className="highlight-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                  <path d="M12 8v4l3 2" />
                </svg>
              </div>

              <div>
                <h3>Delivered Fresh</h3>
                <p>From our farm to your doorstep</p>
              </div>

            </div>

          </div>


          {/* Button */}
          <Link
            href="/about"
            className="about-button"
          >
            Discover Our Story

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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