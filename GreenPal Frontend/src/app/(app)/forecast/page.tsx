"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeech } from "@/hooks/useSpeech";
import {
  WeatherService,
  WeatherData,
  WeatherAdvisory,
} from "@/lib/WeatherService";
import M3IconButton from "@/components/M3IconButton";
import M3Card from "@/components/M3Card";
import M3ProgressIndicator from "@/components/M3ProgressIndicator";
import PoweredByNvidia from "@/components/PoweredByNvidia";
import { useRouter } from "next/navigation";
import { geocodeLocation } from "@/lib/location";

export default function ForecastPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [analyzingAdvisory, setAnalyzingAdvisory] = useState(false);
  const { speak, stop, isSpeaking } = useSpeech();

  // Stop speaking on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleReadAdvisory = () => {
    if (isSpeaking) {
      stop();
      return;
    }
    if (advisory) {
      const text = `${advisory.summary}. ${t("weather.actions")}: ${advisory.actions.join(". ")}`;
      speak(text, i18n.language);
    }
  };
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [advisory, setAdvisory] = useState<WeatherAdvisory | null>(null);
  const [error, setError] = useState<string | null>(null);

  // We initialize with null to avoid fetching with hardcoded "defaults"
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    async function initLocation() {
      // 1. Try saved settings
      const savedState = localStorage.getItem("gs_state");
      const savedLga = localStorage.getItem("gs_lga");

      if (savedState) {
        const coords = await geocodeLocation(savedState, savedLga || undefined);
        if (coords) {
          setCoords({ lat: coords.lat, lon: coords.lon });
          setIsLocationReady(true);
          return;
        }
      }

      // 2. Fallback to Browser Geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            setIsLocationReady(true);
          },
          () => {
            console.log("Geolocation denied, using default fallback (Ibadan)");
            setCoords({ lat: 7.3775, lon: 3.947 });
            setIsLocationReady(true);
          },
          { timeout: 10000 },
        );
      } else {
        // Absolute fallback for devices without geo
        setCoords({ lat: 7.3775, lon: 3.947 });
        setIsLocationReady(true);
      }
    }
    initLocation();
  }, []);

  const fetchWeatherData = React.useCallback(async (force: boolean = false) => {
    try {
      if (!coords) return;

      // 1. Check cache first if not forced
      if (!force) {
        const cached = WeatherService.getCachedWeather(coords.lat, coords.lon);
        if (cached) {
          setWeather(cached.data);
          setAdvisory(cached.advisory);
          setLastUpdated(new Date(cached.timestamp));
          setLoading(false);
          setAnalyzingAdvisory(false);
          return;
        }
      }

      // 2. Fetch fresh data
      if (!weather) setLoading(true);

      const data = await WeatherService.getForecast(coords.lat, coords.lon);

      // Sync location name with saved settings if available
      const savedState = localStorage.getItem("gs_state");
      const savedLga = localStorage.getItem("gs_lga");
      const locationName = savedState
        ? savedLga
          ? `${savedLga}, ${savedState}`
          : savedState
        : data.location;

      const finalWeather = { ...data, location: locationName };
      setWeather(finalWeather);
      setLastUpdated(new Date());
      setError(null);

      // After forecast, get AI advisory
      if (data) {
        setAnalyzingAdvisory(true);
        const advice = await WeatherService.getAIAdvisory(data, i18n.language);
        setAdvisory(advice);
        setAnalyzingAdvisory(false);

        // 3. Save to cache
        WeatherService.saveWeatherCache(finalWeather, advice, coords);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load weather";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setAnalyzingAdvisory(false);
    }
  }, [coords, weather, i18n.language]);

  useEffect(() => {
    // Only fetch if location initialization is complete
    if (isLocationReady && coords) {
      fetchWeatherData();
    }

    // Set up auto-refresh
    const intervalMinutes = parseInt(
      localStorage.getItem("gs_weather_refresh") || "5",
      10,
    );
    const intervalMs = intervalMinutes * 60 * 1000;

    const timer = setInterval(() => {
      if (isLocationReady && coords) {
        console.log(
          `Auto-refreshing weather data (${intervalMinutes}m interval)...`,
        );
        fetchWeatherData();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isLocationReady, coords, i18n.language, fetchWeatherData]);

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 gap-4">
        <M3ProgressIndicator
          variant="circular"
          progress={0}
          className="animate-spin"
          size={64}
        />
        <p className="text-secondary animate-pulse">
          {t("weather.status.loading")}
        </p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 gap-6 text-center">
        <span className="material-symbols-rounded text-6xl text-error">
          cloud_off
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{t("weather.status.error")}</h2>
          <p className="text-on-surface-variant text-sm">{error}</p>
        </div>
        <M3IconButton
          icon="refresh"
          onClick={() => window.location.reload()}
          variant="tonal"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="flex items-center gap-3 px-4 py-3 sticky top-0 bg-background z-30 border-b border-outline-variant/10">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          variant="standard"
        />
        <h1 className="text-lg font-semibold tracking-tight">
          {t("weather.title")}
        </h1>
      </header>

      <main className="px-4 py-6 space-y-8 w-full md:px-6 lg:px-12 max-w-7xl">
        {/* Current Weather Card */}
        <M3Card
          variant="filled"
          className="bg-primary-container text-on-primary-container p-6 relative overflow-hidden group lg:max-w-4xl"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-70 mb-1 flex items-center gap-1">
                  <span className="material-symbols-rounded text-base">
                    location_on
                  </span>
                  {weather.location}
                  {lastUpdated && (
                    <span className="ml-2 text-[10px] opacity-60">
                      •{" "}
                      {lastUpdated.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </p>
                <h1 className="text-6xl font-bold tracking-tight">
                  {weather.temp}
                  {t("weather.units.temp")}
                </h1>
                <p className="text-xl font-medium mt-1">{weather.condition}</p>
              </div>
              <span className="material-symbols-rounded text-8xl opacity-80 group-hover:scale-110 transition-transform">
                {getWeatherIcon(weather.condition)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-on-primary-container/10">
              <div className="text-center">
                <span className="material-symbols-rounded block mb-1">
                  humidity_low
                </span>
                <p className="text-xs opacity-70">
                  {t("weather.details.humidity")}
                </p>
                <p className="text-sm font-bold">{weather.humidity}%</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-rounded block mb-1">
                  airway
                </span>
                <p className="text-xs opacity-70">
                  {t("weather.details.wind")}
                </p>
                <p className="text-sm font-bold">
                  {weather.windSpeed} {t("weather.units.speed")}
                </p>
              </div>
              <div className="text-center">
                <span className="material-symbols-rounded block mb-1">
                  rainy
                </span>
                <p className="text-xs opacity-70">
                  {t("weather.details.precip")}
                </p>
                <p className="text-sm font-bold">{weather.precipitation}%</p>
              </div>
            </div>
          </div>

          {/* Decorative Gradient */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary rounded-full blur-[100px] opacity-20 pointer-events-none" />
        </M3Card>

        {/* AI Advisory Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-rounded text-primary">
                auto_awesome
              </span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                {t("weather.advisory")}
              </h2>
            </div>

            {!analyzingAdvisory && advisory && (
              <button
                onClick={handleReadAdvisory}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isSpeaking
                    ? "bg-primary text-on-primary"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                <span className="material-symbols-rounded text-[20px]">
                  {isSpeaking ? "stop" : "volume_up"}
                </span>
              </button>
            )}
          </div>

          <M3Card
            variant="outlined"
            className="p-5 border-primary/20 bg-primary/2"
          >
            <AnimatePresence mode="wait">
              {analyzingAdvisory ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 flex flex-col items-center justify-center gap-3"
                >
                  <M3ProgressIndicator
                    variant="circular"
                    progress={0}
                    className="animate-spin"
                    size={32}
                  />
                  <p className="text-xs text-secondary italic font-medium">
                    {t("weather.status.analyzing")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm leading-relaxed text-on-surface">
                    {advisory?.summary}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {advisory?.actions.map((action, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-on-surface-variant group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <PoweredByNvidia className="mt-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </M3Card>
        </section>

        {/* Weekly Grid View */}
        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-bold px-1">{t("weather.weekly_view")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {weather.forecast.map((day, idx) => (
              <M3Card
                key={idx}
                variant="elevated"
                className="p-4 text-center bg-surface-container-low border-none"
              >
                <p className="text-xs font-bold text-secondary uppercase mb-2">
                  {day.date}
                </p>
                <span className="material-symbols-rounded text-3xl text-primary mb-2">
                  {getWeatherIcon(day.condition)}
                </span>
                <p className="text-xl font-bold">{day.temp}°</p>
              </M3Card>
            ))}
          </div>
        </section>
      </main>
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
