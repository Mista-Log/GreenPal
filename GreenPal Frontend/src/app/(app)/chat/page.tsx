"use client";

import { useRouter } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { useTranslation } from "react-i18next";
import M3IconButton from "@/components/M3IconButton";

export default function ChatPage() {
  useTranslation();
  const router = useRouter();

  return (
    <div className="h-dvh bg-background text-on-surface overflow-hidden">
      <div className="relative mx-auto h-full w-full max-w-(--app-shell-max) flex flex-col overflow-hidden">
        <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background px-4 md:px-6 lg:px-12 border-b border-outline-variant/10">
          <M3IconButton
            icon="arrow_back"
            onClick={() => router.back()}
            variant="standard"
            aria-label="Go back"
          />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-rounded text-primary text-2xl">
                auto_awesome
              </span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-on-surface">
              Greenpal AI Chat
            </h1>
          </div>
        </header>

        <main className="flex-1 min-h-0 relative">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
