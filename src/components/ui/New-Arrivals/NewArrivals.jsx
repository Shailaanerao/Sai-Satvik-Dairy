"use client";

import { useMemo, useState } from "react";

import NewArrivalsHeader from "./NewArrivalsHeader";
import NewArrivalsGrid from "./NewArrivalsGrid";
import { products } from "@/app/data/productsData";

import "./NewArrivals.css";

export default function NewArrivals({
  customProducts,
  customTitle,
}) {
  const productList = customProducts || products.filter(
    (product) => product.newArrival
  );

  const filterTabs = useMemo(
    () => [
      "All",
      ...new Set(productList.map((product) => product.category)),
    ],
    [productList]
  );

  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? productList
      : productList.filter(
          (product) => product.category === activeTab
        );

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-container">
        <NewArrivalsHeader
          title={customTitle || "New Arrivals"}
          highlightText="Latest Products"
          badgeText="NEW LAUNCHES"
        />

        <div className="new-arrivals-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab
                  ? "arrivals-pill active"
                  : "arrivals-pill"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <NewArrivalsGrid products={filteredProducts} />
      </div>
    </section>
  );
}