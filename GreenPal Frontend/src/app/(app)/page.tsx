"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppTopBar from "@/components/AppTopBar";
import M3List from "@/components/M3List";
import M3Button from "@/components/M3Button";
import M3ProgressIndicator from "@/components/M3ProgressIndicator";
import { motion } from "framer-motion";
import { WeatherService, WeatherData } from "@/lib/WeatherService";
import { geocodeLocation } from "@/lib/location";
import { homeQuickActions, homeRecentActivity } from "@/lib/mock-data";

export default function Home() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        let lat = 7.3775;
        let lon = 3.947;
        let locationName = "Ibadan";

        // 1. Try saved settings
        const savedState = localStorage.getItem("gs_state");
        const savedLga = localStorage.getItem("gs_lga");

        if (savedState) {
          locationName = savedLga ? `${savedLga}, ${savedState}` : savedState;
          const coords = await geocodeLocation(
            savedState,
            savedLga || undefined,
          );
          if (coords) {
            lat = coords.lat;
            lon = coords.lon;
          }
        }
        // 2. Fallback to Browser Geolocation
        else if ("geolocation" in navigator) {
          const pos = await new Promise<GeolocationPosition>((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej),
          ).catch(() => null);

          if (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
          }
        }

        // 3. Try Cache first before fetching
        const cached = WeatherService.getCachedWeather(lat, lon);
        if (cached) {
          setWeather(cached.data);
          setLoadingWeather(false);
          return;
        }

        const data = await WeatherService.getForecast(lat, lon);
        const finalWeather = {
          ...data,
          location: savedState ? locationName : data.location,
        };
        setWeather(finalWeather);

        // Save to cache (without advisory since home doesn't need it yet, or use null)
        WeatherService.saveWeatherCache(finalWeather, null, { lat, lon });
      } catch (e) {
        console.error("Home weather error:", e);
      } finally {
        setLoadingWeather(false);
      }
    }
    loadWeather();
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="relative min-h-screen w-full pb-35 lg:max-w-none">
        <AppTopBar showBack={false} />

        <main className="px-5 pt-4 md:px-6 lg:px-12 space-y-8 max-w-7xl">
          <section className="relative overflow-hidden rounded-xl bg-surface-container-highest transition-all duration-500 lg:max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 min-h-40 items-center">
              {loadingWeather ? (
                <div className="flex flex-col items-center gap-4 py-4">
                  <M3ProgressIndicator
                    variant="circular"
                    progress={0}
                    className="animate-spin"
                    size={32}
                  />
                  <p className="text-xs text-on-surface-variant font-medium animate-pulse uppercase tracking-widest">
                    {t("weather.status.loading")}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="material-symbols-rounded text-5xl text-on-surface transition-transform group-hover:scale-110">
                    {getWeatherIcon(weather?.condition || "sunny")}
                  </span>
                  <div>
                    <p className="text-6xl font-normal leading-16 tracking-[-0.25px] text-on-surface">
                      {weather?.temp || "--"}°
                    </p>
                    <p className="text-sm leading-5 tracking-[0.25px] text-on-surface-variant">
                      {t("home.weather_desc", {
                        location: weather?.location || t("settings.region"),
                        condition: weather?.condition || "Cloudy",
                      })}
                    </p>
                  </div>
                </motion.div>
              )}

              {!loadingWeather && !localStorage.getItem("gs_state") && (
                <Link
                  href="/account-settings"
                  className="absolute top-2 right-2"
                >
                  <M3Button variant="tonal" icon="location_on">
                    {t("settings.state")}
                  </M3Button>
                </Link>
              )}

              <div className="flex justify-end gap-2">
                <Link href="/scan" className="flex-1">
                  <M3Button variant="filled" className="w-full">
                    {t("home.scan")}
                  </M3Button>
                </Link>
                <Link href="/forecast" className="flex-1">
                  <M3Button variant="filled" className="w-full">
                    {t("home.forecast")}
                  </M3Button>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <p className="mb-3 text-base font-medium leading-6 tracking-[0.15px] text-on-surface-variant">
              {t("home.quick_access")}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 items-start">
              {homeQuickActions.map((action) => (
                <div
                  key={action.id}
                  className="flex flex-col items-center gap-2 group"
                >
                  {action.id === "qa_chat" ? (
                    <Link
                      href={action.action}
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary-container">
                        <span className="material-symbols-rounded text-on-secondary-container text-xl">
                          {action.icon}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href={action.action.startsWith("/") ? action.action : "#"}
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary-container">
                        <span className="material-symbols-rounded text-on-secondary-container text-xl">
                          {action.icon}
                        </span>
                      </div>
                    </Link>
                  )}
                  <p className="text-xs font-medium leading-tight tracking-[0.5px] text-on-surface-variant text-center">
                    {t(`actions.${action.id.replace("qa_", "")}`, { defaultValue: action.label })}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-base font-medium leading-6 tracking-[0.15px] text-on-surface-variant">
                {t("recent_activity.title", "Recent Activity")}
              </p>
              {homeRecentActivity.length > 0 && (
                <Link
                  href="/notifications"
                  className="text-sm font-medium leading-5 tracking-[0.1px] text-primary hover:text-primary-active transition-colors"
                >
                  {t("home.see_all", "See All")}
                </Link>
              )}
            </div>

            {homeRecentActivity.length > 0 ? (
              <M3List
                variant="divided-gap"
                items={homeRecentActivity.slice(0, 3).map((item) => ({
                  id: item.id,
                  label: t(`home.activity_types.${item.type}`),
                  leadingIcon:
                    item.type === "scan"
                      ? "camera"
                      : item.type === "tip"
                        ? "lightbulb"
                        : "chat_bubble",
                  leadingIconVariant: "filled",
                  subtitle:
                    item.title +
                    " · " +
                    item.occurred_at +
                    (item.confidence !== null
                      ? ` · ${t("home.confidence", { value: item.confidence })}`
                      : ""),
                }))}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-10 rounded-2xl bg-surface-container border border-outline-variant/30 text-center">
                <span className="material-symbols-rounded text-4xl text-on-surface-variant/70 mb-2">
                  history
                </span>
                <p className="text-sm font-medium tracking-[0.1px] text-on-surface-variant">
                  No Recent Activity
                </p>
                <p className="text-xs mt-1 text-on-surface-variant/80 px-4 max-w-50">
                  Your crop scans, tips, and AI chats will show up here.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function getWeatherIcon(condition: string): string {
  const cond = condition.toLowerCase();
  if (cond.includes("sun") || cond.includes("clear")) return "sunny";
  if (cond.includes("cloud")) return "cloud";
  if (cond.includes("rain") || cond.includes("drizzle")) return "rainy";
  if (cond.includes("storm") || cond.includes("thunder")) return "thunderstorm";
  if (cond.includes("mist") || cond.includes("fog")) return "foggy";
  return "partly_cloudy_day";
}

