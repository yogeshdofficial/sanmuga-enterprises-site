import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
  className?: string;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 9999,
  ariaLabel = "Quantity",
  className,
}: QuantityInputProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div
      className={cn(
        "inline-flex h-8 items-center overflow-hidden rounded-full border border-border bg-background",
        className,
      )}
    >
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        aria-label={`Decrease ${ariaLabel}`}
        className="flex h-full w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={ariaLabel}
        onChange={(event) => {
          if (event.target.value === "") {
            onChange(min);
            return;
          }
          const next = parseInt(event.target.value, 10);
          onChange(Number.isNaN(next) ? min : clamp(next));
        }}
        className="h-full w-12 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        aria-label={`Increase ${ariaLabel}`}
        className="flex h-full w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
