import { useState } from "react";
import { ZoomIn } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";

import fp1 from "@/assets/FP1.webp";
import fp2 from "@/assets/fp2.webp";
import fp3 from "@/assets/FP3.webp";
import fp4 from "@/assets/FP4.webp";
import fp5 from "@/assets/FP5.jpeg";
import fp6 from "@/assets/FP6.jpeg";
import fp7 from "@/assets/FP7.jpeg";
import fp8 from "@/assets/fp8.jpeg";

interface FeaturedProduct {
  name: string;
  image: string;
}

const featuredProducts: FeaturedProduct[] = [
  // { name: '5" Round Areca Plate', image: fp1 },
  { name: "Areca Plate Range", image: fp2 },
  // { name: '12" Round Compartment Plate', image: fp3 },
  { name: '8" Round Areca Plate', image: fp4 },
  { name: '8" Round Areca Plate', image: fp5 },
  { name: '8" Round Areca Plate', image: fp6 },
  { name: '8" Round Areca Plate', image: fp7 },
  { name: '8" Round Areca Plate', image: fp8 },
];

const featuredAutoplay = Autoplay({
  delay: 2500,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: true,
});

export default function FeaturedProductsCarousel() {
  const [zoomedImage, setZoomedImage] = useState<FeaturedProduct | null>(
    null,
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
          Our Featured Products
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A closer look at some of our best-selling wholesale areca leaf
          plates
        </p>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[featuredAutoplay]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.name}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <button
                  type="button"
                  onClick={() => setZoomedImage(product)}
                  aria-label={`View enlarged image of ${product.name}`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-125"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur">
                      <ZoomIn className="h-4 w-4" /> View
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </div>

      <Dialog
        open={zoomedImage !== null}
        onOpenChange={(open) => !open && setZoomedImage(null)}
      >
        <DialogContent
          className="max-w-3xl border-none bg-transparent p-0 shadow-none"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            {zoomedImage ? `${zoomedImage.name} — enlarged view` : "Product image"}
          </DialogTitle>
          {zoomedImage ? (
            <img
              src={zoomedImage.image}
              alt={zoomedImage.name}
              className="max-h-[85vh] w-full rounded-2xl object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
