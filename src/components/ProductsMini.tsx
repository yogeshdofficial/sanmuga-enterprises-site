import { categories } from "@/data/products";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductsMini() {
  return (
    <section id="products" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
          Our Products
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Premium eco-friendly areca leaf tableware — biodegradable plates,
          bowls, trays & custom sizes
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`${cat.link}`}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-leaf transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
