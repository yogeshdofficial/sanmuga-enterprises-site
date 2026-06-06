import { useState } from "react";

import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { useCart } from "@/providers/cart-context";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsMini() {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState("View All");

  const selectSize = (productId: string, size: string) => {
    setSelectedSizes((current) => ({ ...current, [productId]: size }));
  };

  const filteredProducts =
    selectedCategory === "View All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
          Our Products
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Premium eco-friendly areca leaf tableware — biodegradable plates,
          bowls, trays & custom sizes
        </p>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <Button
            variant={selectedCategory === "View All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("View All")}
          >
            View All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedSize = selectedSizes[product.id] ?? product.sizes[0];
            const cartItem = cart.find(
              (item) => item.id === product.id && item.size === selectedSize,
            );
            const productQuantity = cart
              .filter((item) => item.id === product.id)
              .reduce((count, item) => count + item.quantity, 0);

            return (
              <div
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-leaf"
              >
                <ProductImageCarousel
                  images={product.images}
                  productName={product.name}
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    {cartItem ? cartItem.quantity : 0}
                  </span>
                  <span>{cartItem ? "In cart" : "Ready to add"}</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    {product.pricingSummary ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">
                        <span className="font-medium text-primary">Price:</span>{" "}
                        {product.pricingSummary}
                      </p>
                    ) : null}
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Choose size
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => {
                          const isSelected = size === selectedSize;

                          return (
                            <Button
                              key={size}
                              type="button"
                              size="sm"
                              variant={isSelected ? "default" : "outline"}
                              className={cn(
                                "h-8 rounded-full px-3 text-xs",
                                isSelected &&
                                  "bg-primary text-primary-foreground",
                              )}
                              onClick={() => selectSize(product.id, size)}
                              aria-pressed={isSelected}
                            >
                              {size}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {cartItem ? (
                    <div className="mt-auto flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            selectedSize,
                            cartItem.quantity - 1,
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                        Decrease
                      </Button>
                      <Button
                        type="button"
                        onClick={() => addToCart(product, selectedSize)}
                        className="flex-1 bg-gradient-leaf shadow-leaf"
                      >
                        <Plus className="h-4 w-4" />
                        Add More ({cartItem.quantity})
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-auto space-y-2">
                      <Button
                        type="button"
                        onClick={() => addToCart(product, selectedSize)}
                        className="w-full bg-gradient-leaf shadow-leaf"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      {productQuantity > 0 ? (
                        <p className="text-center text-xs text-muted-foreground">
                          {productQuantity} total in cart across all sizes
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
