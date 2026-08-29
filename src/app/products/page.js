import Navbar from "@/components/ui/Navbar/Navbar";
import ProductCard from "@/components/ui/Products-card/ProductCard";
import "./products.css";

const products = [
  {
    id: 1,
    name: "A2 Desi Cow Milk",
    category: "Milk",
    price: "₹65 / L",
    image: "/milk.jpg",
    description:
      "Fresh and pure A2 cow milk sourced from healthy desi cows.",
  },
  {
    id: 2,
    name: "Pure Cow Ghee",
    category: "Ghee",
    price: "₹850 / 500g",
    image: "/ghee.jpg",
    description:
      "Traditional bilona-style ghee made from pure cow milk.",
  },
  {
    id: 3,
    name: "Fresh Paneer",
    category: "Paneer",
    price: "₹380 / kg",
    image: "/paneer.jpg",
    description:
      "Soft, fresh and protein-rich paneer prepared daily.",
  },
  {
    id: 4,
    name: "Fresh Curd",
    category: "Curd",
    price: "₹70 / 500g",
    image: "/curd.jpg",
    description:
      "Thick and creamy curd prepared fresh every day.",
  },
  {
    id: 5,
    name: "Farm Fresh Butter",
    category: "Butter",
    price: "₹120 / 200g",
    image: "/butter.jpg",
    description:
      "Smooth and creamy butter made from fresh dairy milk.",
  },
  {
    id: 6,
    name: "Traditional Shrikhand",
    category: "Sweets",
    price: "₹180 / 500g",
    image: "/shrikhand.jpg",
    description:
      "Creamy traditional shrikhand made with fresh curd.",
  },
  {
    id: 7,
    name: "Fresh Lassi",
    category: "Lassi",
    price: "₹60 / 500ml",
    image: "/lassi.jpg",
    description:
      "Refreshing and naturally creamy traditional lassi.",
  },
  {
    id: 8,
    name: "Fresh Cheese",
    category: "Cheese",
    price: "₹250 / 250g",
    image: "/cheese.jpg",
    description:
      "Fresh and delicious cheese made from quality milk.",
  },
  {
    id: 9,
    name: "Amrakhand",
    category: "Sweets",
    price: "₹200 / 500g",
    image: "/amrakhand.jpg",
    description:
      "Creamy mango-flavoured traditional Maharashtrian dessert.",
  },
  {
    id: 10,
    name: "Flavoured Milk",
    category: "Milk",
    price: "₹55 / 250ml",
    image: "/flavoured-milk.jpg",
    description:
      "Delicious flavoured milk made using fresh dairy milk.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="products-page">

        {/* HERO */}
        <section className="products-hero">
          <div className="products-hero-content">
            <span className="products-badge">
              FRESH FROM OUR FARM
            </span>

            <h1>
              Pure & Fresh Dairy Products
            </h1>

            <p>
              Discover wholesome dairy products made with
              care and delivered fresh to your doorstep.
            </p>
          </div>
        </section>


        {/* PRODUCTS SECTION */}
        <section className="products-section">

          <div className="products-heading">
            <span className="products-small-title">
              OUR PRODUCTS
            </span>

            <h2>
              Fresh From Sai Satvik
            </h2>

            <p>
              Choose from our range of fresh, pure and
              delicious dairy products.
            </p>
          </div>


          {/* CATEGORY FILTER */}
          <div className="product-filters">

            <button className="filter-btn active">
              All
            </button>

            <button className="filter-btn">
              Milk
            </button>

            <button className="filter-btn">
              Ghee
            </button>

            <button className="filter-btn">
              Paneer
            </button>

            <button className="filter-btn">
              Curd
            </button>

            <button className="filter-btn">
              Butter
            </button>

            <button className="filter-btn">
              Sweets
            </button>

          </div>


          {/* PRODUCT GRID */}
          <div className="products-grid">

            {products.map((product) => (
              <ProductCard
                key={product.id}
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
    </>
  );
}