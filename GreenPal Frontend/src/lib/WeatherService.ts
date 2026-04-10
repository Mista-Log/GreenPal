/**
 * WeatherService.ts
 */

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  location: string;
  soilTemp?: number;
  soilMoisture?: number;
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

export interface WeatherAdvisory {
  summary: string;
  actions: string[];
}

export interface WeatherCache {
  data: WeatherData;
  advisory: WeatherAdvisory | null;
  timestamp: number;
  coords: { lat: number; lon: number };
}

export class WeatherService {
  private static get apiKey() {
    return process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  }
  private static get agroKey() {
    return process.env.NEXT_PUBLIC_AGRO_API_KEY;
  }
  private static get nvidiaKey() {
    return process.env.NVIDIA_API_KEY || process.env.NEXT_PUBLIC_NVIDIA_API_KEY;
  }

  static getCachedWeather(lat: number, lon: number): WeatherCache | null {
    if (typeof window === "undefined") return null;
    const cached = localStorage.getItem("gs_weather_cache");
    if (!cached) return null;

    try {
      const cache: WeatherCache = JSON.parse(cached);
      // Ensure the coordinates match (to handle location changes)
      const isSameLocation = 
        Math.abs(cache.coords.lat - lat) < 0.01 && 
        Math.abs(cache.coords.lon - lon) < 0.01;

      if (!isSameLocation) return null;

      // Check if expired based on user preference or default 5 mins
      const intervalMinutes = parseInt(localStorage.getItem("gs_weather_refresh") || "5", 10);
      const isExpired = Date.now() - cache.timestamp > intervalMinutes * 60 * 1000;
      
      return isExpired ? null : cache;
    } catch {
      return null;
    }
  }

  static saveWeatherCache(data: WeatherData, advisory: WeatherAdvisory | null, coords: { lat: number; lon: number }) {
    if (typeof window === "undefined") return;
    const cache: WeatherCache = {
      data,
      advisory,
      timestamp: Date.now(),
      coords
    };
    localStorage.setItem("gs_weather_cache", JSON.stringify(cache));
  }

  static async getForecast(lat: number, lon: number): Promise<WeatherData> {
    const key = WeatherService.apiKey;
    if (!key) {
      throw new Error("OpenWeatherMap API Key missing. Please check your environment variables.");
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather");
    }

    // Transform OpenWeather data to our app structure
    // (Simplification: using the first result for current, and filtering for daily peaks)
    const current = data.list[0];
    const dailyForecast = data.list
      .filter((_: unknown, index: number) => index % 8 === 0)
      .map((item: { dt: number; main: { temp: number }; weather: Array<{ main: string }> }) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'short' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main.toLowerCase(),
      }));

    // Fetch Soil Data from Agro API
    let soilData = { t10: 0, moisture: 0 };
    const aKey = WeatherService.agroKey;
    if (aKey) {
      try {
        const soilUrl = `https://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=${aKey}`;
        const soilRes = await fetch(soilUrl);
        const sData = await soilRes.json();
        if (soilRes.ok) {
          soilData = { 
            t10: Math.round(sData.t10 - 273.15), // Kelvin to Celsius
            moisture: Math.round(sData.moisture * 100) 
          };
        }
      } catch (e) {
        console.error("Agro API error:", e);
      }
    }

    return {
      temp: Math.round(current.main.temp),
      condition: current.weather[0].main,
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6),
      precipitation: Math.round((current.pop || 0) * 100),
      location: data.city.name,
      soilTemp: soilData.t10,
      soilMoisture: soilData.moisture,
      forecast: dailyForecast,
    };
  }

  static async getAIAdvisory(weather: WeatherData, language: string = "English"): Promise<WeatherAdvisory> {
    // Call the server action instead of direct client-side fetch to resolve CORS
    const { getNvidiaAIAdvisoryAction } = await import("@/app/actions/ai-actions");
    const result = await getNvidiaAIAdvisoryAction(weather, language);

    return {
      summary: result.summary || "Weather looks steady for farming.",
      actions: result.actions || ["Continue regular farm maintenance."],
    };
  }
}
