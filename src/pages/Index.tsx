import { Link } from "react-router-dom";
import {
  Leaf,
  Shield,
  Recycle,
  Droplets,
  Star,
  ArrowRight,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroVideo from "@/assets/heroVideo.mp4";
import bannerOne from "@/assets/banner-1.jpeg";
import bannerTwo from "@/assets/banner-2.jpeg";
import bannerThree from "@/assets/banner-4.jpeg";
import processImage from "@/assets/process-collection.jpg";
import { categories, testimonials } from "@/data/products";
import ProductsMini from "@/components/ProductsMini";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    src: bannerOne,
    alt: "Natural areca leaf plates arranged for display",
  },
  {
    src: bannerTwo,
    alt: "Eco-friendly areca leaf tableware in a product showcase",
  },
  {
    src: bannerThree,
    alt: "Areca leaf plates presented as sustainable tableware",
  },
];

const heroAutoplay = Autoplay({
  delay: 3500,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: true,
});

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "Made from naturally fallen areca palm leaf sheaths",
  },
  {
    icon: Shield,
    title: "Chemical-Free",
    desc: "No chemicals, coatings, or additives used",
  },
  {
    icon: Recycle,
    title: "Biodegradable",
    desc: "Fully compostable within 60 days",
  },
  {
    icon: Droplets,
    title: "Waterproof",
    desc: "Naturally water-resistant for hot & cold food",
  },
];

// const certifications = [
//   "FDA Approved",
//   "ISO 9001:2015",
//   "FSSAI Certified",
//   "EU Food Grade",
//   "BIS Certified",
//   "Export Quality",
// ];

const Index = () => (
  <Layout>
    <section className="bg-background pt-6 lg:pt-10">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{ loop: true }}
          plugins={[heroAutoplay]}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.alt}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={1600}
                    height={720}
                    className="aspect-[16/7] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>

    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-leaf-lighter text-primary text-xs font-semibold mb-6">
              <Leaf className="h-3.5 w-3.5" /> Eco-Friendly & Sustainable
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              100% Natural &<br />
              <span className="text-gradient-leaf">Biodegradable</span>
              <br />
              Areca Leaf Plates
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Premium eco-friendly tableware crafted from naturally fallen areca
              palm leaves. Perfect for hotels, caterers, retailers, and export
              clients worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-leaf shadow-leaf"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/bulk-order">Bulk Order</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <video
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-2xl"
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
    <ProductsMini />
    {/* Benefits */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
          Why Choose OM Shanmuga?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Our areca leaf plates combine nature's beauty with unmatched
          functionality
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-leaf transition-shadow"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-leaf-lighter text-primary mb-4">
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Preview */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={processImage}
            alt="Areca leaf collection process"
            loading="lazy"
            width={800}
            height={600}
            className="rounded-2xl shadow-xl w-full object-cover"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              From Nature to Your Table
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our manufacturing process is 100% chemical-free. We collect
              naturally fallen areca palm leaf sheaths and transform them into
              beautiful, sturdy tableware through a simple heat-pressing
              process.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Collection of fallen leaf sheaths",
                "Cleaning & sun-drying",
                "Heat pressing into shape",
                "Quality finishing & trimming",
                "Hygienic packing & dispatch",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-leaf-lighter text-primary flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="outline">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "{t.text}"
              </p>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-leaf">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
          Ready to Go Green?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Join hundreds of businesses making the switch to sustainable
          tableware. Get bulk pricing and free samples today.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to="/bulk-order">Request Bulk Quote</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10"
          >
            <Link to="/contact">Get Free Samples</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
