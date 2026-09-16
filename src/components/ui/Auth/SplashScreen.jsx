"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./SplashScreen.css";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="splash-screen">

      <div className="splash-background-circle splash-circle-one" />
      <div className="splash-background-circle splash-circle-two" />

      <div className="splash-content">

        <div className="splash-logo-container">

          <div className="splash-logo-ring">
            <Image
              src="/logo.jpeg"
              alt="Sai Satvik Dairy"
              width={150}
              height={150}
              priority
            />
          </div>

        </div>

        <div className="splash-brand">

          <h1>Sai Satvik</h1>

          <div className="splash-brand-line">
            <span />
            <p>DAIRY PRODUCTS</p>
            <span />
          </div>

          <div className="splash-tagline">
            PURE FOR SURE
          </div>

        </div>

        <p className="splash-description">
          Freshness you can trust,
          <br />
          purity your family deserves.
        </p>

        <div className="splash-loading">

          <div className="splash-loading-track">
            <div className="splash-loading-bar" />
          </div>

          <span>Loading...</span>

        </div>

      </div>

      <div className="splash-bottom">
        Farm Fresh • Naturally Pure • Delivered Fresh
      </div>

    </main>
  );
}