"use client";

import { useRouter } from "next/navigation";
import M3List from "@/components/M3List";
import M3IconButton from "@/components/M3IconButton";

export default function HelpPage() {
  const router = useRouter();

  const categories = [
    { id: "getting-started", icon: "rocket_launch", label: "Getting Started", desc: "Guides for new farmers" },
    { id: "scans", icon: "document_scanner", label: "Crop Scans", desc: "Diagnosing pests & disease" },
    { id: "tips", icon: "lightbulb", label: "Tips Library", desc: "Sustainable farming practices" },
    { id: "ai-assistant", icon: "auto_awesome", label: "Greenpal AI", desc: "Using the voice assistant" },
    { id: "goals", icon: "target", label: "Goals & Targets", desc: "Tracking your farm growth" },
    { id: "weather", icon: "partly_cloudy_day", label: "Weather & Soil", desc: "Forecasts and moisture" },
  ];

  const recentUpdates = [
    { title: "Greenpal AI Assistant", desc: "Ask questions naturally using voice or chat.", icon: "auto_awesome" },
    { title: "Goals Rebranding", desc: "Growth targets are now Goals, with easier tracking for your progress.", icon: "check_circle" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Standardized Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background border-b border-outline-variant/10 px-4 md:px-6 lg:px-12">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          aria-label="Back"
        />
        <h1 className="text-xl font-medium tracking-tight text-on-surface">
          Help Center
        </h1>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-35 pt-6 md:px-6 lg:px-12 overflow-y-auto">
        {/* M3 Search Bar */}
        <section className="mb-10">
          <div className="flex h-14 w-full items-center gap-4 rounded-full bg-surface-container-high px-5 border border-outline-variant/30">
            <span className="material-symbols-rounded text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search help topics..." 
              className="flex-1 bg-transparent text-base text-on-surface placeholder:text-on-surface-variant outline-none"
            />
          </div>
        </section>

        {/* What's New - Horizontal Carousel (Strict M3 Elevated Cards) */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2 px-1">
            <span className="material-symbols-rounded text-primary">new_releases</span>
            <h2 className="text-lg font-medium text-on-surface">What&apos;s New</h2>
          </div>
          
          <div className="relative -mx-4 px-4 overflow-hidden">
            <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
              {recentUpdates.map((update, idx) => (
                <div 
                  key={idx} 
                  className="w-72 shrink-0 md:w-80 rounded-[28px] bg-surface-container-low p-6 border border-outline-variant/20 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                    <span className="material-symbols-rounded text-2xl">{update.icon}</span>
                  </div>
                  <h3 className="text-base font-medium text-on-surface">{update.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                    {update.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid (M3 Large Cards) */}
        <section>
          <h2 className="mb-6 text-lg font-medium text-on-surface px-1">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => router.push(`/help/${cat.id}`)}
                className="flex flex-col items-start gap-4 rounded-[28px] bg-surface-container-low p-6 text-left transition-all hover:bg-surface-container hover:shadow-md active:scale-[0.98] border border-outline-variant/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                  <span className="material-symbols-rounded text-2xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-on-surface">{cat.label}</h3>
                  <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Support CTA - Strictly M3 Tonal */}
        <section className="mt-12 rounded-4xl bg-primary-container p-8 text-center text-on-primary-container relative overflow-hidden mb-12 border border-primary/10">
          <div className="absolute top-0 right-0 h-40 w-40 -mr-10 -mt-10 rounded-full bg-on-primary-container/10 border-4 border-on-primary-container/10" />
          <h2 className="text-xl font-medium mb-2">Still need support?</h2>
          <p className="text-sm mb-6 opacity-90 max-w-sm mx-auto leading-relaxed">
            Our specialized agronomy and tech team is ready to help you thrive.
          </p>
          <button 
            onClick={() => router.push("/feedback/contact")}
            className="h-12 rounded-full bg-on-primary-container px-10 text-sm font-medium text-primary-container shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            Contact the Team
          </button>
        </section>
      </div>
    </div>
  );
}
