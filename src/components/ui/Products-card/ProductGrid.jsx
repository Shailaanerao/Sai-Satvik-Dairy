import ProductCard from "./ProductCard";

export default function ProductGrid({
  products = [],
  onAddToCart,
  className = "products-grid",
  emptyTitle = "No products found",
  emptyMessage = "Try selecting another category.",
}) {
  if (!products.length) {
    return (
      <div className="products-empty">
        <div>🥛</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}