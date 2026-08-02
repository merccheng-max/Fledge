import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

import { Header } from "@/components/fledge/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { deleteTrip, fetchUserTrips, type SavedTrip } from "@/lib/trips";
import { ACTIVITY_LABELS } from "@/data/gear";
import { getParkById } from "@/data/parks";

export const Route = createFileRoute("/trips")({
  component: TripsPage,
});

function TripsPage() {
  const { session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<SavedTrip[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      navigate({ to: "/login" });
      return;
    }
    fetchUserTrips()
      .then(setTrips)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Couldn't load trips."));
  }, [authLoading, session, navigate]);

  async function handleDelete(id: string) {
    await deleteTrip(id);
    setTrips((prev) => prev?.filter((t) => t.id !== id) ?? null);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            My trips
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Saved trips and their checklists, ready to pick back up.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {error && <p className="text-sm text-destructive">{error}</p>}

          {trips === null && !error && <p className="text-sm text-muted-foreground">Loading…</p>}

          {trips !== null && trips.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No saved trips yet. Plan a trip, then save it from the checklist page.
              </p>
              <Button asChild className="mt-4" size="sm">
                <Link to="/plan">Plan a trip</Link>
              </Button>
            </div>
          )}

          {trips?.map((trip) => {
            const park = getParkById(trip.parkId);
            const formattedDate = new Date(`${trip.startDate}T00:00:00`).toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" },
            );
            return (
              <Card key={trip.id} className="hover-lift flex items-center justify-between p-4">
                <Link
                  to="/checklist"
                  search={{
                    tripId: trip.id,
                    park: trip.parkId,
                    startDate: trip.startDate,
                    days: trip.days,
                    group: trip.groupSize,
                    activity: trip.activity,
                  }}
                  className="min-w-0 flex-1"
                >
                  <p className="font-medium text-foreground">{park?.name ?? trip.parkId}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {ACTIVITY_LABELS[trip.activity]} · {formattedDate} · {trip.days} day
                    {trip.days === 1 ? "" : "s"} · {trip.groupSize}{" "}
                    {trip.groupSize === 1 ? "person" : "people"}
                  </p>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(trip.id)}
                  aria-label="Delete trip"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
