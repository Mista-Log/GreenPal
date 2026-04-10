"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  const tabs = [
    { id: "home", href: "/", label: t("nav.home"), icon: "home" },
    { id: "tips", href: "/tips", label: t("nav.tips"), icon: "lightbulb" },
    { id: "scan", href: "/scan", label: t("nav.scan"), icon: "camera" },
    { id: "you", href: "/you", label: t("nav.you"), icon: "person" },
  ];
  
  // Only show on the exact top-level routes for Home, Tips, and You
  const mainRoutes = tabs.map(t => t.href);
  function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href;
  }

  const shouldShow = mainRoutes.includes(pathname);

  if (!shouldShow) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 z-10 w-full max-w-(--app-shell-max) -translate-x-1/2 bg-surface-container pb-safe lg:hidden">
      <div className="flex h-20 items-center px-2 md:px-4">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              prefetch
              aria-current={active ? "page" : undefined}
              className={`group flex flex-1 flex-col items-center justify-center pt-3 pb-4 transition-all
                md:flex-row md:h-12 md:rounded-full md:gap-2 md:px-4 md:py-0
                ${active ? "md:bg-secondary-container" : "hover:bg-on-surface/8"}
              `}
            >
              <div
                className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors
                  ${active ? "bg-secondary-container md:bg-transparent" : "group-hover:bg-on-surface/12 md:group-hover:bg-transparent"}
                `}
              >
                <span
                  className={`material-symbols-rounded transition-colors ${
                    active
                      ? "material-symbols-rounded--filled text-on-secondary-container"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                >
                  {tab.icon}
                </span>
              </div>
              <p
                className={`mt-1 text-xs font-medium leading-4 tracking-[0.5px] transition-colors
                  md:mt-0 md:text-sm
                  ${active
                    ? "text-on-surface md:text-on-secondary-container font-semibold"
                    : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
              >
                {tab.label}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
