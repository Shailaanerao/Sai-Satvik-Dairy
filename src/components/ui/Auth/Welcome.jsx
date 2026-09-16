"use client";

import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";

import "./Welcome.css";

export default function Welcome() {
  const router = useRouter();

  return (
    <main className="welcome-screen">

      <div className="welcome-decoration welcome-decoration-one" />
      <div className="welcome-decoration welcome-decoration-two" />

      <div className="welcome-card">

        <div className="welcome-logo-area">
          <AuthLogo />
        </div>

        <div className="welcome-content">

          <span className="welcome-eyebrow">
            WELCOME TO OUR FAMILY
          </span>

          <h1>
            Freshness starts
            <br />
            <span>with you.</span>
          </h1>

          <p>
            Discover pure, fresh and
            naturally delicious dairy products
            made with care for your family.
          </p>

        </div>

        <div className="welcome-actions">

          <button
            type="button"
            className="welcome-primary-button"
            onClick={() =>
              router.push("/login")
            }
          >
            <span>Login to Account</span>

            <span className="welcome-button-arrow">
              →
            </span>
          </button>

          <button
            type="button"
            className="welcome-secondary-button"
            onClick={() =>
              router.push("/register")
            }
          >
            Create New Account
          </button>

        </div>

        <div className="welcome-trust">

          <div className="welcome-trust-item">
            <span>✓</span>
            <p>Pure Products</p>
          </div>

          <div className="welcome-trust-item">
            <span>✓</span>
            <p>Fresh Delivery</p>
          </div>

          <div className="welcome-trust-item">
            <span>✓</span>
            <p>Quality Assured</p>
          </div>

        </div>

      </div>

    </main>
  );
}