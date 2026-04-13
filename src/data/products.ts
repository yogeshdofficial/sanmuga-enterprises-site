import productPlate from "@/assets/product-plate.jpg";
import productBioCup from "@/assets/productBioCups.jpg";
import productTissue from "@/assets/productTissues.jpg";
import productPaperPlate from "@/assets/productPaperPlates.jpg";
import arecaCups from "@/assets/arecaCups.jpg";

export interface Product {
  id: string;
  name: string;
  category: "plates" | "bowls" | "trays" | "custom"|"cups";
  image: string;
  size: string;
  description: string;
  retailPrice: number;
  bulkPricing: { minQty: number; price: number }[];
  features: string[];
}

export const categories = [
  { link:"https://wa.me/9342822747?text=I need areca plates, quantity: ",id: "areca_plates", name: "Areca plates", image: productPlate, description: "Round & square plates for every occasion" },
  { link:"https://wa.me/9342822747?text=I need paper plates, quantity: ", id: "paper_plates", name: "Paper plates", image: productPaperPlate, description: "Deep bowls for soups, curries & salads" },
  { link:"https://wa.me/9342822747?text=I need bio cups, quantity: ", id: "bio_cups", name: "Bio cups", image: productBioCup, description: "Rectangular trays for serving & catering" },
  { link:"https://wa.me/9342822747?text=I need tissue papers, quantity: ",id: "tissue_paper", name: "Tissue paper", image: productTissue, description: "Variety sized cups" },
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
