"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { categoriesData } from "@/app/data/categoriesData";

import "./CategoryDropdown.css";

export default function CategoryDropdown() {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCategorySelect = (slug) => {
    router.push(`/products?category=${encodeURIComponent(slug)}`);
    setIsOpen(false);
  };

  return (
    <div
      className="category-dropdown"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="category-dropdown-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        Categories

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="category-dropdown-menu">
          <button
            type="button"
            className="category-dropdown-item"
            onClick={() => handleCategorySelect("all")}
          >
            All Products
          </button>

          {categoriesData.map((category) => (
            <button
              key={category.id}
              type="button"
              className="category-dropdown-item"
              onClick={() => handleCategorySelect(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}