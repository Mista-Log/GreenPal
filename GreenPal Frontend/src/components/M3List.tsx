"use client";

import Link from "next/link";
import React from "react";

export type M3ListItem = {
  id: string;
  label: string;
  /** Text above the label */
  overline?: string;
  /** Main supporting text below the label */
  supportingText?: string;
  /** Legacy alias for supportingText */
  subtitle?: string;
  /** Text metadata on the far right */
  trailingText?: string;
  /** Material symbol name for trailing action (e.g., chevron_right) */
  trailingIcon?: string;
  /** Material symbol name for leading icon */
  leadingIcon?: string;
  /** Legacy alias for leadingIcon */
  icon?: string;
  /** Style for the leading icon container */
  leadingIconVariant?: "plain" | "tonal" | "filled";
  /** Circular lead (initials or URL) */
  leadingAvatar?: string | React.ReactNode;
  /** Legacy alias for leadingAvatar */
  avatar?: string;
  /** Rectangular media lead (Image URL) */
  leadingMedia?: string;
  /** Destination for Link */
  href?: string;
  /** Callback for button behavior */
  onClick?: () => void;
  /** Whether the item is currently selected (highlights and shows checkmark) */
  selected?: boolean;
  /** Disable interactive states */
  disabled?: boolean;
};

export type M3ListProps = {
  items: M3ListItem[];
  /** Section title above the list */
  label?: string;
  /** 
   * contained: List items inside a single rounded box with dividers.
   * divided-gap: List items inside a rounded box separated by narrow transparent gaps.
   * separated: Each list item is its own rounded card.
   * compact: Low density list for tight layouts.
   * plain: Traditional flat list with minimal padding.
   */
  variant?: "contained" | "divided-gap" | "separated" | "compact" | "plain";
  onItemSelected?: () => void;
  className?: string;
};

/**
 * Standard M3 List Item component following Material Design 3 guidelines.
 * Supports all 10 structural elements: Container, Overline, Label, Trailing text/icon,
 * Supporting text, Dividers, and Leading Avatar/Icon/Media.
 */
