import { ButtonHTMLAttributes, ReactNode } from "react";

export type M3ButtonVariant = "filled" | "outlined" | "tonal" | "elevated" | "text";

export interface M3ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3ButtonVariant;
  icon?: string; // Material symbols string
  children: ReactNode;
}

export default function M3Button({
  variant = "filled",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: M3ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 h-10 px-6 rounded-full text-label-large font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const getVariantStyles = () => {
    if (disabled) {
      return "bg-on-surface/[0.12] text-on-surface/[0.38] cursor-not-allowed";
    }

    switch (variant) {
      case "filled":
        return "bg-primary text-on-primary hover:bg-primary/92 hover:shadow-md active:bg-primary/88 focus:ring-primary";
      case "tonal":
        return "bg-secondary-container text-on-secondary-container hover:bg-on-surface/8 hover:shadow-sm active:bg-on-surface/12 focus:ring-secondary-container";
      case "outlined":
        return "bg-transparent border border-outline text-primary hover:bg-primary/8 active:bg-primary/12 focus:ring-primary";
      case "elevated":
        return "bg-surface-container-low text-primary shadow-sm hover:bg-primary/8 hover:shadow-md active:bg-primary/12 focus:ring-primary";
      case "text":
        return "bg-transparent text-primary px-3 hover:bg-primary/8 active:bg-primary/12 focus:ring-primary";
    }
  };

  return (
    <button
      className={`${baseStyles} ${getVariantStyles()} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="material-symbols-rounded text-[18px]">{icon}</span>
      )}
      {children}
    </button>
  );
}
