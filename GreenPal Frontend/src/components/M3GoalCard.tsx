import Link from "next/link";
import { FarmGoal } from "@/lib/mock-data";

export type M3GoalCardProps = {
  goal: FarmGoal;
  className?: string;
};

export default function M3GoalCard({
  goal,
  className = "",
}: M3GoalCardProps) {
  const { id, title, currentValue, targetValue, unit } = goal;
  
  const safeTarget = Math.max(0.0001, targetValue);
  const progressPercent = Math.min(100, Math.max(0, (currentValue / safeTarget) * 100));

  // Format the values for display
  const formattedCurrent = currentValue.toLocaleString();
  const formattedTarget = targetValue.toLocaleString();

  return (
    <Link
      href={`/goals/${id}`}
      className={`group relative flex h-45 flex-col justify-end overflow-hidden rounded-2xl bg-surface-container transition-all hover:bg-surface-container-high ${className}`}
    >
      {/* Background Image with Gradient Overlay */}
      {/* Card Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-on-surface">
            {title}
          </h3>
          
          {/* Progress Section */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end text-xs font-semibold text-on-surface-variant">
              <span>{Math.round(progressPercent)}% Achieved</span>
              <span className="text-[10px] opacity-80">{formattedCurrent} / {formattedTarget} {unit}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-outline-variant">
              <div 
                className="h-full bg-primary transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
