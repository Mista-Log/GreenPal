export default function GoalsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) px-4 pb-35 pt-6 md:px-6">
        {/* Header placeholder */}
        <div className="flex items-center gap-3">
          <div className="skeleton h-11 w-11 shrink-0 rounded-full bg-surface-container" />
          <div className="space-y-2">
            <div className="skeleton h-7 w-48 rounded-md bg-surface-container" />
            <div className="skeleton h-4 w-64 rounded-md bg-surface-container" />
          </div>
        </div>

        {/* Goals Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-45 rounded-2xl bg-surface-container shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
