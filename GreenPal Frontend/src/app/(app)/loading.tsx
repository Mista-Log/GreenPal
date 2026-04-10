export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) px-4 pb-35 pt-6">
        {/* TopBar placeholder */}
        <div className="flex h-12 items-center justify-between">
          <div className="skeleton h-10 w-32 rounded-full bg-surface-container" />
          <div className="skeleton h-10 w-10 rounded-full bg-surface-container" />
        </div>

        {/* Hero Card / Weather Card */}
        <div className="skeleton mt-6 h-51.5 rounded-3xl bg-surface-container-highest" />

        {/* Quick Access Grid */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="skeleton h-12 w-12 rounded-full bg-surface-container" />
              <div className="skeleton h-3 w-16 rounded-md bg-surface-container" />
            </div>
          ))}
        </div>

        {/* Recent Activity List */}
        <div className="mt-10 space-y-4">
          <div className="skeleton h-6 w-32 rounded-md bg-surface-container" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-4 py-2">
                <div className="skeleton h-10 w-10 shrink-0 rounded-full bg-surface-container" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded-md bg-surface-container" />
                  <div className="skeleton h-3 w-1/2 rounded-md bg-surface-container" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
