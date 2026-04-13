import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShoppingCart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { categories, type Product } from "@/data/products";
import ProductsMini from "@/components/ProductsMini";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";

  return (
    <Layout>
      {/* <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium eco-friendly areca leaf tableware — biodegradable plates,
            bowls, trays & custom sizes
          </p>
        </div>
      </section> */}

      <section className="py-12">
        <ProductsMini />
      </section>
    </Layout>
  );
};

const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-leaf transition-shadow">
    <div className="aspect-square overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={800}
        height={800}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
        {product.category}
      </span>
      <h3 className="font-display font-semibold text-xl mt-1 mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-1">{product.size}</p>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {product.description}
      </p>

      {product.retailPrice > 0 && (
        <div className="mb-4">
          <p className="text-lg font-bold text-foreground">
            ₹{product.retailPrice}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / piece
            </span>
          </p>
          <div className="mt-2 space-y-1">
            {product.bulkPricing.map((bp) => (
              <p key={bp.minQty} className="text-xs text-muted-foreground">
                {bp.minQty}+ pcs:{" "}
                <span className="font-semibold text-primary">
                  ₹{bp.price}/pc
                </span>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.features.map((f) => (
          <span
            key={f}
            className="text-xs px-2 py-0.5 rounded-full bg-leaf-lighter text-primary"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {product.retailPrice > 0 && (
          <Button size="sm" className="flex-1 bg-gradient-leaf">
            <ShoppingCart className="mr-1.5 h-4 w-4" /> Add to Cart
          </Button>
        )}
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link to="/bulk-order">
            <MessageSquare className="mr-1.5 h-4 w-4" /> Bulk Inquiry
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

export default ProductsPage;
