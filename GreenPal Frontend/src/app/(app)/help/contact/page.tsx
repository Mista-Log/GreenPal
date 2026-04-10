"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HelpContactRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/feedback/contact");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="flex flex-col items-center animate-pulse">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-on-surface-variant">Redirecting to Team Contact...</p>
      </div>
    </div>
  );
}
