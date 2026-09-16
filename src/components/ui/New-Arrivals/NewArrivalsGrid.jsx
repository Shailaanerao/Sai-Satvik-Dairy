import ProductCard from "../Products-card/ProductCard";

export default function NewArrivalsGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="new-arrivals-empty">
        <p>No new products available in this category right now.</p>
      </div>
    );
  }

  return (
    <div className="new-arrivals-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}