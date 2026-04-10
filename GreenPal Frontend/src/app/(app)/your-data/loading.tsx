import M3Skeleton from "@/components/M3Skeleton";

export default function YourDataLoading() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="mx-auto min-h-screen w-full max-w-(--app-shell-max) px-5 pb-30 pt-6 md:px-6">
        {/* Header Skeleton */}
        <header className="flex items-center gap-3">
          <M3Skeleton variant="circle" className="h-11 w-11" />
          <M3Skeleton variant="rounded" className="h-6 w-32" />
        </header>

        {/* Info Card Skeleton */}
        <section className="mt-6 rounded-[20px] bg-surface-container p-5">
          <M3Skeleton variant="rounded" className="h-5 w-48 mb-3" />
          <M3Skeleton variant="rounded" className="h-4 w-full" />
          <M3Skeleton variant="rounded" className="mt-2 h-4 w-3/4" />
        </section>

        {/* List Skeleton */}
        <section className="mt-8 space-y-2">
          {[1, 2, 3].map((i) => (
            <M3Skeleton 
              key={i} 
              variant="rounded" 
              className="h-18 w-full rounded-[18px]" 
            />
          ))}
        </section>
      </div>
    </div>
  );
}
