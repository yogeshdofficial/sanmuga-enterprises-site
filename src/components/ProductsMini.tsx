import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { categories, productCategories, type Product } from "@/data/products";
import { useCart } from "@/providers/cart-context";

interface ProductDetailDialogProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

function ProductDetailDialog({
  product,
  onClose,
  onAddToCart,
}: ProductDetailDialogProps) {
  const { cart } = useCart();
  const quantity = product
    ? cart
        .filter((item) => item.id === product.id)
        .reduce((count, item) => count + item.quantity, 0)
    : 0;

  return (
    <Dialog open={product !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? product.name : ""}</DialogTitle>
          <DialogDescription>
            {product ? product.category : ""}
          </DialogDescription>
        </DialogHeader>
        {product ? (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <img
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.price}</Badge>
              {product.moq ? (
                <Badge variant="outline">MOQ: {product.moq}</Badge>
              ) : null}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {Object.keys(product.specs).length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-border">
                <dl className="divide-y divide-border">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-2 gap-2 bg-card px-4 py-2.5 text-sm"
                    >
                      <dt className="font-medium text-foreground">{label}</dt>
                      <dd className="text-right text-muted-foreground">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {product.detailUrl ? (
              <p className="text-xs text-muted-foreground">
                Source:{" "}
                <a
                  href={`https:${product.detailUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  IndiaMART listing
                </a>
              </p>
            ) : null}

            <Button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-full bg-gradient-leaf shadow-leaf"
            >
              <Plus className="h-4 w-4" />
              {quantity > 0
                ? `Add More (${quantity} in cart)`
                : "Add to Cart"}
            </Button>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface ProductImageGalleryProps {
  product: Product;
  onView: () => void;
}

function ProductImageGallery({ product, onView }: ProductImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (product.images.length === 1) {
    return (
      <button
        type="button"
        onClick={onView}
        aria-label={`View ${product.name} - image 1`}
        className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={product.images[0]}
          alt={`${product.name} - image 1`}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="h-full w-full"
      >
        <CarouselContent className="-ml-0 h-full">
          {product.images.map((image, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <button
                type="button"
                onClick={onView}
                aria-label={`View ${product.name} - image ${index + 1}`}
                className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={image}
                  alt={`${product.name} - image ${index + 1}`}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {product.images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`View ${product.name} - image ${index + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === current
                ? "w-4 bg-primary"
                : "w-1.5 bg-background/70 hover:bg-background",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductsMini() {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const visibleCategories = useMemo(
    () =>
      selectedCategory === "View All"
        ? productCategories
        : productCategories.filter((category) => category.name === selectedCategory),
    [selectedCategory],
  );

  const quantityFor = (product: Product) =>
    cart
      .filter((item) => item.id === product.id)
      .reduce((count, item) => count + item.quantity, 0);

  return (
    <section id="products" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
          Our Products
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Premium eco-friendly tableware — browse every category, tap any image
          to see the full product details
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

        <div className="space-y-16">
          {visibleCategories.map((category) => {
            const totalImages = category.products.reduce(
              (count, product) => count + product.images.length,
              0,
            );

            return (
              <div key={category.name}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold">
                    {category.name}
                  </h3>
                  <Badge variant="secondary">
                    {category.products.length} products · {totalImages} images
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.products.map((product) => {
                    const productQuantity = quantityFor(product);

                    return (
                      <div
                        key={product.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-leaf"
                      >
                        <div className="relative aspect-square w-full overflow-hidden bg-muted">
                          <ProductImageGallery
                            product={product}
                            onView={() => setSelectedProduct(product)}
                          />
                          {productQuantity > 0 ? (
                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
                              <ShoppingCart className="h-3 w-3" />
                              {productQuantity}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between gap-2 p-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.price}
                            </p>
                          </div>
                        </div>
                        {productQuantity > 0 ? (
                          <div className="mt-auto flex w-full items-stretch divide-x divide-primary/10">
                            <button
                              type="button"
                              onClick={() => {
                                const item = cart.find(
                                  (cartItem) => cartItem.id === product.id,
                                );
                                updateQuantity(
                                  product.id,
                                  item?.size ?? "Standard",
                                  productQuantity - 1,
                                );
                              }}
                              aria-label={`Remove one ${product.name} from cart`}
                              className="flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <Minus className="h-3.5 w-3.5" />
                              Remove
                            </button>
                            <div className="flex flex-1 items-center justify-center bg-primary/5 py-2 text-xs font-semibold text-primary">
                              {productQuantity} in cart
                            </div>
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              aria-label={`Add one more ${product.name} to cart`}
                              className="flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            aria-label={`Add ${product.name} to cart`}
                            className="mt-auto flex w-full items-center justify-center gap-1.5 bg-primary/10 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductDetailDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </section>
  );
}
