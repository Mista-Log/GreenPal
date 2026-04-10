export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) overflow-hidden pb-10">
        <div className="pt-19">
          <div className="skeleton h-110.5 w-full bg-surface-container" />

          <div className="mt-10.5 flex items-center justify-center gap-2.5">
            <div className="skeleton h-13 w-13 rounded-full bg-surface-container-highest" />
            <div className="skeleton h-8 w-45 rounded-xl bg-surface-container" />
          </div>
          <div className="skeleton mx-auto mt-2.5 h-3.5 w-60 rounded-lg bg-surface-container" />

          <div className="mt-11 flex flex-col items-center gap-2.75 px-4">
            <div className="skeleton h-12 w-full max-w-95 rounded-full bg-surface-container" />
            <div className="skeleton h-12 w-full max-w-95 rounded-full bg-surface-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
