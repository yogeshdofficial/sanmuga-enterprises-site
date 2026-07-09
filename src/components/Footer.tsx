import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-leaf-light" />
            <span className="font-display text-lg font-bold">OM Shanmuga</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            100% natural & biodegradable areca leaf plates by OM Shanmuga
            Enterprises. Crafted with care in Tamil Nadu, India.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <a
              href="/#products"
              className="hover:text-leaf-light transition-colors"
            >
              Products
            </a>
            <Link
              to="/about"
              className="hover:text-leaf-light transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="hover:text-leaf-light transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Products</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <a
              href="/#products"
              className="hover:text-leaf-light transition-colors"
            >
              Plates
            </a>
            <a
              href="/#products"
              className="hover:text-leaf-light transition-colors"
            >
              Bowls
            </a>
            <a
              href="/#products"
              className="hover:text-leaf-light transition-colors"
            >
              Trays
            </a>
            <a
              href="/#products"
              className="hover:text-leaf-light transition-colors"
            >
              Custom Sizes
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-leaf-light" /> +91 9342822747
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-leaf-light" />{" "}
              omshanmugaenterprises27@gmail.com
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-leaf-light mt-0.5" />: Block B,
              48, B Block, Thanikachalam Nagar, B Block, Ponniammanmedu,
              Chennai, Tamil Nadu 600110
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 OM Shanmuga Enterprises. All rights reserved. | Eco-friendly
        plates, bowls & trays from India.
      </div>
    </div>
  </footer>
);

export default Footer;
