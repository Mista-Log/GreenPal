export type GoalMilestone = {
  id: string;
  title: string;
  isCompleted: boolean;
  reasoning?: string;
};

export type FarmGoal = {
  id: string;
  title: string;
  category: "Crops" | "Livestock" | "Soil Health" | "Business";
  currentValue: number;
  targetValue: number;
  unit: string;
  icon: string | undefined;
  imageUrl?: string;
  status: "active" | "completed";
  milestones: GoalMilestone[];
};

export type CreateGoalPayload = {
  user_id: string;
  title: string;
  category: "Crops" | "Livestock" | "Soil Health" | "Business";
  currentValue: number;
  targetValue: number;
  unit: string;
  icon?: string;
  imageUrl?: string;
  status: "active" | "completed";
  milestones: {
    title: string;
    isCompleted: boolean;
    reasoning?: string;
  }[];
};

export type ApiMessageResponse = {
  message: string;
  goal_id?: string;
};