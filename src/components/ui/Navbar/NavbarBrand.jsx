"use client";

import Image from "next/image";

export default function NavbarBrand() {
  return (
    <div className="navbar-left">
      <div
        className="brand-logo"
        aria-label="Sai Satvik Dairy"
      >
        <div className="logo-icon-wrapper">
          <Image
            src="/logo.jpeg"
            alt="Sai Satvik Dairy"
            width={48}
            height={48}
            priority
            className="brand-logo-img"
          />
        </div>

        <div className="brand-text">
          <span className="brand-title">
            Sai Satvik
          </span>

          <span className="brand-subtitle">
            DAIRY PRODUCTS
          </span>

          <span className="brand-subtitle1">
            PURE FOR SURE
          </span>
        </div>
      </div>
    </div>
  );
}