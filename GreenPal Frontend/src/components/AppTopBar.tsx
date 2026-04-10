"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { profileSummary } from "@/lib/mock-data";
import { getMe } from "@/lib/api";
import { useTranslation } from "react-i18next";
import M3List from "./M3List";
import M3IconButton from "./M3IconButton";
import VoiceSearchModal from "./VoiceSearchModal";

type AppTopBarProps = {
  placeholder?: string;
};

type UserProfile = {
  id?: string;
  full_name?: string;
  email?: string;
  profile_picture?: string | null;
};

export default function AppTopBar({
  placeholder,
}: AppTopBarProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const displayPlaceholder = placeholder || t("search.placeholder");
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleOpenVoiceSearch = useCallback(() => {
    setIsSearching(true);
    setIsVoiceSearchOpen(true);
  }, []);

  const handleVoiceResult = useCallback((transcript: string) => {
    setQuery(transcript);
    setIsSearching(true);
    // Explicitly focus and update the input value for the active search bar
    if (inputRef.current) {
      inputRef.current.value = transcript;
      inputRef.current.focus();
    }
    // Also trigger the timeout for safety in case of render delays
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleCloseVoiceSearch = useCallback(() => {
    setIsVoiceSearchOpen(false);
  }, []);

  const handleOpenSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const pathname = usePathname();

  // Close search and clear query on route change
  useEffect(() => {
    setIsSearching(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("profile-open", profileOpen || isSearching || isVoiceSearchOpen);
    
    // Global listener for voice search triggers from FAB or Quick Access
    const handleGlobalVoiceTrigger = () => {
      handleOpenVoiceSearch();
    };
    window.addEventListener('gs-trigger-voice', handleGlobalVoiceTrigger);

    return () => {
      document.body.classList.remove("profile-open");
      window.removeEventListener('gs-trigger-voice', handleGlobalVoiceTrigger);
    };
  }, [profileOpen, isSearching, isVoiceSearchOpen, handleOpenVoiceSearch]);

  const handleCloseSearch = () => {
    setIsSearching(false);
    setQuery("");
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    document.cookie = "gs_auth=; path=/; max-age=0";
    setProfileOpen(false);
    router.push("/auth");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);

        // If backend has profile picture, use it
        if (data?.profile_picture) {
          setProfilePic(data.profile_picture);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const fullName = user?.full_name || "User";
  const email = user?.email || "No email";
  const firstName = fullName.split(" ")[0] || "User";

  const monogram = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  return (
    <>
      {/* Profile Modal */}
      {profileOpen ? (
        <div className="fixed inset-0 z-40 bg-(--md-sys-color-background)">
          <div className="mx-auto h-full w-full max-w-(--app-shell-max) overflow-y-auto px-5 pb-10 pt-6 md:px-6">
            <div className="relative flex items-center justify-center">
              <p className="text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant text-center">
                {loadingUser ? "Loading..." : email}
              </p>
              <M3IconButton
                icon="close"
                size="sm"
                variant="standard"
                className="absolute right-0"
                aria-label="Close profile"
                onClick={() => setProfileOpen(false)}
              />
            </div>

            <div className="my-12 flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-20 w-20 overflow-hidden items-center justify-center rounded-full bg-primary text-xl font-medium text-on-primary">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    monogram
                  )}
                </div>
                <label
                  className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-surface-container shadow-sm transition-colors hover:bg-on-surface/8"
                  aria-label="Edit profile photo"
                  title="Upload profile photo"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload profile photo"
                    onChange={handleProfilePicChange}
                  />
                  <span className="material-symbols-rounded text-sm text-on-surface-variant">
                    photo_camera
                  </span>
                </label>
              </div>
              <p className="mt-4 text-lg font-medium leading-6 tracking-[0.15px] text-on-surface">
                {t("profile.hi", { name: firstName })}
              </p>
            </div>

            <M3List
              variant="divided-gap"
              label="More from this app"
              onItemSelected={() => setProfileOpen(false)}
              items={[
                {
                  id: "settings",
                  label: t("profile.settings"),
                  href: "/account-settings",
                  icon: "manage_accounts",
                },
                {
                  id: "data",
                  label: t("profile.data"),
                  href: "/your-data",
                  icon: "data_usage",
                },
                {
                  id: "help",
                  label: t("profile.help"),
                  href: "/help",
                  icon: "help",
                },
                {
                  id: "feedback",
                  label: t("profile.feedback"),
                  href: "/feedback",
                  icon: "feedback",
                },
              ]}
            />

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center rounded-full border border-solid border-(--md-sys-color-outline,#72796e) px-4 py-3 text-sm font-medium leading-5 tracking-[0.1px] text-error"
              onClick={handleSignOut}
            >
               {t("profile.signout")}
            </button>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
              <button type="button" className="underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button type="button" className="underline">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Full-Screen Search active state */}
      {isSearching && (
        <div className="fixed inset-0 z-50 flex flex-col bg-surface-container-low mx-auto w-full max-w-(--app-shell-max)">
          {/* Header area for full screen search */}
          <div className="flex h-18 items-center px-4">
            {/* 1. Search bar container (Active): Surface container high */}
            <div className="flex h-14 flex-1 items-center gap-2 rounded-full bg-surface-container-high px-4 shadow-sm">
              {/* 2. Leading icon (Active): On surface variant */}
              <M3IconButton
                icon="arrow_back"
                size="sm"
                variant="standard"
                className="-ml-2"
                onClick={handleCloseSearch}
                aria-label="Close search"
              />

              {/* 5. Input text (Active): On surface & 3. Hinted search text: On surface variant */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={displayPlaceholder}
                className="flex-1 bg-transparent text-base leading-6 tracking-[0.5px] text-on-surface placeholder:text-on-surface-variant outline-none"
              />

              {/* 4. Trailing icon (Active): On surface variant */}
              {query.length > 0 ? (
                <M3IconButton
                  icon="close"
                  size="sm"
                  variant="standard"
                  className="-mr-2"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search text"
                />
              ) : (
                <M3IconButton
                  icon="mic"
                  size="sm"
                  variant="standard"
                  className="-mr-2"
                  onClick={handleOpenVoiceSearch}
                  aria-label="Voice search"
                  type="button"
                />
              )}
            </div>
          </div>

          {/* 6. Container for search suggestions or results */}
          <div className="flex-1 overflow-y-auto pt-2">
            {!query ? (
              <>
                <p className="px-6 pb-2 text-sm font-medium leading-5 tracking-[0.1px] text-on-surface-variant">
                  {t("search.recent")}
                </p>
                <M3List
                  variant="plain"
                  items={[
                    {
                      id: "recent-1",
                      label: "Tomato blight treatment",
                      icon: "history",
                    },
                    {
                      id: "recent-2",
                      label: "Rainfall forecast for this week",
                      icon: "history",
                    },
                    {
                      id: "recent-3",
                      label: "NPK fertilizer ratio",
                      icon: "history",
                    },
                  ]}
                />
              </>
            ) : (
              <M3List
                variant="plain"
                items={[
                  {
                    id: "res-1",
                    label: `Search for "${query}"`,
                    icon: "search",
                  },
                ]}
              />
            )}
          </div>
        </div>
      )}

      {/* Docked Search Bar (Inactive state) */}
      <div
        className={`flex h-18 items-center px-4 transition-opacity ${
          isSearching ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* 1. Search bar container (Inactive): Surface container high */}
        <div
          className="flex h-14 flex-1 cursor-text items-center gap-2 rounded-full bg-surface-container-high px-4 shadow-sm"
          onClick={handleOpenSearch}
        >
          {/* 2. Leading icon (Inactive): On surface variant */}
          <div className="flex h-12 w-12 items-center justify-center -ml-2">
            <span className="material-symbols-rounded text-on-surface-variant">
              search
            </span>
          </div>

          {/* 3. Hinted search text: On surface variant */}
          <p className="flex-1 text-base leading-6 tracking-[0.5px] text-on-surface-variant truncate select-none">
            {displayPlaceholder}
          </p>

          {/* 4. Trailing icon and avatar (Inactive): On surface variant */}
          <M3IconButton
            icon="mic"
            size="sm"
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenVoiceSearch();
            }}
            aria-label="Voice search"
          />

          <button
            className="ml-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium leading-5 tracking-[0.1px] text-on-primary transition-transform active:scale-95"
            aria-label="Open profile"
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen(true);
            }}
            type="button"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              monogram
            )}
          </button>
        </div>
      </div>

      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={handleCloseVoiceSearch}
        onResult={handleVoiceResult}
      />
    </>
  );
}