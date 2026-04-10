"use client";

import React from "react";
import { useRouter } from "next/navigation";
import M3List from "@/components/M3List";
import M3IconButton from "@/components/M3IconButton";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { tipsFeatured, tipsSoilCare, tipsOrganic } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BookmarksPage() {
  const router = useRouter();
  const { bookmarks } = useBookmarks();

  const allTips = [...tipsFeatured, ...tipsSoilCare, ...tipsOrganic];
  const bookmarkedTips = allTips.filter((tip) => bookmarks.includes(tip.slug));

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
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded text-primary">
            bookmark
          </span>
          <h1 className="text-lg font-semibold tracking-tight text-on-surface">
            Your Bookmarks
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col px-4 pb-35 pt-6 md:px-6">
          <main className="mt-6 md:px-0">
            {bookmarkedTips.length > 0 ? (
              <M3List
                variant="compact"
                items={bookmarkedTips.map((tip) => ({
                  id: tip.id,
                  label: tip.title,
                  avatar: tip.title.charAt(0).toUpperCase(),
                  subtitle: `${tip.duration_minutes} min • ${tip.category}`,
                  href: `/tips/${tip.slug}`,
                }))}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-20 flex flex-col items-center justify-center text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-high">
                  <span className="material-symbols-rounded text-5xl text-on-surface-variant/40">
                    bookmark_border
                  </span>
                </div>
                <h2 className="mt-6 text-xl font-medium text-on-surface">
                  No bookmarks yet
                </h2>
                <p className="mt-2 max-w-65 text-sm leading-5 tracking-[0.25px] text-on-surface-variant">
                  Tips you save while browsing will appear here for easy access.
                </p>
                <Link
                  href="/tips"
                  className="mt-8 flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-on-primary shadow-sm active:scale-95 transition-transform"
                >
                  Browse tips
                </Link>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
