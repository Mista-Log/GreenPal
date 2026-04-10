"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import M3List from "@/components/M3List";
import M3IconButton from "@/components/M3IconButton";
import { homeRecentActivity } from "@/lib/mock-data";

export default function NotificationsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background px-4 md:px-6 lg:px-12 border-b border-outline-variant/10">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          variant="standard"
          aria-label="Go back"
        />
        <h1 className="text-lg font-semibold tracking-tight text-on-surface">
          {t("recent_activity.title", "Recent Activity")}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-35 pt-6 md:px-6 lg:px-12">
          <section>
            {homeRecentActivity.length > 0 ? (
              <M3List
                variant="divided-gap"
                items={homeRecentActivity.map((item) => ({
                  id: item.id,
                  label: t(`home.activity_types.${item.type}`),
                  icon:
                    item.type === "scan"
                      ? "camera"
                      : item.type === "tip"
                      ? "lightbulb"
                      : "chat_bubble",
                  subtitle:
                    item.title +
                    " · " +
                    item.occurred_at +
                    (item.confidence !== null
                      ? ` · ${t("home.confidence", { value: item.confidence })}`
                      : ""),
                }))}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-variant/50 mb-4">
                  <span className="material-symbols-rounded text-4xl text-on-surface-variant">
                    history
                  </span>
                </div>
                <h3 className="text-lg font-medium tracking-[0.15px] text-on-surface mb-2">
                  No Recent Activity
                </h3>
                <p className="text-sm text-on-surface-variant max-w-64">
                  When you scan crops, read tips, or ask questions, they will appear here.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
