"use client";

import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { use, useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AudioPlayer from "@/components/AudioPlayer";
import BookmarkButton from "@/components/BookmarkButton";
import M3IconButton from "@/components/M3IconButton";
import { tipsFeatured, tipsSoilCare, tipsOrganic } from "@/lib/mock-data";

export default function TipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = use(params);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 100);
    };
    const scrollContainer = document.getElementById("tip-detail-scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  // Search through all tips to find the one matching the slug
  const allTips = useMemo(() => [...tipsFeatured, ...tipsSoilCare, ...tipsOrganic], []);
  const tip = allTips.find((t) => t.slug === slug);

  if (!tip) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header 
        className={`sticky top-0 z-50 flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-12 transition-all duration-300 ${
          scrolled 
            ? "bg-background border-b border-outline-variant/10 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <M3IconButton
            icon="arrow_back"
            onClick={() => router.back()}
            variant="standard"
            className={scrolled ? "text-on-surface" : "bg-black/20 text-white backdrop-blur-md"}
            aria-label="Go back"
          />
          <h1 
            className={`text-lg font-semibold tracking-tight transition-opacity duration-300 ${
              scrolled ? "opacity-100 text-on-surface" : "opacity-0 pointer-events-none"
            }`}
          >
            {tip.title}
          </h1>
        </div>
        <div className={scrolled ? "text-on-surface" : "bg-black/20 rounded-full backdrop-blur-md"}>
          <BookmarkButton slug={tip.slug} />
        </div>
      </header>

      <div id="tip-detail-scroll-container" className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col pb-35">
          <div className="relative -mt-16 h-99 w-full overflow-hidden">
            <Image
              src={tip.image || "/figma/tip-detail-hero.png"}
              alt={tip.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
          </div>

          <main className="px-5 pb-10 pt-8 md:px-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-on-surface">
                {tip.title}
              </h1>
              <div className="flex items-center gap-2.5 text-sm font-medium text-on-surface-variant">
                <span className="material-symbols-rounded text-xl">
                  headphones
                </span>
                {t("tips.min", { count: tip.duration_minutes })} • {t(`tips.categories.${tip.category.toLowerCase().replace(/ /g, "_")}`)}
              </div>
            </div>

            <div className="mt-8">
              <AudioPlayer duration={tip.duration_minutes} title={tip.title} />
            </div>

            <div className="mt-10 space-y-6">
              <p className="text-lg leading-relaxed text-on-surface">
                {tip.title} is an essential part of modern farming. This guide will
                help you understand the best practices and techniques to achieve
                the best results in your farm.
              </p>
              <div className="rounded-3xl bg-surface-container p-6 border border-outline-variant/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                  Key Principles
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Detailed instructions for {tip.category} often depend on local
                  conditions, but the fundamental principles remain the same. Always
                  ensure you are following sustainable methods to preserve your soil
                  health for future seasons.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
