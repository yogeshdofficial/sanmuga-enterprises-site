import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import FeaturedProductsCarousel from "./FeaturedProductsCarousel";

describe("FeaturedProductsCarousel", () => {
  it("renders the section heading", () => {
    render(<FeaturedProductsCarousel />);
    expect(
      screen.getByRole("heading", { name: /our featured products/i }),
    ).toBeInTheDocument();
  });

  it("renders a card for each featured product", () => {
    render(<FeaturedProductsCarousel />);
    // Every card is an accessible button labelled "View enlarged image of <name>"
    const cards = screen.getAllByRole("button", { name: /view enlarged image of/i });
    expect(cards.length).toBeGreaterThan(0);
  });

  it("opens a zoomed dialog when a product card is clicked", () => {
    render(<FeaturedProductsCarousel />);
    const firstCard = screen.getAllByRole("button", {
      name: /view enlarged image of/i,
    })[0];

    fireEvent.click(firstCard);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
