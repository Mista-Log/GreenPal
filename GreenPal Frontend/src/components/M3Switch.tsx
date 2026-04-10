"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface M3SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  showIcons?: boolean;
  id?: string;
}

/**
 * Material 3 Switch Component
 * 
 * Features:
 * - Expressive handle morphing (16px to 24px)
 * - Animated sliding (spring physics)
 * - M3 interaction states (Hover, Focus, Pressed, Disabled)
 * - Support for internal icons (check/close)
 */
export default function M3Switch({
  checked = false,
  onChange,
  disabled = false,
  showIcons = true,
  id,
}: M3SwitchProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  // M3 Specs
  const trackWidth = 52;
  const trackHeight = 32;
  const handleSizeUnselected = 16;
  const handleSizeSelected = 24;
  const handleSizePressed = 28;
  const iconSize = 16;

  // Determine current handle size based on state
  const getHandleSize = () => {
    if (isPressed) return handleSizePressed;
    // When icons are shown, handle is 24px even when unselected (unless pressed)
    if (showIcons) return handleSizeSelected;
    return checked ? handleSizeSelected : handleSizeUnselected;
  };

  const handleSize = getHandleSize();

  return (
    <div
      className={`relative inline-flex items-center cursor-pointer select-none transition-opacity duration-200 ${
        disabled ? "opacity-38 cursor-default" : ""
      }`}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={toggle}
    >
      {/* Hidden Checkbox for Accessibility */}
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      {/* Track */}
      <motion.div
        animate={{
          backgroundColor: checked
            ? "var(--md-sys-color-primary)"
            : "var(--md-sys-color-surface-container-highest)",
          borderColor: checked 
            ? "rgba(102, 116, 81, 0)" // Primary with 0 alpha for smooth animation
            : "var(--md-sys-color-outline)",
        }}
        transition={{ duration: 0.2 }}
        style={{ width: trackWidth, height: trackHeight }}
        className="rounded-full border-2 flex items-center transition-colors relative overflow-hidden"
      >
        {/* Interaction Overlay (Focus/Hover Highlight) */}
        <AnimatePresence>
          {(isHovered || isFocused) && !disabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-surface"
            />
          )}
        </AnimatePresence>

        {/* Handle Container (The sliding part) */}
        <motion.div
          animate={{
            x: checked ? (trackWidth - handleSize - 4) : 4,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
          className="relative flex items-center justify-center pointer-events-none"
        >
          {/* Handle Target (The Actual Circle) */}
          <motion.div
            animate={{
              width: handleSize,
              height: handleSize,
              backgroundColor: checked
                ? "var(--md-sys-color-on-primary)"
                : isPressed 
                    ? "var(--md-sys-color-on-surface-variant)" 
                    : "var(--md-sys-color-outline)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="rounded-full flex items-center justify-center relative shadow-sm"
          >
            {/* Morphing Icons */}
            {showIcons && (
              <AnimatePresence mode="wait">
                {checked ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="material-symbols-rounded font-bold"
                    style={{ 
                      fontSize: iconSize,
                      color: "var(--md-sys-color-on-primary-container)" 
                    }}
                  >
                    check
                  </motion.span>
                ) : (
                  <motion.span
                    key="close"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="material-symbols-rounded font-bold"
                    style={{ 
                      fontSize: iconSize,
                      color: "var(--md-sys-color-surface-container-highest)" 
                    }}
                  >
                    close
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
