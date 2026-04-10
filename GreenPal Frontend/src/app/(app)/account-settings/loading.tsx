export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="mx-auto w-full max-w-(--app-shell-max) pt-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3">
          <div className="skeleton h-11 w-11 rounded-full bg-surface-container" />
          <div className="skeleton h-6 w-40 rounded-lg bg-surface-container" />
        </div>

        {/* Profile Card Skeleton */}
        <div className="mt-6 rounded-[20px] bg-surface-container p-5">
          <div className="flex items-center gap-4">
            <div className="skeleton h-12 w-12 rounded-full bg-surface-container-highest" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-5 w-32 rounded bg-surface-container-highest" />
              <div className="skeleton h-3 w-48 rounded bg-surface-container-highest" />
            </div>
          </div>
          <div className="skeleton mt-4 h-11 w-full rounded-full bg-surface-container-highest" />
        </div>

        {/* Preferences List Skeleton */}
        <div className="mt-8">
          <div className="skeleton mb-4 h-4 w-24 rounded bg-surface-container" />
          <div className="space-y-1 overflow-hidden rounded-[20px] bg-surface-container">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="skeleton h-6 w-6 rounded bg-surface-container-highest" />
                <div className="skeleton h-5 flex-1 rounded bg-surface-container-highest" />
                <div className="skeleton h-6 w-6 rounded bg-surface-container-highest" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
