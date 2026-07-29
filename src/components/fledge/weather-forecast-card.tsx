import { useEffect, useState } from "react";
import { CloudSun, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { fetchForecast, type ForecastResult } from "@/lib/weather";

export function WeatherForecastCard({
  lat,
  lon,
  startDate,
  days,
  fallbackNote,
}: {
  lat: number;
  lon: number;
  startDate: string;
  days: number;
  fallbackNote: string;
}) {
  const [result, setResult] = useState<ForecastResult | "loading">("loading");

  useEffect(() => {
    let cancelled = false;
    setResult("loading");
    fetchForecast(lat, lon, startDate, days).then((res) => {
      if (!cancelled) setResult(res);
    });
    return () => {
      cancelled = true;
    };
  }, [lat, lon, startDate, days]);

  return (
    <Card className="hover-lift p-4">
      <div className="flex items-center gap-2">
        <CloudSun className="h-4 w-4 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">Weather</h3>
      </div>

      {result === "loading" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Checking the forecast...
        </div>
      )}

      {result !== "loading" && !result.available && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your trip is too far out for a live forecast yet (weather services only publish reliably
          about a week ahead). Here's what's typical for this time of year instead: {fallbackNote}
        </p>
      )}

      {result !== "loading" && result.available && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {result.days.map((day, i) => (
            <div
              key={day.date}
              className="hover-lift animate-in fade-in zoom-in-95 rounded-lg bg-muted p-3 duration-300"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <p className="text-xs font-medium text-muted-foreground">{day.label}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {day.highF !== null ? `${day.highF}°` : "—"} /{" "}
                {day.lowF !== null ? `${day.lowF}°` : "—"}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{day.conditions}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
