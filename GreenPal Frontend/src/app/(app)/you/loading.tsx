export default function YouLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) pb-35 pt-6">
        {/* TopBar placeholder */}
        <div className="flex px-4 items-center justify-between">
          <div className="skeleton h-10 w-32 rounded-full bg-surface-container" />
          <div className="skeleton h-10 w-10 rounded-full bg-surface-container" />
        </div>

        <main className="px-4 pt-8 space-y-10">
          {/* Profile Summary card placeholder */}
          <section className="skeleton h-44 w-full rounded-3xl bg-surface-container-low" />

          {/* Section 1: Community horizontal scroll placeholder */}
          <div>
            <div className="skeleton mb-3 h-5 w-32 rounded-md bg-surface-container" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="skeleton h-44 w-33 rounded-xl bg-surface-container"
                />
              ))}
            </div>
          </div>

          {/* Section 2: Goals horizontal scroll placeholder */}
          <div>
            <div className="skeleton mb-3 h-5 w-32 rounded-md bg-surface-container" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="skeleton h-44 w-33 rounded-xl bg-surface-container-low"
                />
              ))}
            </div>
          </div>

          {/* Section 3: Badges placeholder */}
          <div>
            <div className="skeleton mb-3 h-5 w-24 rounded-md bg-surface-container" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="skeleton aspect-square h-32 rounded-full bg-surface-container" />
                  <div className="skeleton h-4 w-20 rounded-md bg-surface-container" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
