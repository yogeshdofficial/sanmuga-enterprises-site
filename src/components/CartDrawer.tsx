import { useEffect, useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/providers/cart-context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-context";

const emptyDetails = {
  name: "",
  phone: "",
  address: "",
  note: "",
};

interface QuantityEditorProps {
  item: CartItem;
  onDecrement: () => void;
  onIncrement: () => void;
  onSetQuantity: (quantity: number) => void;
}

const QuantityEditor = ({
  item,
  onDecrement,
  onIncrement,
  onSetQuantity,
}: QuantityEditorProps) => {
  const [draft, setDraft] = useState(String(item.quantity));

  useEffect(() => {
    setDraft(String(item.quantity));
  }, [item.quantity]);

  const commit = () => {
    const next = parseInt(draft, 10);
    onSetQuantity(Number.isNaN(next) ? 1 : Math.max(0, next));
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-border bg-background">
      <button
        type="button"
        onClick={onDecrement}
        disabled={item.quantity <= 0}
        aria-label={`Decrease quantity of ${item.name}`}
        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        aria-label={`Quantity of ${item.name}`}
        className="h-8 w-12 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${item.name}`}
        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

interface CartDrawerProps {
  triggerClassName?: string;
}

const CartDrawer = ({ triggerClassName }: CartDrawerProps) => {
  const {
    cart,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    buildCheckoutUrl,
  } = useCart();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(emptyDetails);

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cart.length) {
      return;
    }

    const checkoutUrl = buildCheckoutUrl({
      name: details.name.trim(),
      phone: details.phone.trim(),
      address: details.address.trim(),
      note: details.note.trim(),
    });

    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const updateField = (field: keyof typeof details, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn("relative gap-2", triggerClassName)}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cart & WhatsApp Checkout</SheetTitle>
          <SheetDescription>
            Add your name and delivery details, then send a professional order
            summary on WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-2">
          {cart.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center">
              <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap the plus button on any product card to start your order.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-xl border border-border bg-card p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="truncate font-semibold">{item.name}</h3>
                      <p className="text-xs font-medium text-primary">
                        Size: {item.size}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <QuantityEditor
                      item={item}
                      onDecrement={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      onIncrement={() => addToCart(item, item.size)}
                      onSetQuantity={(quantity) =>
                        updateQuantity(item.id, item.size, quantity)
                      }
                    />
                    <span className="text-xs font-medium text-primary">
                      Added to cart
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Separator />

        <form className="space-y-3 pt-2" onSubmit={handleCheckout}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name *</label>
              <Input
                required
                value={details.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Your full name"
                maxLength={100}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone *</label>
              <Input
                required
                value={details.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+91 98765 43210"
                maxLength={25}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Delivery Address *</label>
            <Textarea
              required
              value={details.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="House / street / city / state / pin code"
              rows={3}
              maxLength={400}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Note</label>
            <Textarea
              value={details.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="Any delivery instructions or special requirement"
              rows={2}
              maxLength={300}
            />
          </div>

          <Button
            type="submit"
            disabled={!cart.length}
            className="w-full bg-gradient-leaf shadow-leaf"
          >
            Send WhatsApp Order <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={clearCart}
            disabled={!cart.length}
          >
            Clear Cart
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
