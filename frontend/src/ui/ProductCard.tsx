import { Link } from "react-router-dom";
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-visual" style={{ background: product.image }} />
      <div className="product-copy">
        <div className="meta-row">
          <span className="chip">{product.category?.name ?? "Category"}</span>
          <span className={product.stock > 0 ? "stock available" : "stock sold-out"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <strong>EUR {product.price.toFixed(2)}</strong>
          <div className="inline-actions">
            <Link to={`/products/${product.id}`} className="ghost-button">
              Details
            </Link>
            <button onClick={() => onAdd(product)} disabled={product.stock === 0}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
