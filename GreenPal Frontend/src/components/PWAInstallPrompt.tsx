"use client";

import { useState } from "react";
import useInstallPrompt from "@/hooks/useInstallPrompt";

export default function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-4 md:left-auto md:right-4 md:w-96">
      <div className="bg-surface-container-high rounded-3xl shadow-lg border border-outline-variant/30 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-container">
            <span className="material-symbols-rounded text-on-primary-container text-xl">
              download
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-on-surface text-sm">
              Install Greenpal
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Get quick access to Greenpal on your device for a better
              experience.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={promptInstall}
                className="flex-1 px-4 py-2 bg-primary text-on-primary text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Install
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="px-4 py-2 bg-surface-container-highest text-on-surface text-sm font-medium rounded-full hover:bg-surface-container-high transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
