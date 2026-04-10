import Link from "next/link";

export default function VoicePage() {
  return (
    <div className="min-h-screen bg-(--md-sys-color-background) text-on-surface">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) pb-15">
        <header className="sticky top-0 z-20 bg-(--md-sys-color-background) px-5 pt-3 md:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Back to home"
            >
              <span className="material-symbols-rounded text-on-surface">
                arrow_back
              </span>
            </Link>
            <h1 className="text-lg font-medium leading-6 tracking-[0.15px] text-on-surface">
              Voice assistant
            </h1>
          </div>
        </header>

        <main className="px-5 pt-5 md:px-6">
          <section className="rounded-[20px] bg-surface-container p-4.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium leading-6 tracking-[0.15px] text-on-surface">
                  Speak and we’ll analyze
                </p>
                <p className="mt-1 text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
                  Your voice will be converted to text for the AI to review.
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container">
                <span className="material-symbols-rounded material-symbols-rounded--filled text-4xl text-on-primary-container">
                  mic
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] bg-surface-container-highest px-3.5 py-3">
              <p className="text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant">
                Live transcription
              </p>
              <p className="mt-1.5 text-sm leading-5 tracking-[0.25px] text-on-surface">
                We’ll show the text here as you speak.
              </p>
            </div>

            <div className="mt-3.5 flex items-center justify-between rounded-xl border border-solid border-(--md-sys-color-outline,#72796e) px-3 py-2.5">
              <span className="text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
                Tap to start recording
              </span>
              <span className="material-symbols-rounded text-xl text-on-surface-variant">
                graphic_eq
              </span>
            </div>

            <button className="mt-3.5 flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium leading-5 tracking-[0.1px] text-on-primary">
              Start listening
            </button>
          </section>

          <section className="mt-4 rounded-2xl bg-inverse-on-surface p-3.5">
            <p className="text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant">
              Tips for better results
            </p>
            <ul className="mt-2 space-y-1.5 text-xs leading-4 tracking-[0.4px] text-on-surface">
              {[
                "Describe symptoms and crop type",
                "Mention how long the issue has been happening",
                "Share weather or watering conditions",
              ].map((hint) => (
                <li key={hint} className="flex items-start gap-1.5">
                  <span className="material-symbols-rounded text-base text-on-surface-variant">
                    check_circle
                  </span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
