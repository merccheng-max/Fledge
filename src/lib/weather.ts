export interface DayForecast {
  date: string;
  label: string;
  highF: number | null;
  lowF: number | null;
  conditions: string;
}

export interface ForecastResult {
  available: boolean;
  days: DayForecast[];
}

/**
 * Client-side helper that calls our own `/api/weather` server route (which in turn calls NWS).
 * The NWS API doesn't send CORS headers, so it can only be called server-side.
 */
export async function fetchForecast(
  lat: number,
  lon: number,
  startDate: string,
  numDays: number,
): Promise<ForecastResult> {
  try {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      startDate,
      days: String(numDays),
    });
    const res = await fetch(`/api/weather?${params.toString()}`);
    if (!res.ok) return { available: false, days: [] };
    return (await res.json()) as ForecastResult;
  } catch {
    return { available: false, days: [] };
  }
}
