import Link from "next/link";
import ProductCard from "../Products-card/ProductCard";
import "./FeaturedProducts.css";

const featuredProducts = [
  {
    id: 1,
    name: "A2 Desi Cow Milk",
    category: "Fresh Milk",
    price: "₹65 / L",
    description:
      "Fresh and wholesome A2 milk sourced from carefully raised desi cows.",
    image: "/milk.jpg",
  },
  {
    id: 2,
    name: "A2 Gir Cow Ghee",
    category: "Ghee",
    price: "₹650 / 500g",
    description:
      "Traditional bilona-style ghee with rich aroma and authentic taste.",
    image: "/ghee.jpg",
  },
  {
    id: 3,
    name: "Fresh Paneer",
    category: "Paneer",
    price: "₹100 / 200g",
    description:
      "Soft, fresh and protein-rich paneer prepared from quality milk.",
    image: "/paneer.jpg",
  },
  {
    id: 4,
    name: "Fresh Curd",
    category: "Curd",
    price: "₹50 / 500g",
    description:
      "Creamy and naturally refreshing curd prepared fresh every day.",
    image: "/curd.jpg",
  },
  {
    id: 5,
    name: "Farm Fresh Butter",
    category: "Butter",
    price: "₹120 / 200g",
    description:
      "Smooth and creamy butter made from fresh dairy ingredients.",
    image: "/butter.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="featured-section">
      <div className="featured-container">
        {/* Section Heading */}
        <div className="featured-heading">
          <div className="featured-heading-left">
            <span className="featured-label">FROM OUR FARM</span>
            <h2 className="featured-title">
              Featured <span>Products</span>
            </h2>
          </div>

          <p className="featured-description">
            Discover our selection of fresh, pure and wholesome dairy products
            made with care for your family.
          </p>
        </div>

        {/* Product Cards */}
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>

        {/* View All Products */}
        <div className="featured-footer">
          <Link href="/products" className="view-products-btn">
            View All Products
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}