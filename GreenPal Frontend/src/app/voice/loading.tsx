export default function Loading() {
  return (
    <div className="min-h-screen bg-(--md-sys-color-background)">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) pb-15">
        <header className="sticky top-0 z-20 bg-(--md-sys-color-background) px-5 pt-3">
          <div className="flex items-center gap-3">
            <div className="skeleton h-11 w-11 rounded-full bg-surface-container" />
            <div className="skeleton h-4.5 w-35 rounded-lg bg-surface-container" />
          </div>
        </header>

        <main className="px-5 pt-5">
          <section className="rounded-[20px] bg-surface-container p-4.5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="skeleton h-4 w-40 rounded-lg bg-surface-container-highest" />
                <div className="skeleton h-3 w-47.5 rounded-lg bg-surface-container-highest" />
              </div>
              <div className="skeleton h-16 w-16 rounded-full bg-surface-container-highest" />
            </div>

            <div className="skeleton mt-4 h-18 rounded-[14px] bg-surface-container-highest" />
            <div className="skeleton mt-3.5 h-11 rounded-xl bg-surface-container-highest" />
            <div className="skeleton mt-3.5 h-11 rounded-full bg-surface-container-highest" />
          </section>

          <section className="mt-4 rounded-2xl bg-inverse-on-surface p-3.5">
            <div className="skeleton h-3 w-37.5 rounded-lg bg-surface-container-highest" />
            <div className="mt-2.5 space-y-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="skeleton h-3 w-55 rounded-lg bg-surface-container-highest"
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
