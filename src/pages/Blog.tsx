import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { blogPosts } from "@/data/products";
import processImage from "@/assets/process-collection.jpg";

const Blog = () => (
  <Layout>
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Blog & Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about sustainable living, areca leaf products, and eco-friendly alternatives
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-leaf transition-shadow">
              <img src={processImage} alt={post.title} loading="lazy" width={800} height={400} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="font-display font-semibold text-xl mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <Button variant="ghost" size="sm" className="text-primary">
                  Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
