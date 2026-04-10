"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import React, { createContext, useContext, useState, ReactNode } from "react";
import M3IconButton from "./M3IconButton";

const SideNavContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
}>({ isExpanded: false, setIsExpanded: () => {} });

export function SideNavProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <SideNavContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SideNavContext.Provider>
  );
}

export const useSideNav = () => useContext(SideNavContext);

export default function SideNavRail() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isExpanded, setIsExpanded } = useSideNav();

  const navItems = [
    { id: "home", href: "/", label: t("nav.home"), icon: "home" },
    {
      id: "forecast",
      href: "/forecast",
      label: t("nav.forecast"),
      icon: "wb_sunny",
    },
    { id: "tips", href: "/tips", label: t("nav.tips"), icon: "lightbulb" },
    { id: "you", href: "/you", label: t("nav.you"), icon: "account_circle" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sticky left-0 top-0 z-50 hidden h-screen flex-col border-r border-outline-variant bg-surface-container transition-all duration-300 lg:flex shrink-0 ${
        isExpanded ? "w-80" : "w-24"
      }`}
    >
      <div className="flex h-20 items-center justify-center mt-6">
        <M3IconButton
          icon={isExpanded ? "menu_open" : "menu"}
          onClick={() => setIsExpanded(!isExpanded)}
          variant="standard"
        />
      </div>

      <div
        className={`flex items-center px-6 mb-10 mt-2 ${isExpanded ? "justify-start" : "justify-center"}`}
      >
        <Link href="/scan" className="w-full">
          <button
            className={`flex items-center bg-primary-container text-on-primary-container transition-all shadow-sm hover:shadow-md active:scale-95 ${
              isExpanded
                ? "px-6 h-14 rounded-2xl w-full gap-4"
                : "h-14 w-14 rounded-2xl justify-center mx-auto"
            }`}
          >
            <span className="material-symbols-rounded">photo_camera</span>
            {isExpanded && (
              <span className="text-sm font-semibold whitespace-nowrap">
                {t("nav.scan")}
              </span>
            )}
          </button>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex flex-col items-center outline-none transition-all w-full mb-3 last:mb-0`}
            >
              <div
                className={`relative flex items-center transition-all duration-300 rounded-full ${
                  isExpanded
                    ? `mx-3 w-[calc(100%-24px)] px-6 h-14 gap-4 ${active ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant hover:bg-on-surface/8"}`
                    : `w-14 h-8 justify-center ${active ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant hover:bg-on-surface/8"}`
                }`}
              >
                {active && !isExpanded && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-secondary-container"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`material-symbols-rounded relative z-10 transition-colors ${
                    active ? "material-symbols-rounded--filled" : ""
                  }`}
                >
                  {item.icon}
                </span>
                {isExpanded && (
                  <span
                    className={`relative z-10 text-sm font-medium transition-opacity duration-300 whitespace-nowrap ${
                      active
                        ? "text-on-secondary-container"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </div>

              {!isExpanded && (
                <span
                  className={`text-[11px] font-medium leading-none tracking-wide transition-colors mt-1 ${
                    active ? "text-on-surface" : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 flex justify-center">
        <Link
          href="/settings"
          className={`flex h-12 items-center rounded-full text-on-surface-variant transition-all hover:bg-on-surface/8 ${
            isExpanded
              ? "w-full justify-start px-4 gap-3"
              : "w-12 justify-center"
          }`}
        >
          <span className="material-symbols-rounded">settings</span>
          {isExpanded && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
