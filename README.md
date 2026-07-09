# Om Shanmuga Enterprises — Areca Leaf Products Website

A production-ready marketing and ordering site for **Om Shanmuga Enterprises**, a wholesale manufacturer of eco-friendly areca leaf plates and related disposable tableware. Built as a fast, mobile-first React storefront with a WhatsApp-based checkout flow, so the business owner doesn't need a payment gateway or backend to start taking orders.

## Features

- **Product catalog** — categorized areca plates, paper plates, bio cups, tissues, and bowls, each with size options and pricing.
- **Cart + WhatsApp checkout** — customers build a cart client-side (persisted in `localStorage`), enter delivery details, and the order is sent as a pre-filled WhatsApp message to the business's number. No backend required.
- **Featured products carousel** — autoplaying, swipeable carousel (Embla) on the homepage with a click-to-zoom modal for each product poster.
- **Bulk order inquiry page** — a dedicated form for wholesale/bulk buyers.
- **Blog / insights page** — sustainability and product education content.
- **Responsive, accessible UI** — built with shadcn/ui + Tailwind CSS, keyboard-navigable menus and carousels, proper heading hierarchy, and labeled interactive elements throughout.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript, bundled with Vite |
| Routing | React Router |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| State | React Context (cart), TanStack Query (data layer) |
| Carousel | Embla Carousel (+ autoplay plugin) |
| Testing | Vitest + React Testing Library + jsdom |
| Forms | React Hook Form + Zod validation |

## Getting Started

```bash
npm install
npm run dev       # start local dev server
```

Other scripts:

```bash
npm run build        # production build to /dist
npm run preview      # preview the production build locally
npm run lint         # run ESLint
npm run test         # run the test suite once
npm run test:watch   # run tests in watch mode
```

## Project Structure

```
src/
├── assets/          # images and video, served via Vite's asset pipeline
├── components/      # reusable UI (Navbar, Footer, CartDrawer, carousels, etc.)
│   └── ui/          # shadcn/ui primitives (Button, Dialog, Carousel, ...)
├── data/            # static product catalog and content
├── hooks/           # shared React hooks
├── pages/           # one component per route (Index, Products, About, ...)
├── providers/        # CartProvider + cart context/logic (with unit tests)
└── test/            # Vitest setup (jsdom polyfills, testing-library config)
```

## Cart & Checkout Flow

The cart is intentionally backend-free:

1. `CartProvider` holds cart state in React context and mirrors it to `localStorage` on every change, so a cart survives a page refresh.
2. Adding the same product **and size** twice increments quantity rather than creating a duplicate line item; a different size for the same product is treated as a separate line.
3. At checkout, `buildCheckoutUrl` formats the cart and customer details into a WhatsApp deep link (`wa.me`) with a pre-filled order message — the business owner receives and confirms orders directly in WhatsApp.

This logic lives in `src/providers/cart-context.ts` and is covered by unit tests in `cart-context.test.ts` and integration tests in `CartProvider.test.tsx`.

## Testing

The test suite covers the parts of the app with real logic and user-facing behavior, rather than snapshotting markup:

- **Cart logic** (`cart-context.test.ts`) — quantity math, checkout message formatting, WhatsApp URL encoding, and `localStorage` read/parse safety (including malformed or corrupted stored data).
- **Cart provider integration** (`CartProvider.test.tsx`) — add/increment/update/remove/clear behavior exercised through a real consumer component, plus persistence and restoration from `localStorage`.
- **Featured products carousel** (`FeaturedProductsCarousel.test.tsx`) — renders all cards and opens the zoom dialog on interaction.

Run `npm run test` for a single pass, or `npm run test:watch` while developing.

## Performance Notes

- Product and banner images are served as resized WebP (converted from the original full-resolution JPEGs), cutting the featured-product image payload by roughly 65%.
- The homepage hero video is trimmed to a short muted loop and re-encoded at a lower bitrate, cutting its size from ~5.4 MB to ~2 MB.
- Below-the-fold images use `loading="lazy"`.

## Accessibility Notes

- All interactive icon-only controls (mobile menu toggle, cart quantity buttons, carousel arrows) have `aria-label`s.
- Every page has exactly one `<h1>` with a sensible heading hierarchy beneath it.
- The decorative autoplaying hero video is muted and marked `aria-hidden`.
- The image zoom modal includes a screen-reader-only title so it announces correctly.
