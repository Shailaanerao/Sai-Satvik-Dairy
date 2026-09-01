"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import ProductCard from "@/components/ui/Products-card/ProductCard";
import { categoriesData } from "@/app/data/categoriesData";
import "./products.css";

const products = [
  // 1. Milk
  {
    id: 1,
    name: "A2 Desi Cow Milk",
    category: "Milk",
    price: "₹65 / L",
    image: "/milk.jpg",
    description: "Fresh and pure A2 cow milk sourced from healthy desi cows.",
  },
  {
    id: 2,
    name: "Full Cream A2 Milk",
    category: "Milk",
    price: "₹75 / L",
    image: "/milk.jpg",
    description: "Thick whole milk rich in natural nutrients and healthy fats.",
  },

  // 2. Curd
  {
    id: 3,
    name: "Fresh Curd",
    category: "Curd",
    price: "₹70 / 500g",
    image: "/curd.jpg",
    description: "Thick and creamy curd prepared fresh every day.",
  },

  // 3. Paneer
  {
    id: 4,
    name: "Fresh Malai Paneer",
    category: "Paneer",
    price: "₹100 / 200g",
    image: "/paneer.jpg",
    description: "Soft, fresh and protein-rich paneer prepared daily.",
  },

  // 4. Ghee
  {
    id: 5,
    name: "Pure Cow Ghee",
    category: "Ghee",
    price: "₹850 / 500g",
    image: "/ghee.jpg",
    description: "Traditional bilona-style ghee made from pure cow milk.",
  },

  // 5. Butter
  {
    id: 6,
    name: "Farm Fresh Butter",
    category: "Butter",
    price: "₹120 / 200g",
    image: "/butter.jpg",
    description: "Smooth and creamy butter made from fresh dairy milk.",
  },

  // 6. Cheese
  {
    id: 7,
    name: "Fresh Cheese",
    category: "Cheese",
    price: "₹250 / 250g",
    image: "/cheese.jpg",
    description: "Fresh and delicious cheese made from quality milk.",
  },

  // 7. Shrikhand
  {
    id: 8,
    name: "Traditional Shrikhand",
    category: "Shrikhand",
    price: "₹180 / 500g",
    image: "/shrikhand.jpg",
    description: "Creamy traditional shrikhand made with fresh curd.",
  },

  // 8. Amrakhand
  {
    id: 9,
    name: "Fresh Amrakhand",
    category: "Amrakhand",
    price: "₹200 / 500g",
    image: "/amrakhand.jpg",
    description: "Creamy mango-flavoured traditional Maharashtrian dessert.",
  },

  // 9. Lassi
  {
    id: 10,
    name: "Fresh Sweet Lassi",
    category: "Lassi",
    price: "₹60 / 500ml",
    image: "/lassi.jpg",
    description: "Refreshing and naturally creamy traditional lassi.",
  },

  // 10. Flavoured Milk
  {
    id: 11,
    name: "Flavoured Kesar Milk",
    category: "Flavoured Milk",
    price: "₹55 / 250ml",
    image: "/flavoured-milk.jpg",
    description: "Delicious flavoured milk made using fresh dairy milk.",
  },

  // 11. Sweets
  {
    id: 12,
    name: "Pure Mawa Peda",
    category: "Sweets",
    price: "₹240 / 250g",
    image: "/shrikhand.jpg",
    description: "Traditional slow-cooked dairy sweets made with whole milk.",
  },

  // 12. Ice Cream
  {
    id: 13,
    name: "Natural Malai Ice Cream",
    category: "Ice Cream",
    price: "₹90 / 150ml",
    image: "/butter.jpg",
    description: "Creamy dairy ice cream made with real dairy milk fat.",
  },
];

// Dynamically extract category names from your existing categoriesData array
const categoryFilterList = ["All", ...categoriesData.map((cat) => cat.name)];

function ProductsContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sync category filter with query parameter (e.g., /products?category=Curd)
  useEffect(() => {
    if (queryCategory) {
      const matched = categoryFilterList.find(
        (cat) => cat.toLowerCase() === queryCategory.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    } else {
      setSelectedCategory("All");
    }
  }, [queryCategory]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <main className="products-page">
      {/* HERO SECTION */}
      <section className="products-hero">
        <div className="products-hero-content">
          <span className="products-badge">FRESH FROM OUR FARM</span>
          <h1>Pure & Fresh Dairy Products</h1>
          <p>
            Discover wholesome dairy products made with care and delivered fresh to your doorstep.
          </p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section">
        <div className="products-heading">
          <span className="products-small-title">OUR PRODUCTS</span>
          <h2>Fresh From Sai Satvik</h2>
          <p>Choose from our range of fresh, pure and delicious dairy products.</p>
        </div>

        {/* DYNAMIC CATEGORY FILTER TABS */}
        <div className="product-filters">
          {categoryFilterList.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-btn ${
                selectedCategory.toLowerCase() === category.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="products-loading">Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </>
  );
}