export default function ForecastLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header bar placeholder */}
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-background px-4 py-3 border-b border-outline-variant/10">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full bg-surface-container" />
        <div className="skeleton h-7 w-32 rounded-md bg-surface-container" />
      </div>

      <main className="px-4 py-6 space-y-8 max-w-7xl mx-auto">
        {/* Main Weather Card placeholder */}
        <div className="skeleton h-56 w-full rounded-3xl bg-surface-container-highest" />

        {/* AI Advisory placeholder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="skeleton h-5 w-40 rounded-md bg-surface-container" />
            <div className="skeleton h-10 w-10 rounded-full bg-surface-container" />
          </div>
          <div className="skeleton h-32 w-full rounded-2xl bg-surface-container" />
        </div>

        {/* Weekly View placeholders */}
        <div className="space-y-4 pt-2">
          <div className="skeleton h-6 w-32 rounded-md bg-surface-container" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className="skeleton h-32 w-full rounded-2xl bg-surface-container-low"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
