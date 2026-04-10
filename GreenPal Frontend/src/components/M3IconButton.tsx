import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface M3IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  /** Size of the button */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Width aspect ratio shape of the button */
  widthScale?: "default" | "narrow" | "wide";
  /** Visual appearance variant */
  variant?: "tonal" | "toggle" | "standard";
  /** If variant is "toggle", this controls the selected state */
  isSelected?: boolean;
  /** Whether the icon should be filled vs outlined */
  isFilled?: boolean;
}

const sizeClasses = {
  xs: {
    icon: "text-[20px]",
    height: "h-8",
    widths: {
      default: "w-8",
      narrow: "w-7",
      wide: "w-10",
    },
  },
  sm: {
    icon: "text-[24px]",
    height: "h-10",
    widths: {
      default: "w-10",
      narrow: "w-8",
      wide: "w-[52px]", // 52px
    },
  },
  md: {
    icon: "text-[24px]",
    height: "h-14",
    widths: {
      default: "w-14", // 56px
      narrow: "w-12", // 48px
      wide: "w-[72px]",
    },
  },
  lg: {
    icon: "text-[32px]",
    height: "h-24", // 96px
    widths: {
      default: "w-24",
      narrow: "w-16", // 64px
      wide: "w-32", // 128px
    },
  },
  xl: {
    icon: "text-[40px]",
    height: "h-[136px]",
    widths: {
      default: "w-[136px]",
      narrow: "w-[104px]",
      wide: "w-[184px]",
    },
  },
};

export const M3IconButton = forwardRef<HTMLButtonElement, M3IconButtonProps>(
  (
    {
      icon,
      size = "md",
      widthScale = "default",
      variant = "tonal",
      isSelected = false,
      isFilled = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Determine colors based on variant and state
    let colorClass = "bg-secondary-container text-on-secondary-container";
    if (variant === "standard") {
      colorClass = "bg-transparent text-on-surface-variant hover:text-on-surface";
    } else if (variant === "toggle") {
      if (isSelected) {
        colorClass = "bg-secondary text-on-secondary";
      }
    }

    // Determine dimensions
    const dimensions = sizeClasses[size];
    const widthClass = dimensions.widths[widthScale];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base Structural Classes
          "relative inline-flex items-center justify-center shrink-0 rounded-full outline-none",
          "transition-all duration-200 ease-in-out",

          // Colors
          colorClass,

          // Dimensions
          dimensions.height,
          widthClass,

          // State Overlay pseudo-element (opacity matches M3 guidelines: hover 8%, focus 10%, pressed 10%)
          "before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0",
          !disabled && "hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10",

          // Accessibility: Minimum 48x48 touch target for small buttons
          (size === "xs" || size === "sm") &&
            "after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-12 after:h-12 after:rounded-full after:z-[-1]",

          // Disabled state (10% state layer container mapping)
          "disabled:opacity-10 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            isFilled ? "material-symbols-rounded--filled" : "material-symbols-rounded",
            dimensions.icon,
            "z-10" // keep icon above the state overlay
          )}
        >
          {icon}
        </span>
      </button>
    );
  }
);

M3IconButton.displayName = "M3IconButton";

export default M3IconButton;
