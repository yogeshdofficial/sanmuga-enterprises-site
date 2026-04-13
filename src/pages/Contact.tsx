import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
  };

  return (
    <Layout>
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch for orders, samples, or any questions about our
            products
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-leaf-lighter text-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      +91 9342822747
                    </p>
                    {/* <p className="text-muted-foreground text-sm">+91 87654 32109</p> */}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-leaf-lighter text-primary flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <a
                      href={`https://wa.me/9342822747?text=${encodeURIComponent("Hi, I'm interested in OM Shanmuga Enterprises products.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-leaf-lighter text-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      omshanmugaenterprises27@gmail.com
                    </p>
                    {/* <p className="text-muted-foreground text-sm">
                      orders@greenleafareca.com
                    </p> */}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-leaf-lighter text-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Factory Address</h3>
                    <p className="text-muted-foreground text-sm">
                      OM Shanmuga Enterprises
                      <br />
                      Plot No. 42, SIDCO Industrial Estate
                      <br />
                      Coimbatore - 641021, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              {/* <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  title="OM Shanmuga factory location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250755.3576822061!2d76.83845865!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x5a05dbd1b0b3cd46!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div> */}
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Send a Message
              </h2>
              {submitted ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 bg-card rounded-xl p-6 border border-border"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Name *
                      </label>
                      <Input required placeholder="Your name" maxLength={100} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="email@example.com"
                        maxLength={255}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Subject *
                    </label>
                    <Input
                      required
                      placeholder="How can we help?"
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Message *
                    </label>
                    <Textarea
                      required
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      maxLength={1000}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-leaf shadow-leaf"
                  >
                    Send Message
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

export default Contact;
