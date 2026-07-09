import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";
import CartDrawer from "@/components/CartDrawer";
const navLinks = [
  { to: "/", label: "Home", link: "" },
  { to: "/products", label: "Products", link: "/#products" },
  { to: "/about", label: "About Us", link: "" },
  { to: "/bulk-order", label: "Bulk Order" },
  { to: "/blog", label: "Blog", link: "" },
  { to: "/contact", label: "Contact", link: "" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          {/* <Leaf className="h-7 w-7 text-primary" /> */}
          <img
            src={logo}
            alt="Om Shanmuga Enterprises logo"
            className="h-10 w-10 shrink-0"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight text-foreground whitespace-nowrap sm:text-xl">
              OM <span className="text-primary">Shanmuga</span>
            </span>
            <span className="text-[9px] font-normal italic tracking-wide text-muted-foreground/80 sm:text-[10px]">
              Natures's Plate, Perfectly Made
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-leaf-lighter"
                  : "text-muted-foreground hover:text-primary hover:bg-leaf-lighter/50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <CartDrawer />
          <Button asChild size="sm" className="bg-gradient-leaf">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === l.to
                    ? "text-primary bg-leaf-lighter"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3">
              {/* <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/bulk-order" onClick={() => setOpen(false)}>Bulk Order</Link>
              </Button> */}
              <CartDrawer triggerClassName="flex-1" />
              <Button asChild size="sm" className="flex-1 bg-gradient-leaf">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
