import { Link } from "react-router-dom";
import { useCatalog } from "../hooks/useCatalog";
import { ProductCard } from "../ui/ProductCard";
import { StatusView } from "../ui/StatusView";
import { useCart } from "../state/CartContext";

export function HomePage() {
  const { products, categories, loading, error } = useCatalog();
  const { addItem } = useCart();

  if (loading) {
    return <StatusView title="Loading storefront" message="Preparing products, categories, and hero content." />;
  }

  if (error) {
    return <StatusView title="Catalog unavailable" message={error} />;
  }

  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Fluxon storefront</span>
          <h1>Build a demo-ready shop now, then swap in real APIs as the backend catches up.</h1>
          <p>
            This frontend is structured for hybrid delivery: polished enough for presentation, flexible enough for
            incomplete endpoints.
          </p>
          <div className="inline-actions">
            <Link to="/products" className="cta-button">
              Explore Products
            </Link>
            <Link to="/register" className="ghost-button">
              Create Demo Account
            </Link>
          </div>
        </div>
        <div className="hero-card-grid">
          <div className="hero-stat">
            <strong>{products.length}</strong>
            <span>Curated products</span>
          </div>
          <div className="hero-stat">
            <strong>{categories.length}</strong>
            <span>Shop categories</span>
          </div>
          <div className="hero-stat accent">
            <strong>Mock + API</strong>
            <span>Safe for evolving backend</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Categories</span>
            <h2>Shape the browsing experience around the backend data model</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <p>Use this category as a filter, navigation cue, and featured-content block.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured</span>
            <h2>Presentation-friendly products for your MVP demo flow</h2>
          </div>
          <Link to="/products" className="ghost-button">
            View All
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      </section>
    </div>
  );
}
