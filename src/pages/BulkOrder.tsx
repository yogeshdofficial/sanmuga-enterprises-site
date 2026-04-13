import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const pricingTiers = [
  { range: "100–499 pieces", discount: "Retail price" },
  { range: "500–1,999 pieces", discount: "15–25% off" },
  { range: "2,000–4,999 pieces", discount: "30–40% off" },
  { range: "5,000+ pieces", discount: "45%+ off — Contact us" },
];

const BulkOrder = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Inquiry Submitted!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <Layout>
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Bulk Order & Wholesale</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the best prices on large orders. Free samples available for businesses.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pricing Tiers */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Volume Pricing</h2>
              <div className="space-y-4 mb-8">
                {pricingTiers.map((t) => (
                  <div key={t.range} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <span className="font-medium">{t.range}</span>
                    <span className="text-primary font-semibold">{t.discount}</span>
                  </div>
                ))}
              </div>
              <div className="bg-leaf-lighter rounded-xl p-6">
                <h3 className="font-display font-semibold mb-3">Why Order in Bulk?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["Significant cost savings", "Consistent quality supply", "Custom branding & logo embossing", "Priority production scheduling", "Dedicated account manager", "Free samples before order"].map((b) => (
                    <li key={b} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> {b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Request a Quote</h2>
              {submitted ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">We'll respond within 24 hours with your custom quote.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-xl p-6 border border-border">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                      <Input required placeholder="Your name" maxLength={100} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Business Name *</label>
                      <Input required placeholder="Company name" maxLength={100} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email *</label>
                      <Input required type="email" placeholder="email@company.com" maxLength={255} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone / WhatsApp *</label>
                      <Input required type="tel" placeholder="+91 98765 43210" maxLength={20} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Product Interest</label>
                    <Input placeholder="e.g., 10 inch round plates" maxLength={200} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Estimated Quantity *</label>
                    <Input required placeholder="e.g., 5000 pieces" maxLength={50} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Additional Details</label>
                    <Textarea placeholder="Custom sizes, branding, delivery timeline..." rows={4} maxLength={1000} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-leaf shadow-leaf">
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BulkOrder;
