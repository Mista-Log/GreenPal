"use client";

import React from "react";
import { useSideNav } from "./SideNavRail";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSideNav();
  return (
    <main 
      className="app-shell relative flex-1 min-w-0 min-h-screen transition-all duration-300"
    >
      {children}
    </main>
  );
}
