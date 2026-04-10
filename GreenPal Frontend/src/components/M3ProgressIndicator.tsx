export type M3ProgressIndicatorProps = {
  progress: number; // 0 to 100
  variant?: "linear" | "circular";
  className?: string;
  size?: number; // mainly for circular
};

export default function M3ProgressIndicator({
  progress,
  variant = "linear",
  className = "",
  size = 48,
}: M3ProgressIndicatorProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  if (variant === "linear") {
    return (
      <div
        className={`h-1 w-full overflow-hidden rounded-full bg-surface-container-highest ${className}`}
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    );
  }

  // Circular variant
  const strokeWidth = Math.max(2, size * 0.1);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      role="progressbar"
      aria-valuenow={safeProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="var(--md-sys-color-surface-container-highest)"
          fill="transparent"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="var(--md-sys-color-primary)"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
    </div>
  );
}
