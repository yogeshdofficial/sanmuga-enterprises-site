import { createContext, useContext } from "react";

import type { Product } from "@/data/products";
import { products } from "@/data/products";

export interface CartItem extends Product {
  size: string;
  quantity: number;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

export interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, size?: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  buildCheckoutUrl: (details: CheckoutDetails) => string;
}

export const CART_STORAGE_KEY = "sanumuga-cart";
export const WHATSAPP_NUMBER = "9342822747";

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as CartItem;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    typeof item.description === "string" &&
    typeof item.quantity === "number" &&
    item.quantity > 0
  );
};

const getDefaultSizeForProduct = (productId: string) =>
  products.find((product) => product.id === productId)?.sizes[0] ?? "Standard";

const normalizeCartItem = (item: CartItem): CartItem => ({
  ...item,
  size: item.size || getDefaultSizeForProduct(item.id),
});

export const readStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!rawCart) {
      return [];
    }

    const parsedCart = JSON.parse(rawCart) as unknown;

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(isCartItem).map(normalizeCartItem);
  } catch {
    return [];
  }
};

export const getCartCount = (cart: CartItem[]) =>
  cart.reduce((count, item) => count + item.quantity, 0);

export const buildCheckoutMessage = (cart: CartItem[], details: CheckoutDetails) => {
  const productLines = cart
    .map(
      (item, index) => `${index + 1}. ${item.name} - ${item.size} x ${item.quantity}`,
    )
    .join("\n");

  return [
    "Hello OM Shanmuga Enterprises,",
    "",
    "I would like to place an order with the following details:",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Address: ${details.address}`,
    details.note ? `Note: ${details.note}` : null,
    "",
    "Order summary:",
    productLines,
    "",
    "Please confirm the availability, total amount, and delivery timeline.",
    "Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
};

export const buildCheckoutUrl = (cart: CartItem[], details: CheckoutDetails) => {
  const message = buildCheckoutMessage(cart, details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};