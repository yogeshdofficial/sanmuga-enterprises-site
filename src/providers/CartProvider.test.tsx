import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { CartProvider } from "./CartProvider";
import { useCart } from "./cart-context";
import { products } from "@/data/products";

const arecaPlates = products.find((p) => p.id === "areca_plates")!;
const secondProduct = products.find((p) => p.id !== "areca_plates")!;

// A minimal consumer component that exercises every cart action via buttons,
// so we test the provider the way a real component would use it.
const CartTestConsumer = () => {
  const { cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div>
      <div data-testid="count">{cartCount}</div>
      <div data-testid="items">{cart.length}</div>
      <button onClick={() => addToCart(arecaPlates, '6"')}>add-6</button>
      <button onClick={() => addToCart(arecaPlates, '8"')}>add-8</button>
      <button onClick={() => addToCart(secondProduct)}>add-second</button>
      <button onClick={() => updateQuantity(arecaPlates.id, '6"', 5)}>set-qty-5</button>
      <button onClick={() => updateQuantity(arecaPlates.id, '6"', 0)}>zero-qty</button>
      <button onClick={() => removeFromCart(arecaPlates.id, '6"')}>remove-6</button>
      <button onClick={() => clearCart()}>clear</button>
    </div>
  );
};

const renderCart = () =>
  render(
    <CartProvider>
      <CartTestConsumer />
    </CartProvider>,
  );

describe("CartProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty", () => {
    renderCart();
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("items").textContent).toBe("0");
  });

  it("adds a new item to the cart", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    expect(screen.getByTestId("items").textContent).toBe("1");
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("increments quantity instead of duplicating when the same product+size is added again", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("add-6"));
    expect(screen.getByTestId("items").textContent).toBe("1"); // still one line item
    expect(screen.getByTestId("count").textContent).toBe("2"); // quantity 2
  });

  it("treats the same product with a different size as a separate line item", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("add-8"));
    expect(screen.getByTestId("items").textContent).toBe("2");
    expect(screen.getByTestId("count").textContent).toBe("2");
  });

  it("updates quantity for a specific line item", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("set-qty-5"));
    expect(screen.getByTestId("count").textContent).toBe("5");
    expect(screen.getByTestId("items").textContent).toBe("1");
  });

  it("removes the line item when quantity is set to 0", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("zero-qty"));
    expect(screen.getByTestId("items").textContent).toBe("0");
  });

  it("removes an item directly via removeFromCart", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("add-second"));
    fireEvent.click(screen.getByText("remove-6"));
    expect(screen.getByTestId("items").textContent).toBe("1");
  });

  it("clears the entire cart", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    fireEvent.click(screen.getByText("add-second"));
    fireEvent.click(screen.getByText("clear"));
    expect(screen.getByTestId("items").textContent).toBe("0");
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("persists the cart to localStorage", () => {
    renderCart();
    fireEvent.click(screen.getByText("add-6"));
    const stored = window.localStorage.getItem("sanumuga-cart");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored as string);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(arecaPlates.id);
  });

  it("restores cart state from localStorage on mount", () => {
    window.localStorage.setItem(
      "sanumuga-cart",
      JSON.stringify([
        {
          ...arecaPlates,
          size: '6"',
          quantity: 3,
        },
      ]),
    );

    renderCart();
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(screen.getByTestId("items").textContent).toBe("1");
  });
});
