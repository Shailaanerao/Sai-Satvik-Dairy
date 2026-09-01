import React from "react";
import CategoryCard from "./CategoryCard";
import { categoriesData } from "@/app/data/categoriesData";

export default function CategoryGrid({ categories = categoriesData }) {
  return (
    <div className="category-grid-container">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}