export default function TipsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) px-4 pb-35 pt-6">
        {/* Header with back button placeholder */}
        <div className="flex h-12 items-center gap-4">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full bg-surface-container" />
          <div className="skeleton h-10 w-48 rounded-md bg-surface-container" />
        </div>

        {/* Category Chips scroll placeholder */}
        <div className="mt-8 flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="skeleton h-8 w-24 shrink-0 rounded-lg bg-surface-container"
            />
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-10 space-y-4">
          <div className="skeleton h-6 w-32 rounded-md bg-surface-container" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="skeleton aspect-video w-full rounded-2xl bg-surface-container-highest" />
            <div className="skeleton aspect-video w-full rounded-2xl bg-surface-container-highest" />
          </div>
        </div>

        {/* List Section */}
        <div className="mt-12 space-y-4">
          <div className="skeleton h-6 w-48 rounded-md bg-surface-container" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-3">
                <div className="skeleton aspect-video w-full rounded-2xl bg-surface-container" />
                <div className="skeleton h-4 w-5/6 rounded-md bg-surface-container" />
                <div className="skeleton h-3 w-1/2 rounded-md bg-surface-container" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
