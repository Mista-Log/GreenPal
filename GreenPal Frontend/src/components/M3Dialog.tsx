"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export type M3DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  supportingText: string;
  icon?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  dismissLabel?: string;
  onDismiss?: () => void;
  isDestructive?: boolean;
};

/**
 * Standard Material 3 Dialog component following strict design specifications.
 * Supports "Hero Icon", Title, Supporting Text, and Dual Action buttons.
 */
export default function M3Dialog({
  isOpen,
  onClose,
  title,
  supportingText,
  icon,
  confirmLabel = "OK",
  onConfirm,
  dismissLabel = "Cancel",
  onDismiss,
  isDestructive = false,
}: M3DialogProps) {
  const handleDismiss = onDismiss || onClose;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* 6. Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-scrim/32 backdrop-blur-[2px]"
          />
          
          {/* 1. Surface Container High */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-78 overflow-hidden rounded-[28px] bg-surface-container-high p-6 shadow-xl"
          >
            <div className="flex flex-col items-center">
              {/* 2. Secondary (Hero Icon) */}
              {icon && (
                <span className="material-symbols-rounded mb-4 text-[24px] text-secondary">
                  {icon}
                </span>
              )}
              
              {/* 3. On Surface (Title) */}
              <h2 className="text-xl font-normal leading-8 text-on-surface">
                {title}
              </h2>
              
              {/* 4. On Surface Variant (Supporting Text) */}
              <div className="mt-4 text-sm leading-5 tracking-[0.25px] text-on-surface-variant text-center">
                {supportingText}
              </div>
            </div>

            {/* Actions Section (24px mt as per spec) */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleDismiss}
                className="h-10 px-3 text-sm font-medium tracking-[0.1px] text-primary transition-colors hover:bg-primary/8 rounded-full"
              >
                {dismissLabel}
              </button>
              
              {/* 5. Primary (Confirm Label) */}
              <button
                type="button"
                onClick={onConfirm}
                className={`h-10 px-3 text-sm font-medium tracking-[0.1px] transition-colors rounded-full ${
                  isDestructive 
                    ? "text-error hover:bg-error/8" 
                    : "text-primary hover:bg-primary/8"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
