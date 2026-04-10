"use client";

import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { useGoals } from "@/hooks/use-goals";
import M3ProgressIndicator from "@/components/M3ProgressIndicator";
import M3IconButton from "@/components/M3IconButton";

export default function GoalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { getGoalById, toggleMilestone } = useGoals();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 10);
    };
    const scrollContainer = document.getElementById("goal-scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  const goal = getGoalById(id);

  if (!goal) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-2xl font-bold text-on-surface">Target Not Found</h1>
        <p className="mt-2 text-on-surface-variant">
          This performance target might have been removed.
        </p>
        <button
          onClick={() => router.push("/goals")}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { title, currentValue, targetValue, unit, icon, milestones } = goal;
  const progressPercent = Math.min(
    100,
    Math.round((currentValue / Math.max(0.0001, targetValue)) * 100),
  );

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className={`sticky top-0 z-50 flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-12 transition-colors duration-200 ${scrolled ? "bg-background border-b border-outline-variant/10" : "bg-surface-container"}`}>
        <div className="flex items-center gap-3">
          <M3IconButton
            icon="arrow_back"
            onClick={() => router.back()}
            variant="standard"
            aria-label="Go back"
          />
          <h1 className="text-lg font-semibold tracking-tight text-on-surface">
            Target Details
          </h1>
        </div>
        <M3IconButton
          icon="more_vert"
          variant="standard"
          aria-label="More options"
        />
      </header>

      <div id="goal-scroll-container" className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col pb-35">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-surface-container px-4 pb-12 pt-6 md:px-6 rounded-b-[40px] shadow-sm border-b border-outline-variant">
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl animate-pulse" />
                <M3ProgressIndicator
                  progress={progressPercent}
                  variant="circular"
                  size={160}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="material-symbols-rounded text-4xl text-primary">
                    {icon}
                  </span>
                  <span className="mt-1 text-3xl font-black tracking-tight text-on-surface">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-on-surface mb-2 px-4">
                  {title}
                </h1>
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-1.5 text-sm font-semibold text-on-secondary-container">
                  <span className="material-symbols-rounded text-base">
                    monitoring
                  </span>
                  {currentValue.toLocaleString()} / {targetValue.toLocaleString()}{" "}
                  {unit}
                </div>
              </div>
            </div>
          </section>

          {/* Milestones Section */}
          <section className="px-5 py-8 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-title-large font-bold tracking-tight text-on-surface">
                  Performance Steps
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Complete steps to track your progress
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  onClick={() => toggleMilestone(goal.id, milestone.id)}
                  className={`group flex flex-col gap-3 rounded-3xl p-5 cursor-pointer transition-all duration-300 border ${
                    milestone.isCompleted
                      ? "bg-surface-container border-primary/20 opacity-80"
                      : "bg-surface-container-highest border-transparent hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Custom Checkbox UI */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        milestone.isCompleted
                          ? "bg-primary text-on-primary scale-110 shadow-lg"
                          : "bg-surface text-on-surface-variant border-2 border-outline-variant"
                      }`}
                    >
                      <span className="material-symbols-rounded text-2xl">
                        {milestone.isCompleted ? "done_all" : "circle"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col pt-1">
                      <h3
                        className={`text-base font-bold transition-all duration-300 ${
                          milestone.isCompleted
                            ? "text-on-surface/50 line-through"
                            : "text-on-surface"
                        }`}
                      >
                        {milestone.title}
                      </h3>

                      <div
                        className={`mt-2 overflow-hidden transition-all duration-500 ${
                          milestone.isCompleted
                            ? "max-h-0 opacity-0"
                            : "max-h-40 opacity-100"
                        }`}
                      >
                        <div className="flex items-start gap-2 rounded-xl bg-primary/5 p-3 text-xs leading-relaxed text-on-surface-variant italic">
                          <span className="material-symbols-rounded text-primary text-sm shrink-0">
                            info
                          </span>
                          {milestone.reasoning}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-transform duration-300 ${milestone.isCompleted ? "rotate-0 text-primary" : "text-on-surface-variant/40"}`}
                    >
                      <span className="material-symbols-rounded">
                        {milestone.isCompleted ? "check" : "chevron_right"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action - Dynamic Suggestion */}
            <div className="mt-12 overflow-hidden rounded-4xl bg-tertiary-container shadow-sm border border-tertiary/10">
              <div className="p-8 text-center bg-linear-to-br from-tertiary-container/50 to-tertiary-container">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-tertiary text-on-tertiary shadow-lg">
                  <span className="material-symbols-rounded text-3xl">
                    lightbulb
                  </span>
                </div>
                <h4 className="text-xl font-black text-on-tertiary-container mb-2 tracking-tight">
                  Farm Intelligence
                </h4>
                <p className="text-sm leading-relaxed text-on-tertiary-container/80 mb-6 font-medium">
                  {progressPercent > 50
                    ? `You're in the top 10% of farmers tracking ${unit}. Keeping humidity under control is your next win.`
                    : `Data shows that early ${milestones[0].title} reduces later input costs by up to 22%.`}
                </p>
                <button className="w-full rounded-2xl bg-on-tertiary-container py-4 text-center text-sm font-bold text-tertiary-container shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                  View Detailed Report
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
