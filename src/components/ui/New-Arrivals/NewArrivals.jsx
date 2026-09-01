"use client";

import React, { useState } from "react";
import NewArrivalsHeader from "./NewArrivalsHeader";
import NewArrivalsGrid from "./NewArrivalsGrid";
import "./NewArrivals.css";

const latestDairyProducts = [
  {
    id: 9,
    name: "Fresh Amrakhand",
    category: "Sweets",
    price: "₹200 / 500g",
    description: "Creamy mango-infused traditional dessert made with fresh hung curd.",
    image: "/amrakhand.jpg",
    size: "500g",
  },
  {
    id: 10,
    name: "Kesar Flavoured Milk",
    category: "Fresh Milk",
    price: "₹55 / 250ml",
    description: "Rich saffron-infused cold A2 milk made with zero chemical additives.",
    image: "/flavoured-milk.jpg",
    size: "250ml",
  },
  {
    id: 8,
    name: "Fresh Artisan Cheese",
    category: "Cheese",
    price: "₹250 / 250g",
    description: "Handmade wholesome table cheese crafted from single-source raw cow milk.",
    image: "/cheese.jpg",
    size: "250g",
  },
  {
    id: 7,
    name: "Spiced Masala Buttermilk",
    category: "Beverages",
    price: "₹45 / 500ml",
    description: "Cooling churned chaas flavored with roasted cumin, mint, and ginger.",
    image: "/lassi.jpg",
    size: "500ml",
  },
];

const filterTabs = ["All", "Sweets", "Fresh Milk", "Cheese", "Beverages"];

export default function NewArrivals({ customProducts, customTitle }) {
  const [activeTab, setActiveTab] = useState("All");
  const productList = customProducts || latestDairyProducts;

  const filteredItems =
    activeTab === "All"
      ? productList
      : productList.filter((item) => item.category === activeTab);

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-container">
        {/* Reusable Header */}
        <NewArrivalsHeader
          title={customTitle || "New Arrivals"}
          highlightText="Latest Products"
          badgeText="NEW LAUNCHES"
        />

        {/* Category Pill Filters */}
        <div className="new-arrivals-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`arrivals-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reusable Product Grid */}
        <NewArrivalsGrid products={filteredItems} />
      </div>
    </section>
  );
}