export interface DayForecast {
  date: string; // YYYY-MM-DD
  label: string; // e.g. "Tuesday"
  highF: number | null;
  lowF: number | null;
  conditions: string;
}

export interface ForecastResult {
  /** True if live forecast data was available for at least part of the trip. */
  available: boolean;
  days: DayForecast[];
}

interface NwsPeriod {
  startTime: string;
  isDaytime: boolean;
  temperature: number;
  shortForecast: string;
}

const NWS_HEADERS = {
  "User-Agent": "FledgeApp (beginner camping trip planner, contact: fledge-app@example.com)",
  Accept: "application/geo+json",
};

/**
 * Fetches a live forecast from the National Weather Service (api.weather.gov) for the given
 * coordinates and date range. This must run server-side: NWS does not send CORS headers, so a
 * direct browser fetch is blocked by the browser regardless of the API's actual response.
 * NWS only publishes reliable forecasts roughly 7 days out, so trips further in the future will
 * come back with `available: false` and no days — callers should fall back to historical
 * seasonal notes in that case.
 */
export async function fetchForecast(
  lat: number,
  lon: number,
  startDate: string,
  numDays: number,
): Promise<ForecastResult> {
  try {
    const pointsRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
      headers: NWS_HEADERS,
    });
    if (!pointsRes.ok) return { available: false, days: [] };
    const pointsData = await pointsRes.json();
    const forecastUrl: string | undefined = pointsData?.properties?.forecast;
    if (!forecastUrl) return { available: false, days: [] };

    const forecastRes = await fetch(forecastUrl, { headers: NWS_HEADERS });
    if (!forecastRes.ok) return { available: false, days: [] };
    const forecastData = await forecastRes.json();
    const periods: NwsPeriod[] = forecastData?.properties?.periods ?? [];

    const tripDates: string[] = [];
    const start = new Date(`${startDate}T00:00:00`);
    for (let i = 0; i < numDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      tripDates.push(d.toISOString().slice(0, 10));
    }

    const days: DayForecast[] = tripDates.map((date) => {
      const dayPeriods = periods.filter((p) => p.startTime.slice(0, 10) === date);
      const daytime = dayPeriods.find((p) => p.isDaytime);
      const nighttime = dayPeriods.find((p) => !p.isDaytime);
      const label = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" });

      return {
        date,
        label,
        highF: daytime?.temperature ?? null,
        lowF: nighttime?.temperature ?? null,
        conditions: daytime?.shortForecast ?? nighttime?.shortForecast ?? "",
      };
    });

    const hasAnyData = days.some((d) => d.highF !== null || d.lowF !== null);
    return { available: hasAnyData, days: hasAnyData ? days : [] };
  } catch {
    return { available: false, days: [] };
  }
}
