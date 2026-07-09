import { describe, it, expect, beforeEach } from "vitest";

import {
  CART_STORAGE_KEY,
  WHATSAPP_NUMBER,
  buildCheckoutMessage,
  buildCheckoutUrl,
  getCartCount,
  readStoredCart,
  type CartItem,
} from "./cart-context";

const makeItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: "areca_plates",
  name: "Areca plates",
  images: ["img.webp"],
  description: "Round & square plates for every occasion",
  sizes: ['4"', '6"', '8"'],
  category: "Areca Plates",
  size: '6"',
  quantity: 1,
  ...overrides,
});

describe("getCartCount", () => {
  it("returns 0 for an empty cart", () => {
    expect(getCartCount([])).toBe(0);
  });

  it("sums quantities across all items", () => {
    const cart = [makeItem({ quantity: 2 }), makeItem({ id: "bio_cups", quantity: 3 })];
    expect(getCartCount(cart)).toBe(5);
  });
});

describe("buildCheckoutMessage", () => {
  it("includes customer details and every cart line", () => {
    const cart = [
      makeItem({ name: "Areca plates", size: '8"', quantity: 2 }),
      makeItem({ id: "bio_cups", name: "Bio cups", size: "Standard", quantity: 1 }),
    ];

    const message = buildCheckoutMessage(cart, {
      name: "Yogesh",
      phone: "9999999999",
      address: "Chennai",
    });

    expect(message).toContain("Name: Yogesh");
    expect(message).toContain("Phone: 9999999999");
    expect(message).toContain("Address: Chennai");
    expect(message).toContain('1. Areca plates - 8" x 2');
    expect(message).toContain("2. Bio cups - Standard x 1");
  });

  it("omits the note line when no note is given", () => {
    const message = buildCheckoutMessage([makeItem()], {
      name: "A",
      phone: "1",
      address: "B",
    });
    expect(message).not.toContain("Note:");
  });

  it("includes the note line when a note is given", () => {
    const message = buildCheckoutMessage([makeItem()], {
      name: "A",
      phone: "1",
      address: "B",
      note: "Deliver after 6pm",
    });
    expect(message).toContain("Note: Deliver after 6pm");
  });
});

describe("buildCheckoutUrl", () => {
  it("builds a wa.me link with the correct number and URL-encoded message", () => {
    const url = buildCheckoutUrl([makeItem()], {
      name: "Yogesh",
      phone: "9999999999",
      address: "Chennai",
    });

    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)) .toBe(true);
    expect(url).not.toContain(" "); // spaces must be encoded
    expect(decodeURIComponent(url.split("?text=")[1])).toContain("Name: Yogesh");
  });
});

describe("readStoredCart", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns an empty array when nothing is stored", () => {
    expect(readStoredCart()).toEqual([]);
  });

  it("returns an empty array when stored value is invalid JSON", () => {
    window.localStorage.setItem(CART_STORAGE_KEY, "not json");
    expect(readStoredCart()).toEqual([]);
  });

  it("returns an empty array when stored value is not an array", () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ foo: "bar" }));
    expect(readStoredCart()).toEqual([]);
  });

  it("filters out malformed items and keeps valid ones", () => {
    const valid = makeItem();
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([valid, { id: "bad" }, null, 42]),
    );

    const result = readStoredCart();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(valid.id);
  });

  it("fills in a default size for items with an empty size", () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([makeItem({ size: "" })]),
    );

    const result = readStoredCart();
    expect(result[0].size).toBe('4"'); // first size of areca_plates in product data
  });
});
