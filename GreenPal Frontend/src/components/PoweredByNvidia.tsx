"use client";

import React, { useEffect, useState } from "react";

interface PoweredByNvidiaProps {
  className?: string;
  variant?: "small" | "standard";
}

export default function PoweredByNvidia({
  className = "",
  variant = "standard",
}: PoweredByNvidiaProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Basic theme detection
    const checkTheme = () => {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setIsDark(true);
      } else if (stored === "light") {
        setIsDark(false);
      } else {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    };

    checkTheme();
    // Listen for theme changes if needed
    window.addEventListener("storage", checkTheme);
    return () => window.removeEventListener("storage", checkTheme);
  }, []);

  const logoSrc = isDark ? "/icons/NVIDIA_dark.svg" : "/icons/NVIDIA_light.svg";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-[10px] uppercase font-black tracking-tighter text-on-surface">
        AI powered by
      </span>
      <div
        className={`relative ${variant === "small" ? "w-16 h-4" : "w-24 h-6"}`}
      >
        <img
          src={logoSrc}
          alt="NVIDIA"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
