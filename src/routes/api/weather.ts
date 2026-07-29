import { createFileRoute } from "@tanstack/react-router";
import { fetchForecast } from "@/lib/weather.server";

export const Route = createFileRoute("/api/weather")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const lat = Number(url.searchParams.get("lat"));
        const lon = Number(url.searchParams.get("lon"));
        const startDate = url.searchParams.get("startDate");
        const days = Number(url.searchParams.get("days"));

        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lon) ||
          !startDate ||
          !Number.isFinite(days)
        ) {
          return Response.json(
            { error: "Query params lat, lon, startDate, and days are all required." },
            { status: 400 },
          );
        }

        try {
          const result = await fetchForecast(lat, lon, startDate, days);
          return Response.json(result);
        } catch (error) {
          console.error("weather lookup failed:", error);
          return Response.json({ available: false, days: [] });
        }
      },
    },
  },
});
