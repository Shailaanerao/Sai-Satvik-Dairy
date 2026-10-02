"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CategoryDropdown from "./CategoryDropdown";

export default function NavbarSearch() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      router.push("/products");
      return;
    }

    router.push(
      `/products?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      className="navbar-search-wrapper"
      onSubmit={handleSearch}
    >
      <div className="search-container">

        <CategoryDropdown />

        <div className="search-divider"></div>

        <div className="search-bar">

          <svg
            className="search-leading-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />

            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
          </svg>

          <input
            id="product-search"
            name="productSearch"
            type="search"
            placeholder="Search milk, ghee, paneer..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className="search-btn"
            aria-label="Search"
          >
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
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>
          </button>

        </div>
      </div>
    </form>
  );
}