export default function M3List({
  items,
  label,
  variant = "contained",
  onItemSelected,
  className = "",
}: M3ListProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <p className="mb-2 px-4 text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant">
          {label}
        </p>
      )}
      
      <div className={getListContainerStyles(variant)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showDivider = variant === "contained" && !isLast;

          return (
            <React.Fragment key={item.id}>
              <ListItemRow 
                item={item} 
                variant={variant} 
                onClick={onItemSelected}
              />
              {showDivider && (
                <div className="mx-4 h-px bg-outline-variant" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function getListContainerStyles(variant: M3ListProps["variant"]) {
  switch (variant) {
    case "contained":
      return "overflow-hidden rounded-[20px] bg-surface-container py-2";
    case "divided-gap":
      return "overflow-hidden rounded-[24px] bg-transparent flex flex-col gap-[2px]";
    case "separated":
      return "space-y-2";
    case "compact":
      return "overflow-hidden rounded-xl bg-surface-container-low py-1";
    default:
      return "flex flex-col";
  }
}

function ListItemRow({ 
  item, 
  variant, 
  onClick 
}: { 
  item: M3ListItem; 
  variant: M3ListProps["variant"];
  onClick?: () => void;
}) {
  const {
    label,
    overline,
    supportingText,
    subtitle,
    trailingText,
    trailingIcon,
    leadingIcon,
    icon,
    leadingIconVariant,
    leadingAvatar,
    avatar,
    leadingMedia,
    href,
    onClick: itemOnClick,
    disabled
  } = item;

  // Resolve aliases
  const dispSupportingText = supportingText || subtitle;
  const dispLeadingIcon = leadingIcon || icon;
  const dispLeadingAvatar = leadingAvatar || avatar;

  const content = (
    <>
      {/* 1. Leading Section */}
      <div className="relative flex shrink-0 items-center justify-start">
        {leadingMedia && (
          <div className="mr-4 h-14 w-14 overflow-hidden rounded-lg bg-surface-container-highest">
            <img src={leadingMedia} alt="" className="h-full w-full object-cover" />
            {item.selected && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-lg">
                <span className="material-symbols-rounded text-2xl text-on-primary">check</span>
              </div>
            )}
          </div>
        )}
        
        {dispLeadingAvatar && (
          <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${item.selected ? 'bg-primary' : 'bg-primary-container'} text-sm font-medium ${item.selected ? 'text-on-primary' : 'text-on-primary-container'} transition-colors`}>
            {item.selected ? (
              <span className="material-symbols-rounded text-2xl">check</span>
            ) : (
              typeof dispLeadingAvatar === "string" ? (
                dispLeadingAvatar.length <= 2 ? dispLeadingAvatar : <img src={dispLeadingAvatar} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                dispLeadingAvatar
              )
            )}
          </div>
        )}

        {dispLeadingIcon && !leadingMedia && !dispLeadingAvatar && (
          <div className={`mr-4 flex shrink-0 items-center justify-center ${
            leadingIconVariant === "filled" 
              ? "h-10 w-10 rounded-full bg-primary" 
              : leadingIconVariant === "tonal"
                ? "h-10 w-10 rounded-full bg-secondary-container"
                : "h-6 w-6"
          }`}>
            {item.selected ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <span className="material-symbols-rounded text-2xl">check</span>
              </div>
            ) : (
              <span className={`material-symbols-rounded text-2xl ${
                leadingIconVariant === "filled"
                  ? "text-on-primary"
                  : leadingIconVariant === "tonal"
                    ? "text-on-secondary-container"
                    : "text-on-surface-variant"
              }`}>
                {dispLeadingIcon}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 2. Text Content Section */}
      <div className="flex flex-1 flex-col justify-center overflow-hidden">
        {overline && (
          <span className="mb-0.5 text-[11px] font-medium leading-4 tracking-[0.5px] text-on-surface-variant uppercase">
            {overline}
          </span>
        )}
        <span className="text-base font-normal leading-6 tracking-[0.5px] text-on-surface truncate">
          {label}
        </span>
        {dispSupportingText && (
          <span className="mt-0.5 text-sm font-normal leading-5 tracking-[0.25px] text-on-surface-variant line-clamp-2">
            {dispSupportingText}
          </span>
        )}
      </div>

      {/* 3. Trailing Section */}
      <div className="ml-4 flex shrink-0 items-center gap-2">
        {trailingText && (
          <span className="text-xs font-normal leading-4 tracking-[0.4px] text-on-surface-variant">
            {trailingText}
          </span>
        )}
        {trailingIcon && (
          <span className="material-symbols-rounded text-2xl text-on-surface-variant">
            {trailingIcon}
          </span>
        )}
      </div>
    </>
  );

  const baseStyles = getRowBaseStyles(variant, !!(dispSupportingText || overline));
  const selectionStyles = item.selected ? "bg-secondary-container" : "";
  const interactiveStyles = disabled ? "opacity-38" : `hover:bg-on-surface/8 active:bg-on-surface/12 cursor-pointer transition-colors ${selectionStyles}`;

  if (href && !disabled) {
    return (
      <Link 
        href={href} 
        className={`${baseStyles} ${interactiveStyles} flex w-full`}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        itemOnClick?.();
        onClick?.();
      }}
      className={`${baseStyles} ${!disabled ? interactiveStyles : ""} flex w-full text-left`}
    >
      {content}
    </button>
  );
}

function getRowBaseStyles(variant: M3ListProps["variant"], isMultiLine: boolean) {
  // M3 Spacing Spec: 
  // - Single-line items: 16px vertical padding (56px min height)
  // - Multi-line items: 12px vertical padding (72px+ min height)
  // - Compact items: 8px vertical padding
  const padding = variant === "compact" ? "px-4 py-2" : (isMultiLine ? "px-4 py-3" : "px-4 py-4");
  const bg = (variant === "separated" || variant === "divided-gap") ? "bg-surface-container" : "";
  const rounded = variant === "separated" ? "rounded-[18px]" : (variant === "divided-gap" ? "rounded-[3px]" : "");
  const minHeight = isMultiLine ? "min-h-[72px]" : "min-h-[56px]";
  
  return `${padding} ${bg} ${rounded} ${minHeight} items-center`;
}
