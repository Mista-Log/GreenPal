"use client";
import BottomNav from "@/components/BottomNav";
import FabMenu from "@/components/FabMenu";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { usePathname } from "next/navigation";

const mainBaseRoutes = ["/", "/tips", "/you"];

const globalFabActions = [
  { id: "fab_chat", label: "Chat", href: "/chat", icon: "forum" },
  { id: "fab_goal", label: "Goal", href: "/goals", icon: "flag" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMainPage = mainBaseRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* FAB Container - positioned above BottomNav, hidden when profile/search open */}
      <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none pb-[calc(env(safe-area-inset-bottom)+80px)] fab-container">
        <div className="mx-auto w-full max-w-(--app-shell-max) px-6 md:px-8 flex justify-end">
          {isMainPage && (
            <div className="pointer-events-auto">
              <FabMenu
                actions={globalFabActions}
                onVoiceTrigger={() => {
                  window.dispatchEvent(new CustomEvent("gs-trigger-voice"));
                }}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav />

      <style jsx global>{`
        body.profile-open .fab-container {
          display: none;
        }
      `}</style>
    </div>
  );
}
