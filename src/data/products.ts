import productPlate from "@/assets/product-plate.jpg";
import productBioCup from "@/assets/productBioCups.jpg";
import productTissue from "@/assets/productTissues.jpg";
import productPaperPlate from "@/assets/productPaperPlates.jpg";
import arecaCups from "@/assets/arecaCups.jpg";

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  sizes: string[];
  pricingSummary?: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "areca_plates",
    name: "Areca plates",
    images: [productPlate,productPlate],
    description: "Round & square plates for every occasion",
    sizes: ['4"', '6"', '8"', '10"', '12"'],
    pricingSummary:
      '12" ₹5.8/pc · 10" ₹4.8 · 8" ₹2.8 · 6" ₹1.8 · 4" ₹1.2',
    category: "Areca Plates",
  },
  {
    id: "paper_plates",
    name: "Paper plates",
    images: [productPaperPlate],
    description: "Deep bowls for soups, curries & salads",
    sizes: ['6"', '7"', '8"', '9"', '10"', '11"', '12"', '13"'],
    pricingSummary:
      'ITC paper plate packs: 6" ₹15 · 7" ₹17 · 8" ₹21 · 9" ₹23 · 10" ₹29 · 11" ₹40 · 12" ₹50 · 13" ₹58 (24 pcs)',
    category: "Paper Plates",
  },
  {
    id: "bio_cups",
    name: "Bio cups",
    images: [productBioCup],
    description: "Rectangular trays for serving & catering",
    sizes: ["150 ml", "200 ml", "250 ml", "300 ml"],
    pricingSummary: "Bulk pricing available on request",
    category: "Bio Cups",
  },
  {
    id: "tissue_paper",
    name: "Tissue paper",
    images: [productTissue],
    description: "Variety sized cups",
    sizes: ["50 pcs", "75 pcs", "100 pcs"],
    pricingSummary:
      "50 pcs ₹13/pkt · 75 pcs ₹18/pkt · 100 pcs ₹24/pkt",
    category: "Tissue Paper",
  },
];

export const categories = [
  "Areca Plates",
  "Paper Plates",
  "Bio Cups",
  "Tissue Paper",
];

// export const products: Product[] = [
//   {
//     id: "p1", name: "Areaca Plates\"", category: "plates", image: productPlate,
//     size: "6 inch (15 cm)", description: "Perfect for snacks, appetizers, and desserts. Made from naturally fallen areca palm leaf sheaths.",
//     retailPrice: 8, bulkPricing: [{ minQty: 500, price: 6 }, { minQty: 2000, price: 4.5 }, { minQty: 5000, price: 3.5 }],
//     features: ["100% biodegradable", "Microwave safe", "Chemical-free", "Waterproof for 2+ hours"],
//   },
//  {
//     id: "p2", name: "Pape Plate \"", category: "trays", image: productTray,
//     size: "6 inch (15 cm)", description: "Perfect for snacks, appetizers, and desserts. Made from naturally fallen areca palm leaf sheaths.",
//     retailPrice: 8, bulkPricing: [{ minQty: 500, price: 6 }, { minQty: 2000, price: 4.5 }, { minQty: 5000, price: 3.5 }],
//     features: ["100% biodegradable", "Microwave safe", "Chemical-free", "Waterproof for 2+ hours"],
//   }, 
//   {
//     id: "p3", name: "Round Plate 6\"", category: "bowls", image: productBowl,
//     size: "6 inch (15 cm)", description: "Perfect for snacks, appetizers, and desserts. Made from naturally fallen areca palm leaf sheaths.",
//     retailPrice: 8, bulkPricing: [{ minQty: 500, price: 6 }, { minQty: 2000, price: 4.5 }, { minQty: 5000, price: 3.5 }],
//     features: ["100% biodegradable", "Microwave safe", "Chemical-free", "Waterproof for 2+ hours"],
//   },
//  {
//     id: "p4", name: "Round Plate 6\"", category: "cups", image: arecaCups,
//     size: "6 inch (15 cm)", description: "Perfect for snacks, appetizers, and desserts. Made from naturally fallen areca palm leaf sheaths.",
//     retailPrice: 8, bulkPricing: [{ minQty: 500, price: 6 }, { minQty: 2000, price: 4.5 }, { minQty: 5000, price: 3.5 }],
//     features: ["100% biodegradable", "Microwave safe", "Chemical-free", "Waterproof for 2+ hours"],
//   },




// ];

export const testimonials = [
  { name: "Rajesh Kumar", role: "Hotel Owner, Chennai", text: "OM Shanmuga plates are perfect for our restaurant. Guests love the natural look and feel. Excellent quality!", rating: 5 },
  { name: "Priya Sharma", role: "Caterer, Bangalore", text: "We switched to areca plates for all our events. The bulk pricing is great and the plates are incredibly sturdy.", rating: 5 },
  { name: "Ahmed Khan", role: "Export Client, Dubai", text: "Consistent quality and timely delivery. OM Shanmuga is our trusted supplier for biodegradable tableware.", rating: 5 },
  { name: "Sarah Thompson", role: "Eco Store Owner, UK", text: "Our customers love these plates. They're beautiful, functional, and truly sustainable. Great product!", rating: 5 },
];

export const blogPosts = [
  {
    id: "1", title: "Why Areca Leaf Plates Are the Future of Sustainable Dining",
    excerpt: "Discover how areca leaf plates are revolutionizing the food service industry with their eco-friendly properties...",
    date: "March 15, 2026", readTime: "5 min read",
  },
  {
    id: "2", title: "10 Reasons to Switch from Plastic to Areca Plates",
    excerpt: "From being 100% biodegradable to adding aesthetic value to your table, here are compelling reasons to make the switch...",
    date: "March 8, 2026", readTime: "4 min read",
  },
  {
    id: "3", title: "The Complete Guide to Areca Plate Manufacturing",
    excerpt: "A deep dive into how fallen areca palm leaves are transformed into beautiful, sturdy plates through a chemical-free process...",
    date: "February 28, 2026", readTime: "7 min read",
  },
  {
    id: "4", title: "How Hotels Are Going Green with Areca Leaf Products",
    excerpt: "Leading hotel chains are embracing areca leaf tableware as part of their sustainability initiatives...",
    date: "February 20, 2026", readTime: "6 min read",
  },
];
