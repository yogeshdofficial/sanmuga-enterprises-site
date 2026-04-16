import { products } from "@/data/products";
import { useCart } from "@/providers/cart-context";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsMini() {
  const { cart, addToCart, updateQuantity } = useCart();
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-leaf"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      {cartItem ? cartItem.quantity : 0}
                    </span>
                    <span>{cartItem ? "In cart" : "Ready to add"}</span>
                  </div>
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
                  </div>
                  {cartItem ? (
                    <div className="mt-auto flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                        Decrease
                      </Button>
                      <Button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-gradient-leaf shadow-leaf"
                      >
                        <Plus className="h-4 w-4" />
                        Add More ({cartItem.quantity})
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mt-auto w-full bg-gradient-leaf shadow-leaf"
                    >
                      <Plus className="h-4 w-4" />
                      Add to Cart
                    </Button>
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
