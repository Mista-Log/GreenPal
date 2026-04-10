"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  tipCategories,
  tipsFeatured,
  tipsOrganic,
  tipsSoilCare,
  Tip,
} from "@/lib/mock-data";
import AppTopBar from "@/components/AppTopBar";

const detailHref = (slug: string) => `/tips/${slug}`;

export default function TipsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allTips = useMemo(() => {
    return [...tipsFeatured, ...tipsSoilCare, ...tipsOrganic];
  }, []);

  const filteredTips = useMemo(() => {
    if (!selectedCategory) return [];
    // Case insensitive filter to handle "Soil Care" vs "Farm" etc.
    return allTips.filter(
      (tip) => tip.category.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [selectedCategory, allTips]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((current) => (current === category ? null : category));
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="relative min-h-screen w-full overflow-x-hidden pb-35 lg:max-w-none">
        <AppTopBar showBack={false} />
        
        {/* Sticky Category Bar */}
        <div className="sticky top-18 z-20 bg-background w-full pt-4 pb-2">
          <div className="mx-auto max-w-7xl">
            <div className="flex overflow-x-auto gap-2 no-scrollbar px-4 pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex h-8 shrink-0 items-center justify-center rounded-lg border border-solid px-4 text-sm font-medium transition-colors whitespace-nowrap
                  ${
                    !selectedCategory
                      ? "bg-secondary-container border-secondary-container text-on-secondary-container shadow-sm"
                      : "border-outline text-on-surface-variant hover:bg-on-surface/8"
                  }`}
              >
                {t("tips.all")}
              </button>
              {tipCategories.map((chip) => {
                const isActive = selectedCategory === chip;
                return (
                    <button
                      key={chip}
                      onClick={() => handleCategoryClick(chip)}
                      className={`flex h-8 shrink-0 items-center justify-center rounded-lg border border-solid px-4 text-sm font-medium whitespace-nowrap transition-colors
                        ${
                          isActive
                            ? "bg-secondary-container border-secondary-container text-on-secondary-container shadow-sm"
                            : "border-outline text-on-surface-variant hover:bg-on-surface/8"
                        }`}
                    >
                      {t(`tips.categories.${chip.toLowerCase().replace(/ /g, "_")}`)}
                    </button>
                );
              })}
            </div>
          </div>
        </div>

        <main className="mx-auto space-y-8 px-4 pt-4 md:px-6 lg:px-12 max-w-7xl">
          {selectedCategory ? (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium text-on-surface">
                  {t(`tips.categories.${selectedCategory.toLowerCase().replace(/ /g, "_")}`)}
                </h2>
                <span className="text-sm text-on-surface-variant">
                  {t("tips.results", { count: filteredTips.length })}
                </span>
              </div>

              {filteredTips.length > 0 ? (
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 overflow-hidden">
                  <div className="flex overflow-x-auto gap-5 no-scrollbar pb-4">
                    {filteredTips.map((card) => (
                      <Link
                        key={card.id}
                        href={detailHref(card.slug)}
                        className="group block w-72 shrink-0 md:w-80"
                      >
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="mt-3">
                          <h3 className="text-base font-medium leading-6 text-on-surface line-clamp-2">
                            {card.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-rounded text-lg">
                              headphones
                            </span>
                            {t("tips.min", { count: card.duration_minutes })} •{" "}
                            {t(`tips.categories.${card.category.toLowerCase().replace(/ /g, "_")}`)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high mb-6">
                    <span className="material-symbols-rounded text-4xl text-on-surface-variant">
                      content_paste_off
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-on-surface mb-2">
                    {t("tips.no_results")}
                  </h3>
                  <p className="max-w-70 text-sm text-on-surface-variant mb-8 leading-relaxed">
                    {t("tips.no_results_desc", { category: t(`tips.categories.${selectedCategory.toLowerCase().replace(/ /g, "_")}`) })}
                  </p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-on-primary shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
                  >
                    {t("tips.show_all")}
                  </button>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Featured Section */}
              <section>
                <div className="mb-3 text-base font-medium leading-6 tracking-[0.15px] text-on-surface-variant">
                  {t("tips.featured")}
                </div>
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 overflow-hidden">
                  <div className="flex overflow-x-auto gap-5 no-scrollbar pb-4">
                    {tipsFeatured.map((card) => (
                      <Link
                        key={card.id}
                        href={detailHref(card.slug)}
                        className="relative aspect-video w-75 md:w-[400px] lg:w-[450px] shrink-0 overflow-hidden rounded-2xl group"
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
                        <div className="absolute left-4 right-4 bottom-9 text-xl font-normal leading-8 text-white line-clamp-2 md:text-3xl md:leading-9">
                          {card.title}
                        </div>
                        <div className="absolute left-4 bottom-3 flex items-center gap-1.5 text-sm leading-5 tracking-[0.25px] text-white">
                          <span className="material-symbols-rounded text-xl text-white">
                            headphones
                          </span>
                          {t("tips.min", { count: card.duration_minutes })} •{" "}
                          {t(`tips.categories.${card.category.toLowerCase().replace(/ /g, "_")}`)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Personalized Banner */}
              <section className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0 h-15.5 w-15.5 overflow-hidden rounded-xl bg-surface-container-high">
                    <Image
                      src="/figma/tips-personalized.png"
                      alt="Personalized tips"
                      fill
                      className="object-cover"
                      sizes="62px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium leading-6 text-on-surface">
                      {t("tips.personalized_title")}
                    </p>
                    <p className="mt-1 text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
                      {t("tips.personalized_desc")}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm font-medium tracking-wide text-primary">
                    {t("tips.get_started")}
                  </button>
                </div>
              </section>

              {/* Soil Care Section */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-base font-medium leading-6 tracking-[0.15px] text-on-surface-variant">
                    {t("tips.categories.soil_care")}
                  </p>
                  <button className="text-sm font-medium tracking-[0.1px] text-primary">
                    {t("tips.see_all")}
                  </button>
                </div>
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 overflow-hidden">
                  <div className="flex overflow-x-auto gap-5 no-scrollbar pb-4">
                    {tipsSoilCare.map((card) => (
                      <Link
                        key={card.id}
                        href={detailHref(card.slug)}
                        className="w-72 shrink-0 group"
                      >
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="mt-3.5">
                          <p className="text-base font-medium leading-6 text-on-surface line-clamp-1">
                            {card.title}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-rounded text-xl">
                              headphones
                            </span>
                            {t("tips.min", { count: card.duration_minutes })} • {t(`tips.categories.${card.category.toLowerCase().replace(/ /g, "_")}`)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Organic Farming Section */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-base font-medium leading-6 tracking-[0.15px] text-on-surface-variant">
                    {t("tips.categories.organic_farming")}
                  </p>
                  <button className="text-sm font-medium tracking-[0.1px] text-primary">
                    {t("tips.see_all")}
                  </button>
                </div>
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 overflow-hidden">
                  <div className="flex overflow-x-auto gap-5 no-scrollbar pb-4">
                    {tipsOrganic.map((card) => (
                      <Link
                        key={card.id}
                        href={detailHref(card.slug)}
                        className="w-72 shrink-0 group"
                      >
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="mt-3.5">
                          <p className="text-base font-medium leading-6 text-on-surface line-clamp-1">
                            {card.title}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-rounded text-xl">
                              headphones
                            </span>
                            {t("tips.min", { count: card.duration_minutes })} • {t(`tips.categories.${card.category.toLowerCase().replace(/ /g, "_")}`)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
