"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import M3GoalCard from "@/components/M3GoalCard";
import M3IconButton from "@/components/M3IconButton";
import { useGoals } from "@/hooks/use-goals";
import { FarmGoal } from "@/lib/types";
import { getMe, getUserGoals } from "@/lib/api";


export default function GoalsPage() {
  const router = useRouter();

  const [goals, setGoals] = useState<FarmGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: get logged in user
        const user = await getMe();
         
        // Step 2: fetch goals with user.id
        const userGoals = await getUserGoals(user.id);

        setGoals(userGoals || []);
      } catch (err: any) {
        console.error("Failed to fetch goals:", err);
        setError(err.message || "Failed to load goals");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);
  const { t } = useTranslation();
  const { goals } = useGoals();

  const activeCount = goals.filter(
    (g: FarmGoal) => g.status === "active"
  ).length;

  const completedCount = goals.filter(
    (g: FarmGoal) => g.status === "completed"
  ).length;

  if (loading) {
    return <GoalsSkeleton router={router} />;
  }

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
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight text-on-surface">
            {t("you.growth_targets")}
          </h1>
          <p className="text-[11px] font-medium leading-none text-on-surface-variant">
            {t("you.growth_targets_status", { active: activeCount, completed: completedCount })}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col px-4 pb-35 pt-6 md:px-6">
          <section className="mt-2">
            {goals.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal: FarmGoal) => (
                  <M3GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-rounded mb-4 text-6xl text-on-surface-variant/20">
                  assignment_turned_in
                </span>
                <h3 className="text-lg font-medium text-on-surface">
                  {t("you.no_goals")}
                </h3>
                <p className="max-w-60 text-sm text-on-surface-variant">
                  {t("you.no_goals_desc")}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
