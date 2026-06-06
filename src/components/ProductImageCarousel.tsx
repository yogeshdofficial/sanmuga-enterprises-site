import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-muted-foreground">No Image</span>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={images[0]}
          alt={productName}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <Carousel
      className="group relative w-full"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={src}
                alt={`${productName} - image ${index + 1}`}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
