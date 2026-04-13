import { Leaf, Award, Users, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import processImage from "@/assets/process-collection.jpg";
import heroImage from "@/assets/hero-products.jpg";

const steps = [
  { title: "Collection", desc: "Naturally fallen areca palm leaf sheaths are collected from plantations across Tamil Nadu." },
  { title: "Cleaning", desc: "Leaves are thoroughly washed and sun-dried to remove any impurities." },
  { title: "Heat Pressing", desc: "Dried leaves are pressed in heated molds at high temperature to shape plates and bowls." },
  { title: "Finishing", desc: "Edges are trimmed and products are inspected for quality." },
  { title: "Packing", desc: "Products are hygienically packed and ready for dispatch worldwide." },
];

const stats = [
  { icon: Leaf, value: "50L+", label: "Plates produced yearly" },
  { icon: Users, value: "500+", label: "Happy clients" },
  { icon: Globe, value: "15+", label: "Countries exported" },
  { icon: Award, value: "6", label: "Certifications" },
];

const About = () => (
  <Layout>
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">About OM Shanmuga Enterprises</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Crafting sustainable tableware from nature's gifts since 2015
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OM Shanmuga Enterprises was founded in 2015 in Coimbatore, Tamil Nadu, with a simple yet powerful
              mission — to replace single-use plastic tableware with beautiful, 100% natural alternatives.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We discovered that the naturally fallen sheaths of areca palm trees, abundantly available in South India,
              could be transformed into sturdy, elegant plates and bowls through a chemical-free heat-pressing process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we supply over 500 businesses across 15 countries — from hotels and caterers to eco-conscious
              retailers and export clients — all committed to a greener future.
            </p>
          </div>
          <img src={heroImage} alt="OM Shanmuga products" loading="lazy" width={1920} height={1080} className="rounded-2xl shadow-xl w-full object-cover" />
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Manufacturing Process */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-4">Manufacturing Process</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          From fallen leaf to finished product — a 100% chemical-free journey
        </p>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <img src={processImage} alt="Leaf collection" loading="lazy" width={800} height={600} className="rounded-2xl shadow-xl w-full object-cover sticky top-24" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-leaf text-primary-foreground flex items-center justify-center font-display font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 bg-gradient-leaf">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">Our Sustainability Mission</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          We believe every small switch matters. By choosing areca leaf plates over plastic, you help reduce
          landfill waste, support rural livelihoods in India, and protect our planet for future generations.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/products">Explore Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default About;
