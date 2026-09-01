import Link from "next/link";
import ProductCard from "../Products-card/ProductCard";
import "./BestSellers.css";

const bestSellingProducts = [
  {
    id: 1,
    name: "A2 Desi Cow Milk",
    category: "Best Seller",
    price: "₹65 / L",
    description:
      "Fresh and wholesome A2 milk sourced from carefully raised desi cows.",
    image: "/milk.jpg",
  },
  {
    id: 2,
    name: "A2 Gir Cow Ghee",
    category: "Best Seller",
    price: "₹650 / 500g",
    description:
      "Traditional bilona-style ghee with rich aroma and authentic taste.",
    image: "/ghee.jpg",
  },
  {
    id: 3,
    name: "Fresh Paneer",
    category: "Best Seller",
    price: "₹100 / 200g",
    description:
      "Soft, fresh and protein-rich paneer prepared from quality milk.",
    image: "/paneer.jpg",
  },
  {
    id: 4,
    name: "Fresh Curd",
    category: "Best Seller",
    price: "₹50 / 500g",
    description:
      "Creamy and naturally refreshing curd prepared fresh every day.",
    image: "/curd.jpg",
  },
  {
    id: 5,
    name: "Farm Fresh Butter",
    category: "Best Seller",
    price: "₹120 / 200g",
    description:
      "Smooth and creamy butter made from fresh dairy ingredients.",
    image: "/butter.jpg",
  },
];

export default function BestSellers() {
  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">
        {/* Section Heading */}
        <div className="best-sellers-heading">
          <div className="best-sellers-heading-left">
            <span className="best-sellers-label">CUSTOMER FAVORITES</span>
            <h2 className="best-sellers-title">
              Our <span>Best Sellers</span>
            </h2>
          </div>

          <p className="best-sellers-description">
            Loved by families every day, these are some of our
            most popular dairy products.
          </p>
        </div>

        {/* Products Grid */}
        <div className="best-sellers-grid">
          {bestSellingProducts.map((product) => (
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

        {/* View Products */}
        <div className="best-sellers-footer">
          <Link href="/products" className="best-sellers-btn">
            Explore All Products
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