export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) px-4 pb-10 pt-8">
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-10 rounded-lg bg-surface-container" />
        </div>

        <div className="mt-8 space-y-2.5">
          <div className="skeleton h-7 w-55 rounded-xl bg-surface-container" />
          <div className="skeleton h-3 w-65 rounded-lg bg-surface-container" />
        </div>

        <div className="mt-6 space-y-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="skeleton h-3 w-22.5 rounded-lg bg-surface-container" />
              <div className="skeleton h-12 w-full rounded-xl bg-surface-container-highest" />
            </div>
          ))}
          <div className="skeleton h-12 w-full rounded-full bg-surface-container" />
        </div>

        <div className="mt-6 space-y-3">
          <div className="skeleton h-12 w-full rounded-full bg-surface-container" />
          <div className="skeleton mx-auto h-3 w-55 rounded-lg bg-surface-container" />
        </div>
      </div>
    </div>
  );
}
