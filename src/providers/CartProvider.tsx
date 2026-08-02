import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { Product } from "@/data/products";

import {
  buildCheckoutUrl,
  CART_STORAGE_KEY,
  CartContext,
  getCartCount,
  readStoredCart,
  type CartItem,
  type CheckoutDetails,
} from "./cart-context";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size?: string, quantity = 1) => {
    const selectedSize = size ?? "Standard";
    const safeQuantity = Math.max(1, Math.floor(quantity));

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id && item.size === selectedSize,
      );

      if (!existingItem) {
        return [
          ...currentCart,
          { ...product, size: selectedSize, quantity: safeQuantity },
        ];
      }

      return currentCart.map((item) =>
        item.id === product.id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + safeQuantity }
          : item,
      );
    });
  };

  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number,
  ) => {
    setCart((currentCart) => {
      if (quantity <= 0) {
        return currentCart.filter(
          (item) => item.id !== productId || item.size !== size,
        );
      }

      return currentCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      );
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId || item.size !== size),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      buildCheckoutUrl: (details: CheckoutDetails) =>
        buildCheckoutUrl(cart, details),
    }),
    [cart, cartCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
