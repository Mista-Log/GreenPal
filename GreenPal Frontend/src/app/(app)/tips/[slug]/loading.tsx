export default function Loading() {
  return (
    <div className="min-h-screen bg-(--md-sys-color-background)">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) pb-10">
        <div className="skeleton h-99 w-full bg-surface-container" />

        <main className="px-4 pb-10 pt-6">
          <div className="skeleton h-7 w-55 rounded-lg bg-surface-container" />
          <div className="skeleton mt-3 h-4 w-40 rounded-lg bg-surface-container" />
          <div className="skeleton mt-5 h-12 w-full rounded-full bg-surface-container" />
          <div className="mt-6 space-y-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="skeleton h-3 w-full rounded-lg bg-surface-container"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
