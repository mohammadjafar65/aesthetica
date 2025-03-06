import * as React from "react";
import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

// Define spinner container variants
const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

// Define loader variants with proper Tailwind size classes
const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "h-6 w-6",
      medium: "h-8 w-8",
      large: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

// Extend spinner props with VariantProps
interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

// Spinner component
export function Spinner({
  size = "medium",
  show = true,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span
      className={cn(spinnerVariants({ show }), className)}
      role="status"
      aria-hidden={!show}
    >
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
