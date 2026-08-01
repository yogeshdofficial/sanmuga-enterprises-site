import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CartProvider } from "../providers/CartProvider";
import ProductsMini from "./ProductsMini";

describe("ProductsMini smoke", () => {
  it("renders category gallery and opens product info dialog on image click", () => {
    render(
      <CartProvider>
        <ProductsMini />
      </CartProvider>,
    );

    expect(screen.getByRole("heading", { name: /our products/i })).toBeInTheDocument();

    const viewButtons = screen.getAllByRole("button", {
      name: /^view .* image \d/i,
    });
    expect(viewButtons.length).toBeGreaterThan(0);

    fireEvent.click(viewButtons[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
