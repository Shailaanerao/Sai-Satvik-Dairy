"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { categoriesData } from "@/app/data/categoriesData"
import "./CategoryDropdown.css";

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOpen(false);
  };

  return (
    <div className="category-dropdown-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`category-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="category-btn-text">{selectedCategory}</span>
        <svg
          className={`chevron-icon ${isOpen ? "rotate" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="category-menu-popover">
          <div className="category-menu-header">
            <span>DAIRY CATEGORIES</span>
            <Link
              href="/categories"
              className="view-all-link-btn"
              onClick={() => setIsOpen(false)}
            >
              Browse All →
            </Link>
          </div>

          <div className="category-menu-list">
            <Link
              href="/products"
              className={`category-menu-item ${selectedCategory === "All Categories" ? "active" : ""}`}
              onClick={() => handleSelect("All Categories")}
            >
              <div className="cat-item-main">
                <span className="cat-bullet">🌾</span>
                <div className="cat-text-group">
                  <strong>All Products</strong>
                  <small>Full Dairy Range</small>
                </div>
              </div>
            </Link>

            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className={`category-menu-item ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => handleSelect(cat.name)}
              >
                <div className="cat-item-main">
                  <span className="cat-bullet">🥛</span>
                  <div className="cat-text-group">
                    <strong>{cat.name}</strong>
                    <small>{cat.subtext}</small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}