"use client";

import { HTMLAttributes } from "react";

interface M3SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "rounded";
  width?: string | number;
  height?: string | number;
}

export default function M3Skeleton({
  variant = "rounded",
  width,
  height,
  className = "",
  style,
  ...props
}: M3SkeletonProps) {
  const variantClasses = {
    rect: "rounded-none",
    circle: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={`animate-pulse bg-on-surface/10 ${variantClasses[variant]} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}
