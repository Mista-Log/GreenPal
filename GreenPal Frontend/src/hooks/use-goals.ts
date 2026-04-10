"use client";

import { useCallback } from "react";
import { FarmGoal, farmGoals as initialGoals } from "@/lib/mock-data";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "gs_farm_goals";

export function useGoals() {
  const { value: goals, setValue: setGoals } = useLocalStorage<FarmGoal[]>(
    STORAGE_KEY,
    initialGoals
  );

  const toggleMilestone = useCallback(
    (goalId: string, milestoneId: string) => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id !== goalId) return goal;

          const updatedMilestones = goal.milestones.map((m) =>
            m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
          );

          const completedCount = updatedMilestones.filter(
            (m) => m.isCompleted
          ).length;
          const totalCount = updatedMilestones.length;
          const progressRatio = totalCount > 0 ? completedCount / totalCount : 0;
          const newValue = goal.targetValue * progressRatio;

          return {
            ...goal,
            milestones: updatedMilestones,
            currentValue: newValue,
            status: newValue >= goal.targetValue ? "completed" : "active",
          };
        })
      );
    },
    [setGoals]
  );

  const getGoalById = useCallback(
    (id: string) => goals.find((g) => g.id === id),
    [goals]
  );

  return {
    goals,
    getGoalById,
    toggleMilestone,
  };
}
