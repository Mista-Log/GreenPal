"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import M3IconButton from "@/components/M3IconButton";

export default function RequestFeaturePage() {
  const router = useRouter();
  const [priority, setPriority] = useState("medium");

  const priorities = [
    { id: "low", label: "Low", icon: "arrow_downward" },
    { id: "medium", label: "Medium", icon: "horizontal_rule" },
    { id: "high", label: "High", icon: "priority_high" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Standardized Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background border-b border-outline-variant/10 px-4 md:px-6 lg:px-12">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          aria-label="Back"
        />
        <h1 className="text-xl font-medium tracking-tight text-on-surface">
          Request a Feature
        </h1>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-35 pt-6 md:px-6 lg:px-12">

        <section className="mb-10 px-1 max-w-2xl">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Have an idea to make Greenpal even better for your farm? Tell us about it. Our engineering team reviews every request to prioritize future updates.
          </p>
        </section>

        <section className="rounded-4xl bg-surface-container-low p-6 md:p-10 border border-outline-variant/10 shadow-sm">
          <div className="space-y-8">
            {/* Feature Name */}
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-primary mb-3 block px-1">
                Feature Name
              </label>
              <input
                type="text"
                placeholder="Ex: Soil sensors integration"
                className="w-full h-14 rounded-2xl bg-surface-container-highest px-6 text-base text-on-surface placeholder:text-on-surface-variant/50 outline-none border-2 border-transparent focus:border-primary transition-all"
              />
            </div>

            {/* Feature Priority Chips */}
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-primary mb-4 block px-1">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id)}
                    className={`flex h-8 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all active:scale-95 ${
                      priority === p.id
                        ? "bg-secondary-container border-secondary-container text-on-secondary-container shadow-sm"
                        : "border-outline text-on-surface-variant hover:bg-on-surface/8"
                    }`}
                  >
                    <span className="material-symbols-rounded text-lg">{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Description */}
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-primary mb-3 block px-1">
                Description
              </label>
              <textarea
                placeholder="How should this benefit farmers?"
                className="w-full min-h-45 rounded-3xl bg-surface-container-highest p-6 text-base leading-relaxed text-on-surface placeholder:text-on-surface-variant/50 outline-none border-2 border-transparent focus:border-primary transition-all resize-none"
              />
            </div>
          </div>

          <div className="mt-12">
            <button className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-base font-medium text-on-primary shadow-sm transition-all hover:bg-primary/95 hover:shadow-md active:scale-[0.98]">
              <span className="material-symbols-rounded">rocket_launch</span>
              Submit Feature Request
            </button>
          </div>
        </section>

        {/* M3 Community section */}
        <section className="mt-12 mb-12 flex flex-col items-center text-center p-8 bg-surface-container-high rounded-4xl border border-outline-variant/10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-rounded text-3xl">groups_3</span>
          </div>
          <h2 className="text-lg font-medium text-on-surface mb-2">Vote on existing features</h2>
          <p className="text-sm text-on-surface-variant mb-6 max-w-sm">
            Check our roadmap on GitHub to see what we&apos;re already building and vote for your favorites.
          </p>
          <button 
            className="h-11 rounded-full px-8 text-sm font-medium border border-outline text-on-surface transition-colors hover:bg-on-surface/5"
            onClick={() => window.open('https://github.com/shegs8422/greenpal/discussions', '_blank')}
          >
            Visit Community discussions
          </button>
        </section>
      </div>
    </div>
  );
}
