"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { profileSummary } from "@/lib/mock-data";
import M3List from "@/components/M3List";
import M3Dialog from "@/components/M3Dialog";
import M3IconButton from "@/components/M3IconButton";

export default function YourDataPage() {
  const router = useRouter();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const handleAction = (dialogId: string | null) => {
    // Implement specific logic based on dialogue id if needed
    console.log(`Action confirmed for: ${dialogId}`);
    setActiveDialog(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background px-4 md:px-6 lg:px-12 border-b border-outline-variant/10">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          variant="standard"
          aria-label="Go back"
        />
        <h1 className="text-lg font-semibold tracking-tight text-on-surface">
          Your data
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col px-5 pb-35 pt-6 md:px-6 lg:px-12">
          <section className="mt-2 rounded-[20px] bg-surface-container p-5">
            <p className="text-sm font-medium leading-5 tracking-[0.1px] text-on-surface">
              Data associated with {profileSummary.name}
            </p>
            <p className="mt-2 text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
              Manage how your diagnosis history, voice transcripts, and crop notes
              are stored in Green Sabi.
            </p>
          </section>

          <section className="mt-6">
            <M3List
              variant="separated"
              items={[
                {
                  id: "delete-account",
                  label: "Delete your account",
                  onClick: () => setActiveDialog("delete-account"),
                  trailingIcon: "chevron_right",
                },
                {
                  id: "clear-chat",
                  label: "Clear chat history",
                  onClick: () => setActiveDialog("clear-chat"),
                  trailingIcon: "chevron_right",
                },
                {
                  id: "delete-diagnosis",
                  label: "Delete diagnosis history",
                  onClick: () => setActiveDialog("delete-diagnosis"),
                  trailingIcon: "chevron_right",
                },
                {
                  id: "clear-voice",
                  label: "Clear voice transcripts",
                  onClick: () => setActiveDialog("clear-voice"),
                  trailingIcon: "chevron_right",
                },
              ]}
            />
          </section>
        </div>
      </div>

      <M3Dialog
        isOpen={activeDialog === "delete-account"}
        onClose={() => setActiveDialog(null)}
        title="Delete account?"
        supportingText="This will permanently delete your account and all associated data. This action cannot be undone."
        icon="delete_forever"
        confirmLabel="Delete"
        onConfirm={() => handleAction("delete-account")}
        isDestructive
      />

      <M3Dialog
        isOpen={activeDialog === "clear-chat"}
        onClose={() => setActiveDialog(null)}
        title="Clear chat history?"
        supportingText="Are you sure you want to clear all your AI chat history? This action cannot be undone."
        icon="chat_bubble"
        confirmLabel="Clear"
        onConfirm={() => {
          localStorage.removeItem("gs_chat_history");
          handleAction("clear-chat");
        }}
      />

      <M3Dialog
        isOpen={activeDialog === "delete-diagnosis"}
        onClose={() => setActiveDialog(null)}
        title="Delete history?"
        supportingText="Are you sure you want to clear your entire farm diagnosis history?"
        icon="history"
        confirmLabel="Clear"
        onConfirm={() => handleAction("delete-diagnosis")}
      />

      <M3Dialog
        isOpen={activeDialog === "clear-voice"}
        onClose={() => setActiveDialog(null)}
        title="Clear transcripts?"
        supportingText="This will remove all saved voice command transcripts and analysis data."
        icon="voice_selection"
        confirmLabel="Clear"
        onConfirm={() => handleAction("clear-voice")}
      />
    </div>
  );
}
