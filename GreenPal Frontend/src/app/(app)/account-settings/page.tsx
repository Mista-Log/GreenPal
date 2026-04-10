"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { profileSummary } from "@/lib/mock-data";
import { fetchStates, fetchLGAs } from "@/lib/location";
import M3List, { M3ListItem } from "@/components/M3List";
import M3Switch from "@/components/M3Switch";
import { getMe, updateProfile } from "@/lib/api";
import M3IconButton from "@/components/M3IconButton";

type EditMode =
  | "none"
  | "profile"
  | "notifications"
  | "language"
  | "appearance"
  | "security";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState<EditMode>("none");

  // Loading / saving states
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Notification preferences state
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gs_notifications");
      if (saved) return JSON.parse(saved);
    }
    return {
      pushEnabled: true,
      emailEnabled: true,
      weatherAlerts: true,
      cropReminders: true,
    };
  });

  // No longer need mount-effect for loading notifications
  // Sync notification settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gs_notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  // Language & region state
  const [language, setLanguage] = useState(i18n.language || "en");
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableLGAs, setAvailableLGAs] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Appearance state
  const [themePreference, setThemePreference] = useState<
    "system" | "light" | "dark"
  >(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }
    }
    return "system";
  });

  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Location state
  const [state, setState] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("gs_state") || "" : "",
  );
  const [lga, setLga] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("gs_lga") || "" : "",
  );

  // =========================
  // FETCH USER PROFILE
  // =========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setError("");

        const user = await getMe();

        setName(user.full_name || "");
        setEmail(user.email || "");
      } catch (err: any) {
        console.error("Failed to load profile:", err.message);
        setError(err.message || "Failed to load profile");

        // Optional: redirect to login if unauthorized
        if (
          err.message?.toLowerCase().includes("unauthorized") ||
          err.message?.toLowerCase().includes("token") ||
          err.message?.toLowerCase().includes("expired")
        ) {
          router.push("/login");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [router]);
  // Weather refresh interval state
  const [refreshInterval, setRefreshInterval] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("gs_weather_refresh") || "5" : "5",
  );

  // Load states on mount
  useEffect(() => {
    const loadStates = async () => {
      const states = await fetchStates();
      setAvailableStates(states);
    };
    loadStates();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (state) {
      const loadLGAs = async () => {
        setLoadingLocations(true);
        const lgas = await fetchLGAs(state);
        setAvailableLGAs(lgas);
        setLoadingLocations(false);
      };
      loadLGAs();
    }
  }, [state]);

  // =========================
  // SAVE PROFILE TO BACKEND
  // =========================
  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      setError("");
      setSuccessMessage("");

      const response = await updateProfile({
        full_name: name,
        email: email, // remove this if your backend only supports full_name
      });

      setName(response.user.full_name || "");
      setEmail(response.user.email || "");
      setSuccessMessage("Profile updated successfully");
      setEditMode("none");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err: any) {
      console.error("Profile update failed:", err.message);
      setError(err.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("gs_notifications", JSON.stringify(notifications));
    setEditMode("none");
  };

  const handleSaveLanguage = () => {
    i18n.changeLanguage(language);
    if (state) localStorage.setItem("gs_state", state);
    if (lga) localStorage.setItem("gs_lga", lga);
    setEditMode("none");
  };

  const applyTheme = (newTheme: "system" | "light" | "dark") => {
    setThemePreference(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("light", !isDark);
    } else {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      document.documentElement.classList.toggle("light", newTheme === "light");
    }
  };

  const handleSaveSecurity = () => {
    setEditMode("none");
  };

  // Preference list items
  const preferenceItems: M3ListItem[] = [
    {
      id: "notifications",
      label: t("settings.notifications"),
      leadingIcon: "notifications",
      trailingIcon: "chevron_right",
      onClick: () => setEditMode("notifications"),
    },
    {
      id: "language",
      label: t("settings.language_region"),
      leadingIcon: "language",
      trailingIcon: "chevron_right",
      onClick: () => setEditMode("language"),
    },
    {
      id: "appearance",
      label: t("settings.appearance"),
      leadingIcon: "palette",
      trailingIcon: "chevron_right",
      onClick: () => setEditMode("appearance"),
    },
    {
      id: "security",
      label: t("settings.security"),
      leadingIcon: "security",
      trailingIcon: "chevron_right",
      onClick: () => setEditMode("security"),
    },
  ];

  return (
    <div className="min-h-screen bg-(--md-sys-color-background) text-on-surface flex flex-col">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background px-4 md:px-6 lg:px-12 border-b border-outline-variant/10">
        <M3IconButton
          icon={editMode !== "none" ? "close" : "arrow_back"}
          onClick={() => {
            if (editMode !== "none") {
              setEditMode("none");
            } else {
              router.back();
            }
          }}
          variant="standard"
          aria-label={editMode !== "none" ? "Close" : "Back"}
        />
        <h1 className="text-lg font-semibold tracking-tight text-on-surface flex-1 truncate">
          {editMode === "none"
            ? t("settings.title")
            : editMode === "profile"
              ? t("settings.personal")
              : editMode === "notifications"
                ? t("settings.notifications")
                : editMode === "language"
                  ? t("settings.language_region")
                  : editMode === "appearance"
                    ? t("settings.appearance")
                    : editMode === "security"
                      ? t("settings.security")
                      : t("settings.title")}
        </h1>
        {editMode !== "none" && editMode !== "appearance" && (
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold leading-5 text-primary transition-all hover:bg-primary/8 active:scale-95"
            onClick={() => {
              if (editMode === "profile") handleSaveProfile();
              else if (editMode === "notifications")
                handleSaveNotifications();
              else if (editMode === "language") handleSaveLanguage();
              else if (editMode === "security") handleSaveSecurity();
            }}
            type="button"
          >
            {t("settings.save")}
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-(--app-shell-max) flex-col px-5 pb-35 pt-6 md:px-6">

        {editMode === "none" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-400">
            {/* Profile Section */}
            <section className="mt-6 rounded-3xl bg-surface-container p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-medium text-on-primary shadow-md">
                  {name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium leading-7 tracking-[0.15px] text-on-surface">
                    {name}
                  </p>
                  <p className="text-sm leading-5 tracking-[0.4px] text-on-surface-variant font-normal">
                    {email}
                  </p>
                </div>
              </div>
              <button
                className="mt-6 flex w-full items-center justify-center rounded-full bg-primary-container px-6 py-3.5 text-sm font-semibold leading-5 tracking-[0.1px] text-on-primary-container transition-all hover:bg-primary-container/80 active:scale-98"
                onClick={() => setEditMode("profile")}
                type="button"
              >
                {t("profile.settings")}
              </button>
            </section>

            {/* Preferences Section */}
            <section className="mt-8">
              <M3List
                items={preferenceItems}
                label={t("profile.settings")}
                variant="separated"
              />
            </section>
          </div>
        )}

        {/* Edit Profile View */}
        {editMode === "profile" && (
          <section className="mt-6 space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary group-focus-within:text-primary transition-colors">
                {t("settings.name")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary group-focus-within:text-primary transition-colors">
                {t("settings.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
          </section>
        )}

        {/* Notification Preferences View */}
        {editMode === "notifications" && (
          <section className="mt-6 space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <ToggleRow
              label={t("settings.push")}
              checked={notifications.pushEnabled}
              onChange={() =>
                setNotifications((prev: typeof notifications) => ({
                  ...prev,
                  pushEnabled: !prev.pushEnabled,
                }))
              }
            />
            <ToggleRow
              label={t("settings.email_notif")}
              checked={notifications.emailEnabled}
              onChange={() =>
                setNotifications((prev: typeof notifications) => ({
                  ...prev,
                  emailEnabled: !prev.emailEnabled,
                }))
              }
            />
            <ToggleRow
              label={t("settings.weather")}
              checked={notifications.weatherAlerts}
              onChange={() =>
                setNotifications((prev: typeof notifications) => ({
                  ...prev,
                  weatherAlerts: !prev.weatherAlerts,
                }))
              }
            />
            <ToggleRow
              label={t("settings.crops")}
              checked={notifications.cropReminders}
              onChange={() =>
                setNotifications((prev: typeof notifications) => ({
                  ...prev,
                  cropReminders: !prev.cropReminders,
                }))
              }
            />
          </section>
        )}

        {/* Language & Region View */}
        {editMode === "language" && (
          <section className="mt-6 space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary transition-colors">
                {t("settings.language_region")}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              >
                <option value="en">English</option>
                <option value="yo">Yorùbá</option>
                <option value="ig">Igbo</option>
                <option value="ha">Hausa</option>
                <option value="pcm">Nigerian Pidgin</option>
              </select>
            </div>

            {/* State Selection */}
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary transition-colors">
                {t("settings.state")}
              </label>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setLga(""); // Reset LGA
                }}
                disabled={availableStates.length === 0}
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm disabled:opacity-50"
              >
                <option value="">{t("settings.state")}...</option>
                {availableStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Selection */}
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary transition-colors">
                {t("settings.lga")} {loadingLocations && "..."}
              </label>
              <select
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                disabled={
                  !state || availableLGAs.length === 0 || loadingLocations
                }
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm disabled:opacity-50"
              >
                <option value="">
                  {state ? "Select LGA" : "Choose a state first"}
                </option>
                {availableLGAs.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </section>
        )}

        {/* Appearance View */}
        {editMode === "appearance" && (
          <section className="mt-6 space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="group">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary transition-colors">
                {t("settings.theme")}
              </label>
              <select
                value={themePreference}
                onChange={(e) =>
                  applyTheme(e.target.value as "system" | "light" | "dark")
                }
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              >
                <option value="system">{t("settings.system")}</option>
                <option value="light">{t("settings.light")}</option>
                <option value="dark">{t("settings.dark")}</option>
              </select>
            </div>
            <p className="text-xs leading-5 tracking-[0.4px] text-on-surface-variant px-1 font-normal">
              {t("settings.theme_desc")}
            </p>

            <div className="group mt-6">
              <label className="mb-2 block px-1 text-xs font-medium leading-4 tracking-[0.4px] text-primary transition-colors">
                Weather Refresh Interval
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => {
                  setRefreshInterval(e.target.value);
                  localStorage.setItem("gs_weather_refresh", e.target.value);
                }}
                className="w-full rounded-2xl border border-outline/30 bg-surface-container px-4 py-4 text-base leading-6 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              >
                <option value="3">3 minutes</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
            <p className="text-xs leading-5 tracking-[0.4px] text-on-surface-variant px-1 font-normal">
              How often the weather forecast automatically updates.
            </p>
          </section>
        )}

        {/* Security Settings View */}
        {editMode === "security" && (
          <section className="mt-6 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <ToggleRow
              label={t("settings.two_factor")}
              description={t("settings.two_factor_desc")}
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              showIcons
            />
            <button
              className="flex w-full items-center justify-between rounded-3xl bg-surface-container border border-outline/20 px-5 py-4.5 shadow-sm transition-all hover:bg-on-surface/5 active:scale-99"
              type="button"
            >
              <span className="text-base font-medium leading-5 tracking-[0.1px] text-on-surface">
                {t("settings.change_password")}
              </span>
              <span className="material-symbols-rounded text-on-surface-variant text-[24px]">
                chevron_right
              </span>
            </button>
          </section>
        )}
      </div>
    </div>
  </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  showIcons = true,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  showIcons?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-surface-container border border-outline/20 px-5 py-4.5 shadow-sm transition-all">
      <div className="flex flex-col">
        <span className="text-base font-medium leading-5 tracking-[0.1px] text-on-surface">
          {label}
        </span>
        {description && (
          <span className="text-xs mt-0.5 leading-4 tracking-[0.4px] text-on-surface-variant font-normal">
            {description}
          </span>
        )}
      </div>
      <M3Switch checked={checked} onChange={onChange} showIcons={showIcons} />
    </div>
  );
}
