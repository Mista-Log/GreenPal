"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import M3IconButton from "@/components/M3IconButton";

export default function FeedbackPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("experience");

  const categories = [
    { id: "bug", label: "Bug Report", icon: "bug_report" },
    { id: "feature", label: "Feature Request", icon: "add_circle" },
    { id: "experience", label: "Experience", icon: "sentiment_satisfied" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background px-4 md:px-6 lg:px-12 border-b border-outline-variant/10">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          variant="standard"
          aria-label="Go back"
        />
        <h1 className="text-lg font-semibold tracking-tight text-on-surface">
          Feedback
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-35 pt-6 md:px-6 lg:px-12">
          <section className="rounded-4xl bg-surface-container-high p-6 md:p-8 border border-outline-variant/20">
            <h2 className="text-lg font-medium text-on-surface mb-2">Share your thoughts</h2>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              Help us build the most effective tool for your farm. Whether it&apos;s a bug or a new idea, we value your input.
            </p>

            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant mb-4 px-1">
                Select Category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex h-8 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all active:scale-95 ${
                      selectedCategory === cat.id
                        ? "bg-secondary-container border-secondary-container text-on-secondary-container shadow-sm"
                        : "border-outline text-on-surface-variant hover:bg-on-surface/8"
                    }`}
                  >
                    <span className="material-symbols-rounded text-lg">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant mb-4 px-1">
                Your Message
              </p>
              <textarea
                className="w-full min-h-40 rounded-2xl bg-surface-container-highest p-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none border-2 border-transparent focus:border-primary transition-all resize-none"
                placeholder="Tell us everything..."
              />
            </div>

            <button className="flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-medium tracking-[0.1px] text-on-primary shadow-sm transition-all hover:bg-primary/95 hover:shadow-md active:scale-[0.99]">
              Submit Feedback
            </button>
          </section>

          {/* Alternative Support Channels */}
          <section className="mt-12 mb-12">
            <h2 className="text-lg font-medium text-on-surface mb-6 px-1">Other ways to connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => router.push("/help/contact")}
                className="flex items-center gap-4 rounded-2xl bg-surface-container p-4 transition-all hover:bg-surface-container-high text-left border border-outline-variant/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <span className="material-symbols-rounded">support_agent</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-on-surface">Talk to an expert</h3>
                  <p className="text-xs text-on-surface-variant">Get specialized ag-tech assistance</p>
                </div>
              </button>
              <button 
                className="flex items-center gap-4 rounded-2xl bg-surface-container p-4 transition-all hover:bg-surface-container-high text-left border border-outline-variant/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-rounded">forum</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-on-surface">Community Forum</h3>
                  <p className="text-xs text-on-surface-variant">Discuss with other Greenpal farmers</p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
